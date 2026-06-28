import { useCallback, useEffect, useRef, useState } from 'react';
import { DOCK_RESERVED } from './useWindows';

const MIN_W = 360;
const MIN_H = 280;
const SNAP_EDGE = 22; // px from a screen edge that triggers a snap preview
const KEEP_VISIBLE = 120; // px of title bar kept on-screen while dragging

function viewport() {
  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
  const vh = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  );
  return { vw, vh };
}

function detectSnapZone(clientX, clientY) {
  const { vw } = viewport();
  if (clientY <= SNAP_EDGE) return 'maximize';
  if (clientX <= SNAP_EDGE) return 'left';
  if (clientX >= vw - SNAP_EDGE) return 'right';
  return null;
}

/**
 * Encapsulates pointer-driven move/resize/snap for a single window.
 *
 * @param {object} opts
 * @param {React.RefObject} opts.windowRef element to mutate while gesturing
 * @param {object} opts.geometry current committed geometry {x,y,width,height}
 * @param {boolean} opts.enabled false on touch/small screens or when maximized
 * @param {(x:number,y:number)=>void} opts.onMove commit after a drag
 * @param {(geo:object)=>void} opts.onResize commit after a resize
 * @param {(zone:string)=>void} opts.onSnap commit when released over a snap zone
 * @param {()=>void} opts.onFocus bring window to front on gesture start
 */
export function useWindowDrag({
  windowRef,
  geometry,
  enabled,
  onMove,
  onResize,
  onSnap,
  onFocus,
}) {
  const [snapPreview, setSnapPreview] = useState(null);
  const stateRef = useRef(null);
  const rafRef = useRef(0);

  // Keep latest geometry available to gesture handlers without re-binding.
  const geometryRef = useRef(geometry);
  geometryRef.current = geometry;

  // Keep the latest (volatile) callbacks in a ref so the gesture handlers stay
  // stable across renders. Without this, the inline callbacks from OSWindow make
  // `endGesture`/`begin` change every render, and the focus-triggered re-render
  // at the start of a gesture would tear down the active pointer listeners.
  const cbRef = useRef({ onMove, onResize, onSnap, onFocus, enabled });
  cbRef.current = { onMove, onResize, onSnap, onFocus, enabled };

  const writeStyle = useCallback(
    (geo) => {
      const el = windowRef.current;
      if (!el) return;
      el.style.transform = `translate3d(${geo.x}px, ${geo.y}px, 0)`;
      el.style.width = `${geo.width}px`;
      el.style.height = `${geo.height}px`;
    },
    [windowRef]
  );

  const onPointerMove = useCallback(
    (e) => {
      const s = stateRef.current;
      if (!s) return;
      const dx = e.clientX - s.startX;
      const dy = e.clientY - s.startY;
      const { vw, vh } = viewport();

      if (s.mode === 'drag') {
        let x = s.orig.x + dx;
        let y = s.orig.y + dy;
        // Keep part of the title bar reachable on every edge.
        x = Math.min(Math.max(x, -(s.orig.width - KEEP_VISIBLE)), vw - KEEP_VISIBLE);
        y = Math.min(Math.max(y, 0), vh - 44);
        s.next = { ...s.orig, x, y };

        const zone = detectSnapZone(e.clientX, e.clientY);
        if (zone !== s.zone) {
          s.zone = zone;
          setSnapPreview(zone);
        }
      } else {
        // resize
        let { x, y, width, height } = s.orig;
        const d = s.dir;
        if (d.includes('e')) width = s.orig.width + dx;
        if (d.includes('s')) height = s.orig.height + dy;
        if (d.includes('w')) {
          width = s.orig.width - dx;
          if (width < MIN_W) width = MIN_W;
          x = s.orig.x + (s.orig.width - width);
        }
        if (d.includes('n')) {
          height = s.orig.height - dy;
          if (height < MIN_H) height = MIN_H;
          y = s.orig.y + (s.orig.height - height);
        }
        width = Math.max(width, MIN_W);
        height = Math.max(height, MIN_H);
        // Don't let resize push the window under the dock or off the top.
        if (y < 0) {
          height += y;
          y = 0;
        }
        if (y + height > vh - DOCK_RESERVED) height = vh - DOCK_RESERVED - y;
        s.next = { x, y, width: Math.max(width, MIN_W), height: Math.max(height, MIN_H) };
      }

      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          rafRef.current = 0;
          if (stateRef.current?.next) writeStyle(stateRef.current.next);
        });
      }
    },
    [writeStyle]
  );

  const endGesture = useCallback(() => {
    const s = stateRef.current;
    if (!s) return;
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', endGesture);
    window.removeEventListener('pointercancel', endGesture);

    if (s.captureEl && s.pointerId != null) {
      try {
        s.captureEl.releasePointerCapture(s.pointerId);
      } catch (_) {
        // capture may have already been lost; ignore
      }
    }

    const el = windowRef.current;
    if (el) el.classList.remove('dragging');
    document.body.style.userSelect = '';

    const { onMove, onResize, onSnap } = cbRef.current;
    if (s.mode === 'drag' && s.zone) {
      setSnapPreview(null);
      onSnap(s.zone);
    } else if (s.mode === 'drag') {
      onMove(s.next.x, s.next.y);
    } else {
      onResize(s.next);
    }
    stateRef.current = null;
  }, [onPointerMove, windowRef]);

  const begin = useCallback(
    (e, mode, dir) => {
      if (!cbRef.current.enabled) return;
      if (e.button !== undefined && e.button !== 0) return;
      e.preventDefault();
      cbRef.current.onFocus?.();
      const el = windowRef.current;
      if (el) el.classList.add('dragging');
      document.body.style.userSelect = 'none';

      // Capture the pointer so fast moves / leaving the window don't drop events.
      const captureEl = e.currentTarget;
      try {
        captureEl.setPointerCapture?.(e.pointerId);
      } catch (_) {
        // setPointerCapture is best-effort; ignore failures
      }

      stateRef.current = {
        mode,
        dir,
        startX: e.clientX,
        startY: e.clientY,
        orig: { ...geometryRef.current },
        next: { ...geometryRef.current },
        zone: null,
        captureEl,
        pointerId: e.pointerId,
      };
      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', endGesture);
      window.addEventListener('pointercancel', endGesture);
    },
    [onPointerMove, endGesture, windowRef]
  );

  const startDrag = useCallback((e) => begin(e, 'drag'), [begin]);
  const startResize = useCallback((e, dir) => begin(e, 'resize', dir), [begin]);

  useEffect(() => {
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', endGesture);
      window.removeEventListener('pointercancel', endGesture);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [onPointerMove, endGesture]);

  return { startDrag, startResize, snapPreview };
}
