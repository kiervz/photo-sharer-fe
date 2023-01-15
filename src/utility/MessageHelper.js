import { toast } from 'react-toastify';

export const notifyUser = (type, message, theme = 'light', position = 'top-center', autoClose = 5000, hideProgressBar = false) => {
  return toast[type](message, {
    position,
    autoClose,
    hideProgressBar,
    theme,
    pauseOnHover: true,
    progress: undefined
  });
};