import React from 'react'
import Navbar from "../../components/navbar/Navbar.jsx"
import { Select, TexTarea, InputStandard } from "../../components/input/inputs.jsx"
import { useForm } from "react-hook-form";

function FormPassword() {

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
            <header><Navbar /></header>
            <main className='d-flex justify-content-center flex-column align-items-center bg-main flex-grow-1 px-3 px-md-0'>

                <form onSubmit={onSubmit} className='w-100 w-md-80 bg-white rounded py-5 px-2 px-md-5 text-center'>
                    <h1 className='fw-bold text-center'>Registro de Usuarios</h1>
                    <div className="carousel-item ">
                        <div className='w-100 d-flex flex-column px-1'>
                            <InputStandard
                                label={"Contraseña*"}
                                form={{ errors, register, isSubmitted }}
                                id={"password"}
                                name={"password"}
                                className={{ classContent: "w-100 text-start mb-4" }}
                                placeholder={"Contraseña"}
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
                            <InputStandard
                                label={"Repita la Contraseña*"}
                                form={{ errors, register, isSubmitted }}
                                id={"password_repeat"}
                                name={"password_repeat"}
                                className={{ classContent: "w-100 text-start mb-4" }}
                                placeholder={"Contraseña"}
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
                                        if (watch("password") !== value) {
                                            return "Las contraseñas no son iguales"
                                        } else {
                                            return true
                                        }
                                    }
                                }}
                            />

                            <button type="submit" className="btn btn-success btn-lg fw-bold mt-5 text-center">Registrar</button>

                        </div>
                    </div>

                </form>
            </main>
        </>
    )
}

export default FormPassword