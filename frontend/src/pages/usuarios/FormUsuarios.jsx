import React from 'react'
import Navbar from "../../components/navbar/Navbar.jsx"
import { Select, TexTarea, InputStandard, InputcheckRadio } from "../../components/input/inputs.jsx"
import { useForm } from "react-hook-form";
import pattern from "../../context/pattern.js"
import { hasLeadingOrTrailingSpace } from "../../utils/validateInput.jsx"

function FormUsuarios() {

  // *the useform
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    watch,
    setValue
  } = useForm();


  // *Funcion para registrar 
  const onSubmit = handleSubmit(
    async (data) => {
      try {
        console.log(data)

      } catch (error) {
        console.log(error)
      }
    }
  )

  return (
    <>
      <header><Navbar active='usuarios' /></header>
      <main className='d-flex justify-content-center flex-column align-items-center bg-main flex-grow-1 px-3 px-md-0'>

        <form onSubmit={onSubmit} className='w-100 w-md-80 bg-white rounded py-5 px-2 px-md-5 text-center'>
          <h1 className='fw-bold text-center'>Registro de Usuarios</h1>
          <div id="carouselExample" className="carousel slide">
            <div className="carousel-inner">

              <div className="carousel-item active">
                <div className='w-100 d-flex flex-column px-1'>
                  <InputcheckRadio
                    form={{ errors, register, isSubmitted }}
                    className={{ classContent: "d-flex flex-row w-100  flex-wrap mb-4" }}
                    elements={[{ id: "surcusal-bolivar", label: "Plaza Bolivar*" }, { id: "surcusal-marron", label: "La Marrón*", className: "ms-2" }]}
                    name={"surcusal"}
                    params={{
                      required: {
                        value: true,
                        message: "Escoja a que surcusal pertenece"
                      },
                    }}
                    type="radio"
                  />

                  <div className='d-flex gap-3 mb-2'>
                    <InputStandard
                      label={"Nombre*"}
                      form={{ errors, register, isSubmitted }}
                      id={"nombre"}
                      name={"nombre"}
                      className={{ classContent: "w-100 w-md-50 text-start" }}
                      placeholder={"Nombres del Usuario"}
                      params={{
                        required: {
                          value: true,
                          message: "Se requiere los nombres"
                        },
                        maxLength: {
                          value: 200,
                          message: "Maximo 200 caracteres"
                        },
                        validate: (value) => {
                          if (hasLeadingOrTrailingSpace(value)) {
                            return "Elimine los espacios al inicio y al final"
                          } else {
                            return true
                          }
                        },
                        pattern: {
                          value: pattern.textNoneNumber,
                          message: "Nombre invalido",
                        },
                      }}
                    />
                    <InputStandard
                      label={"Apellido*"}
                      form={{ errors, register, isSubmitted }}
                      id={"apellido"}
                      name={"apellido"}
                      className={{ classContent: "w-100 w-md-50 text-start" }}
                      placeholder={"Nombres del Usuario"}
                      params={{
                        required: {
                          value: true,
                          message: "Se requiere los apellidos"
                        },
                        maxLength: {
                          value: 200,
                          message: "Maximo 200 caracteres"
                        },
                        validate: (value) => {
                          if (hasLeadingOrTrailingSpace(value)) {
                            return "Elimine los espacios al inicio y al final"
                          } else {
                            return true
                          }
                        },
                        pattern: {
                          value: pattern.textNoneNumber,
                          message: "Apellido invalido",
                        },
                      }}
                    />

                  </div>

                  <Select
                    label={"Departamento*"}
                    form={{ errors, register, isSubmitted }}
                    id="departamento"
                    name="departamento"
                    className={{ classContent: "w-100 mb-2 text-start" }}
                    placeholder='Departamento ...'
                    options={[{ label: "prubea", value: 1 }, { label: "oster", value: 2 }, { label: "maquo", value: 3 }, { label: "pita", value: 4 }]}
                    params={{
                      required: {
                        value: true,
                        message: "Escoja a que departamento pertenece"
                      }
                    }}
                  />

                  <Select
                    label={"Correo Electronico"}
                    form={{ errors, register, isSubmitted }}
                    id="correo"
                    name="correo"
                    validate={false}
                    className={{ classContent: "w-100 mb-5 text-start" }}
                    placeholder='Correo ...'
                    options={[{ label: "prubea", value: 1 }, { label: "oster", value: 2 }, { label: "maquo", value: 3 }, { label: "pita", value: 4 }]}

                  />
                  <div className='d-flex align-items-center justify-content-center'>
                    <button type="button" className="btn btn-success btn-lg fw-bold mt-5" data-bs-target="#carouselExample" data-bs-slide="next">
                      Siguiente
                    </button>
                  </div>
                </div>
              </div>

              <div className="carousel-item ">
                <div className='w-100 d-flex flex-column px-1'>
                  <InputStandard
                    label={"Nombre de Usuario*"}
                    form={{ errors, register, isSubmitted }}
                    id={"usuario"}
                    name={"usuario"}
                    className={{ classContent: "w-100 text-start mb-4" }}
                    placeholder={"Nombres del Usuario"}
                    params={{
                      required: {
                        value: true,
                        message: "Se requiere nombre de usuario"
                      },
                      maxLength: {
                        value: 200,
                        message: "Maximo 200 caracteres"
                      },
                      validate: (value) => {
                        if (hasLeadingOrTrailingSpace(value)) {
                          return "Elimine los espacios al inicio y al final"
                        } else {
                          return true
                        }
                      },
                      pattern: {
                        value: pattern.user,
                        message: "Nombre invalido",
                      },
                    }}
                  />
                  <InputStandard
                    label={"Contraseña*"}
                    form={{ errors, register, isSubmitted }}
                    id={"password"}
                    name={"password"}
                    className={{ classContent: "w-100 text-start mb-4" }}
                    placeholder={"Contraseña de Usuario"}
                    params={{
                      required: {
                        value: true,
                        message: "Se requiere una contraseña"
                      },
                      maxLength: {
                        value: 20,
                        message: "Máximo 20 caracteres"
                      },
                      minLength: {
                        value: 8,
                        message: "Minimo 8 caracteres"
                      },
                      validate: (value) => {
                        if (hasLeadingOrTrailingSpace(value)) {
                          return "Elimine los espacios al inicio y al final"
                        } else {
                          return true
                        }
                      },
                      pattern: {
                        value: pattern.password,
                        message: "Contraseña Invalida. Debe cumplir con un minimo de 8 y un maximo de 20 caracteres, un caracter en mayuscula, un caracter numerico y puede usar los siguientes simbolos ' . ! # $ & ? * - + % , '",
                      },
                    }}
                  />
                  <InputcheckRadio
                    form={{ errors, register, isSubmitted }}
                    className={{ classContent: "mb-4 text-start" }}
                    elements={[{ id: "administrador", label: "Administrador" }]}
                    name={"administrador"}
                    validate={false}
                    type="checkbox"
                  />

                  <div className='d-flex align-items-center justify-content-center gap-3'>
                    <button type="button" className="btn btn-success btn-lg fw-bold mt-5" data-bs-target="#carouselExample" data-bs-slide="prev">
                      Anterior
                    </button>
                    <button type="submit" className="btn btn-success btn-lg fw-bold mt-5">Registrar</button>
                  </div>

                </div>
              </div>

            </div>
          </div>

        </form>
      </main>
    </>
  )
}

export default FormUsuarios