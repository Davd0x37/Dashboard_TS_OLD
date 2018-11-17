import swal from "sweetalert2";

export const error = (text: string) =>
  swal({
    position: "center",
    type: "error",
    title: text,
    showConfirmButton: false,
    timer: 1500
  }).then(() => true);

export const success = (text: string, afterClose: () => any) =>
  swal({
    position: "center",
    type: "success",
    title: text,
    showConfirmButton: false,
    timer: 1500,
    onAfterClose: () => afterClose()
  }).then(() => true);
