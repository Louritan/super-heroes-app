import Swal, { SweetAlertOptions } from 'sweetalert2';

export async function SweetAlert(options: SweetAlertOptions) {
  return await Swal.fire({
    ...options,
    customClass: {
      popup: 'bg-card text-foreground shadow-card rounded-xl',
      title: 'text-xl font-semibold',
      htmlContainer: 'text-foreground',
      confirmButton: 'bg-primary text-primary-foreground px-4 py-2 rounded transition-hero',
      cancelButton: 'bg-muted text-muted-foreground px-4 py-2 rounded transition-hero ml-2',
    },
    buttonsStyling: false,
  });
}
