import { useState } from 'react'
import { useForm } from "react-hook-form";
import "./login.css"

function Login() {
  const [buttonLogin, setButton] = useState("Ingresar")
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(
    async (data) => {
      setButton("Espere")
      try {
        console.log(data)
        navigate("/inicio/")
      } catch (error) {

      }
      finally {
        setButton("Ingresar")
        document.getElementById("button-login").disabled = false
      }
    }
  )
  return (
    <main className='w-100 px-5 px-md-0 vh-100 d-flex justify-content-center align-items-center bg-main position-relative'>

      <form className='form position-relative w-100 w-md-35  py-5 px-5'
        autoComplete={"off"}
        onSubmit={onSubmit}
      >
        <h1 className='h1 fw-bold text-dark text-center'>Control de Acceso</h1>

        <div className={`w-100 position-relative overflow-hidden content-input ${errors.usuario ? "error" : ""}`} id="container-input-usuario">
          <input
            type="text"
            id="user"
            name="usuario"
            {
            ...register("usuario", {
              required: {
                value: true,
                message: "Usuario Requerido",
              }
            })
            }
            onKeyUp={
              (e) => {
                if (e.target.value) {
                  document.getElementById("container-input-usuario").classList.add("valid")
                } else {
                  document.getElementById("container-input-usuario").classList.remove("valid")
                }
              }
            }
          />
          <label htmlFor="user" className='lb-name cursor-pointer'>
            <span className='text-name'>Usuario*</span>
          </label>
        </div>

        <div className={`w-100 position-relative overflow-hidden content-input ${errors.usuario ? "error" : ""}`} id="container-input-usuario">
          <input
            type="text"
            id="user"
            name="usuario"
            {
            ...register("usuario", {
              required: {
                value: true,
                message: "Usuario Requerido",
              }
            })
            }
            onKeyUp={
              (e) => {
                if (e.target.value) {
                  document.getElementById("container-input-usuario").classList.add("valid")
                } else {
                  document.getElementById("container-input-usuario").classList.remove("valid")
                }
              }
            }
          />
          <label htmlFor="user" className='lb-name cursor-pointer'>
            <span className='text-name'>Contraseña*</span>
          </label>
        </div>
        {/* {errors.usuario ? <span className='error-login'>{errors.usuario.message}</span> : <span className='error-login invisible'>error</span>} */}

        

        <button type="subtmit" className={`button-style-login mt-4 btn-disabled`} id="button-login">
          <span className="transition"></span>
          <span className="gradient"></span>
          <span className="name">{buttonLogin}</span>
        </button>
      </form>
    </main>
  )
}

export default Login