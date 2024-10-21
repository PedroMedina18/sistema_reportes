import React from 'react'
import Navbar from "../../components/navbar/Navbar.jsx"
import { Select, TexTarea, InputStandard } from "../../components/input/inputs.jsx"
import { useForm } from "react-hook-form";

function Usuarios() {
  return (
    <>
    <header><Navbar active='usuarios' /></header>
    <main className='d-flex justify-content-center flex-column align-items-center bg-main flex-grow-1 px-3 px-md-0'>
      <section className='w-100 w-md-80 bg-white rounded py-5 px-2 px-md-5 d-flex flex-column justify-content-center align-items-center'>
        <i class='bx bx-user-circle h1 text-dark'></i>
        <h3>Mi nombre es pedro</h3>
        <p><strong>Departamento:</strong> <span>Almendras</span></p>
        <p><strong>Correo:</strong> <span>Almendras</span></p>
        
      </section>
    </main>
    </>
  )
}

export default Usuarios