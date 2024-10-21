import React from 'react'
import Navbar from "../../components/navbar/Navbar.jsx"
import { Select, TexTarea, InputStandard } from "../../components/input/inputs.jsx"
import { useForm } from "react-hook-form";

function FormReportes() {

  // *the useform
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted},
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
      <header><Navbar active='reportes' /></header>
      <main className='d-flex flex-column justify-content-center align-items-center bg-main flex-grow-1 px-3 px-md-0'>

        <form onSubmit={onSubmit} className='w-100 w-md-80 bg-white rounded py-5 px-2 px-md-5 text-center'>
          <h1 className='fw-bold text-center'>Realizar un Reporte</h1>
          
          <Select
            label={"Tipo de reporte*"}
            form={{ errors, register, isSubmitted }}
            id="tipo"
            name="tipo"
            className={{classContent:"w-100 mb-5 text-start"}}
            placeholder='Tipo de Reporte'
            options={[{ label: "prubea", value: 1 }, { label: "oster", value: 2 }, { label: "maquo", value: 3 }, { label: "pita", value: 4 }]}
            params={{
              required:{
                value:true,
                message:"Elija que tipo de reporte desea realizar"
              }
            }}
          />

          <TexTarea
            label={"Detalles*"}
            form={{ errors, register, isSubmitted }}
            id={"descripcion"}
            name={"descripcion"}
            className={{classContent:"w-100 text-start"}}
            placeholder={"Describa de manera detallada cual es el problema que presenta"}
            rows={8}
            params={{
              required:{
                value:true,
                message:"Describa su problema"
              },
              minLength:{
                value:10,
                message:"Se espera una descripción minima de 10 caracteres"
              },
              maxLength:{
                value:3000,
                message:"Se espera una descripción maxima de 3.000 caracteres"
              }
            }}
          />
          <button type="submit" className="btn btn-success btn-lg fw-bold mt-5">Reportar</button>
        </form>
      </main>
    </>
  )
}

export default FormReportes