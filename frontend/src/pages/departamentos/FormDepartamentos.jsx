import React from 'react'
import Navbar from "../../components/navbar/Navbar.jsx"
import { TexTarea, InputStandard } from "../../components/input/inputs.jsx"
import { useForm } from "react-hook-form";
import pattern from "../../context/pattern.js"

function FormDepartamentos() {

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
      <header><Navbar active='departamentos' /></header>
      <main className='d-flex flex-column justify-content-center align-items-center bg-main flex-grow-1 px-3 px-md-0'>

        <form onSubmit={onSubmit} className='w-100 w-md-80 bg-white rounded py-5 px-2 px-md-5 text-center'>
          <h1 className='fw-bold text-center'>Registro de Departamento</h1>

          <InputStandard
            label={"Nombre*"}
            form={{ errors, register, isSubmitted }}
            id={"nombre"}
            name={"nombre"}
            className={{ classContent: "w-100 text-start mb-4" }}
            placeholder={"Nombre del departamento"}
            params={{
              required: {
                value: true,
                message: "Se requiere una nombre"
              },
              maxLength: {
                value: 100,
                message: "Máximo 100 caracteres"
              },
              minLength: {
                value: 3,
                message: "Minimo 3 caracteres"
              },
              validate: (value) => {
                if (hasLeadingOrTrailingSpace(value)) {
                  return "Elimine los espacios al inicio y al final"
                } else {
                  return true
                }
              },
              pattern: {
                value: pattern.textWithNumber,
                message: "Nombre Invalido",
              },
            }}
          />

          <TexTarea
            label={"Descripción*"}
            form={{ errors, register, isSubmitted }}
            id={"descripcion"}
            name={"descripcion"}
            className={{ classContent: "w-100 text-start" }}
            placeholder={"Describa el departamento"}
            rows={3}
            params={{
              required: {
                value: true,
                message: "Agregue una descripción"
              },
              maxLength: {
                value: 300,
                message: "Se espera una descripción maxima de 300 caracteres"
              }
            }}
          />
          <button type="submit" className="btn btn-success btn-lg fw-bold mt-5">Registrar</button>
        </form>
      </main>
    </>
  )
}

export default FormDepartamentos