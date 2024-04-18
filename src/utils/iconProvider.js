export const iconProvider = (type) => {
  let icon = null;
  switch (type) {
    case 'folder':
      icon = '/img/icons/folder.svg';
      break;
    case 'terminal':
      icon = '/img/icons/terminal_white.svg';
      break;
    case 'text':
      icon = '/img/icons/text.svg';
      break;
    case 'contact':
      icon = '/img/icons/email.svg';
      break;
    case 'pdf':
      icon = '/img/icons/pdf.svg';
      break;
    default:
      icon = '/img/icons/close.svg';
      break;
  }
  return icon;
};
