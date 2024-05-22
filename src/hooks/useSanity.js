import { useState, useEffect } from 'react';
import { adaptRoot } from '../utils/adapters';

const useSanity = () => {
  const [root, setRoot] = useState(null);

  useEffect(() => {
    const project = async () =>
      getFolders().then((folders) => {
        setRoot(adaptRoot(folders));
      });

    project();
  }, []);

  return data;

  const getRoot = useCallback(
    (id) => {
      return root;
    },
    [root]
  );

  return { getRoot };
};

export default useSanity;
