import React from 'react'
import Navbar from "../../components/navbar/Navbar.jsx"
import alertEmail from "../../components/alerts/alertEmail.jsx"
function Correos() {
  return (
    <>
      <header><Navbar active='correos' /></header>
      <main className='d-flex flex-column justify-content-center align-items-center bg-main flex-grow-1 px-3 px-md-0'>
        <section className='w-100 w-md-90 bg-white rounded py-5 px-2 px-md-5'>
          <h1 className='fw-bold text-center'>Correos</h1>
          <button className="btn btn-success btn-lg fw-bold text-start my-4" onClick={(e)=>{alertEmail("Registrar correo")}}>Registrar</button>
          <div className="table-responsive">
            <table className="table table-striped text-center border-start border-end table-bordered border-dark-subtle">
              <thead className="table-primary">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Correo</th>
                  <th scope="col">Opciones</th>
                </tr>
              </thead>
              <tbody className='table-group-divider'>
                {
                  objects.map((e) => (
                    <tr key={`tr-correo-${e.id}`}>
                      <th scope="row">{e.id}</th>
                      <td>{e.email}</td>
                      <td>
                        <div className='d-flex gap-2 align-items-center justify-content-center'>
                          <i className='bx bx-edit-alt fs-4 text-success cursor-pointer'></i>
                          <i className='bx bx-trash fs-4 text-success cursor-pointer'></i>
                          <i className='bx bx-detail fs-4 text-success cursor-pointer'></i>
                        </div>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  )
}


const objects = [
  { id: 1, email: "candramuono@salud.gob.ec" },
  { id: 2, email: "josemariarodriguez@repositorio.cepal.org" },
  { id: 3, email: "mariajesusgomez@www3.uji.es" },
  { id: 4, email: "juanmanuelgarcia@dianapmorales.com" },
  { id: 5, email: "luisfernandez@eur-lex.europa.eu" },
  { id: 6, email: "anafernandez@www.ucm.es" },
  { id: 7, email: "pablogonzalez@ru.dgb.unam.mx" },
  { id: 8, email: "marcosanchez@learn.microsoft.com" },
  { id: 9, email: "carlosrodriguez@play.google.com" },
  { id: 10, email: "danielmartinez@play.google.com" }
];

export default Correos