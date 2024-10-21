import pattern from "../../context/pattern.js"
import { hasLeadingOrTrailingSpace } from "../../utils/validateInput.jsx"
import Swal from 'sweetalert2'

const alertEmail = async (title, dataEdit = { value: "", id: 0 }) => {
  return Swal.fire({
    title: `${title}`,
    color: "black",
    customClass: {
      title: "h2 fw-bold text-black",
      confirmButton: "px-5 py-3 mx-3 fs-6 fw-bold",
      cancelButton: "px-5 py-3 mx-3 fs-6 fw-bold",
      inputLabel: "fw-bold cursor-pointer label-alert",
    },
    input: "text",
    inputLabel: "Correo Electronico",
    inputPlaceholder: "Dirección de correo",
    inputValue: dataEdit.value,
    confirmButtonText: "Aceptar",
    confirmButtonColor: "rgb(var(--bs-success-rgb))",
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    cancelButtonColor: "rgb(var(--bs-danger-rgb))",
    showLoaderOnConfirm: true,
    width: "60%",
    preConfirm: async (value) => {
      try {
        const body = {
          correo: value
        }
        if (!value) {
          return Swal.showValidationMessage("Correo requerido");
        }
        if (value.length > 100) {
          return Swal.showValidationMessage("Maximo 100 caracteres");
        }
        if (value.length < 5) {
          return Swal.showValidationMessage("Minimo 5 caracteres");
        }
        if (value.length < 5) {
          return Swal.showValidationMessage("Minimo 5 caracteres");
        }
        if (!pattern.email.test(value)) {
          return Swal.showValidationMessage("Correo Invalido");
        }
        console.log(value)
        if (hasLeadingOrTrailingSpace(value)) {
          return Swal.showValidationMessage("Elimine los espacios al inicio y al final");
        }
        // const respuesta = await eventos.put(body, { subDominio: [Number(id)] })
        // if (respuesta.status !== 200) {
        //   return Swal.showValidationMessage(`${`Error.${respuesta.status} ${respuesta.statusText}`}`);
        // }
        // if (respuesta.data.status === false) {
        //   return Swal.showValidationMessage(`${respuesta.data.message}`);
        // }
        return value;
      } catch (error) {
        Swal.showValidationMessage(
          `Petición Fallada: ${error}`
        );
      }
    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then(async (result) => {
    if(!result.isConfirmed)return
    // if (result.value.status) {
    //   const aceptar = await alertAceptar("Exito!", texts.successMessage.eventoCancelado)
    //   if (aceptar.isConfirmed) {
    //     callback()
    //   }
    // }
  })
}
 export default alertEmail