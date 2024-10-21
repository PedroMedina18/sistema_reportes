import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import * as Pages from "./pages/Pages.jsx"
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Pages.Login />} />
          <Route path="/inicio/" element={<Pages.Inicio />} />
          <Route path="/register/reporte/" element={<Pages.FormReportes />} />
          <Route path="/register/usuario/" element={<Pages.FormUsuarios />} />
          <Route path="/usuario/" element={<Pages.Usuarios />} />
          <Route path="/password/" element={<Pages.FormPassword />} />
          <Route path="/register/departamento/" element={<Pages.FormDepartamentos />} />
          <Route path="/register/tipo_reporte/" element={<Pages.FormTipoReportes />} />
          <Route path="/correos/" element={<Pages.Correos />} />
          <Route path="*" element={<Pages.Error404 />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
