import React from 'react'
import { Link } from 'react-router-dom'
import { Global } from '../../helpers/Global'
import { Peticion } from '../../helpers/Peticion'

export const Listado = ({articulos, setArticulos}) => {

  const eliminar = async(id) => {
    let url = `${Global.url}articulo/${id}`
    const { datos } = await Peticion(url, 'DELETE')
    if(datos.status === 'success'){
      let resultado = articulos.filter( (articulo) => articulo._id !== id );
      setArticulos(resultado)
    }
  }

  return (
    articulos.map((articulo, id) => {
        return (
        <article key={articulo._id} className='item'>
            <div className='mascara'>
              <img src= {`${Global.url}imagen/${articulo.image}`} />
            </div>
            <div className='datos'>
              <h3 className='title'><Link to={`/articulo/${articulo._id}`}>{articulo.title}</Link></h3>
              <p className='description'>{articulo.content}</p>
              <Link to={`/editar/${articulo._id}`} className='edit'>Editar</Link>
              <button className='delete' onClick={() => {eliminar(articulo._id)}}>Borrar</button>
            </div>
        </article>
        )
    })
  )
}