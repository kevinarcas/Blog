import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Aside } from '../components/layout/Aside'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import { Nav } from '../components/layout/Nav'
import { Articulo } from '../components/pages/Articulo'
import { Articulos } from '../components/pages/Articulos'
import { Busqueda } from '../components/pages/Busqueda'
import { Crear } from '../components/pages/Crear'
import { Editar } from '../components/pages/Editar'
import { Error } from '../components/pages/Error'
import { Inicio } from '../components/pages/Inicio'

export const Rutas = () => {
  return (
    <BrowserRouter>
        <Header />
        <Nav />
        {/* Contenido central y rutas */}
        <section id='content' className='content'>
            <Routes>
                <Route path='/' element={ <Inicio /> } />
                <Route path='/inicio' element={ <Inicio /> } />
                <Route path='/articulos' element={ <Articulos /> } />
                <Route path='/crear-articulo' element={ <Crear /> } />
                <Route path='/buscar/:busqueda' element={ <Busqueda /> } />
                <Route path='/articulo/:id' element={ <Articulo /> } />
                <Route path='/editar/:id' element={ <Editar /> } />
                <Route path='/*' element={ <Error /> } />
            </Routes>
        </section>
        <Aside />
        <Footer />
    </BrowserRouter>
  )
}