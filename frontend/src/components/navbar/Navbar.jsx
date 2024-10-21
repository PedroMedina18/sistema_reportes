import React from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from "react-router-dom"
import "./navbar.css"

function Navbar({active=""}) {
  const location = useLocation();
  return (
    <nav className="navbar navbar-expand-md bg-primary" data-bs-theme="dark" >
      <div className="container-fluid">
        <a className="navbar-brand fs-3 fw-bold" href="#">SGI Locatel</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav w-100 me-auto mb-2 mb-md-0">
            <li className="nav-item d-flex align-items-center">
              <Link to="/inicio/" className={`nav-link text-center w-100  ${active === "inicio" ? "fw-bold active" : "fw-semibold"}`} aria-current="page">Inicio</Link>
            </li>
            <li className="nav-item d-flex align-items-center">
              <Link to="/register/reporte/" className={`nav-link text-center w-100  ${active === "reportes" ? "fw-bold active" : "fw-semibold"}`}>Reportes</Link>
            </li>
            <li className="nav-item d-flex align-items-center">
              <Link to="/register/usuario/" className={`nav-link text-center w-100  ${active === "usuarios" ? "fw-bold active" : "fw-semibold"}`}>Usuarios</Link>
            </li>
            <li className="nav-item dropdown d-flex align-items-center">
              <a className={`nav-link dropdown-toggle text-center w-100  ${["configuracion", "departamentos", "tipo_reportes", "correos"].includes(active) ? "fw-bold active" : "fw-semibold"}`} role="button" data-bs-toggle="dropdown" aria-expanded="false">Configuración</a>
              <ul className="dropdown-menu bg-primary ">
                <li><Link to="/register/departamento/" className={`dropdown-item text-white text-center ${active === "departamentos" && "fw-bold active"} `}>Departamentos</Link></li>
                <li><Link to="/register/tipo_reporte/" className={`dropdown-item text-white text-center ${active === "tipo_reportes" && "fw-bold active"} `}>Tipo de reportes</Link></li>
                <li><Link to="/correos/" className={`dropdown-item text-white text-center ${active === "correos" && "fw-bold active"} `}>Correos</Link></li>
              </ul>
            </li>
            <li className="nav-item dropdown-center ms-0 ms-md-auto d-flex flex-column align-items-center justify-content-center dropdown-center">
              <i className='bx bxs-user-circle fs-1 text-white nav-link dropdown-toggle d-flex align-items-center justify-content-center ' role="button" data-bs-toggle="dropdown" aria-expanded="false"></i>
              <ul className="dropdown-menu  dropdown-menu-end bg-primary ">
                <li><Link to={"/usuario/"} className={`dropdown-item text-white text-center ${active === "perfil" && "fw-bold active"} `} href="#">Perfil</Link></li>
                <li><Link to={"/password/"} className={`dropdown-item text-white text-center ${active === "contraseña" && "fw-bold active"} `} href="#">Cambio de contraseña</Link></li>
                <li><a className={`dropdown-item text-white text-center `} href="#">Cerrar Sesión</a></li>
              </ul>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar