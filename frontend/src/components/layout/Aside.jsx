import React from 'react'
import { useNavigate } from 'react-router-dom';

export const Aside = () => {

  const redirigir = useNavigate()

  const busqueda = (e) => {
    e.preventDefault()
    let buscado = e.target.buscado.value
    redirigir(`/buscar/${buscado}`)
  }

  return (
    <aside className='aside'>
      <div className='search'>
        <h3 className='title'>Buscador</h3>
        <form onSubmit={busqueda}>
          <input type='text' name='buscado' placeholder='Título a buscar...' />
          <input type='submit' value='Buscar' />
        </form>
      </div>
    </aside>
  )
}