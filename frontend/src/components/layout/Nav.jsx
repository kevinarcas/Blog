import React from 'react'
import { NavLink } from 'react-router-dom'

export const Nav = () => {
  return (
    <nav className='nav'>
      <ul>
        <li><NavLink to='/'>Inicio</NavLink></li>
        <li><NavLink to='/articulos'>Artículos</NavLink></li>
        <li><NavLink to='/crear-articulo'>Crear artículo</NavLink></li>
      </ul>
    </nav>
  )
}