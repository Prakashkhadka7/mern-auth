// components/Alert.jsx
import Swal from 'sweetalert2';

/**
 * Show a confirmation dialog
 * @param {Object} options
 * @param {string} options.title
 * @param {string} options.text
 * @param {string} options.confirmText
 * @param {string} options.cancelText
 * @param {Function} options.onConfirm
 * @param {Function} [options.onCancel]
 */
export const showConfirmAlert = ({
  title = 'Are you sure?',
  text = 'You won’t be able to revert this!',
  confirmText = 'Yes',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
}) => {
  Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#aaa',
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm?.();
    } else {
      onCancel?.();
    }
  });
};

/**
 * Show a success toast message
 * @param {string} message
 */
export const showSuccessToast = (message = 'Success!') => {
  Swal.fire({
    toast: true,
    icon: 'success',
    title: message,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });
};

/**
 * Show an error alert
 * @param {string} message
 */
export const showErrorAlert = (message = 'Something went wrong') => {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: message,
  });
};
