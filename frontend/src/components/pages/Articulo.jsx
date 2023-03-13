import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Global } from '../../helpers/Global'
import { Peticion } from '../../helpers/Peticion'

export const Articulo = () => {

  const [articulo, setArticulo] = useState();
  const [cargando, setCargando] = useState(true);
  const parametros = useParams()

  useEffect(() => {
    getData()
  }, []);

  const getData = async() => {
    let url = `${Global.url}articulo/${parametros.id}`
    const { datos, cargando } = await Peticion(url, 'GET')
    if(datos.status === 'success'){
      setArticulo(datos.articulo)
    }

    setCargando(cargando)
  }

  return (
    <>
      { cargando ? <p>Cargando...</p> :
            articulo ? 
            <article className='item'>
              <div className='mascara'>
                <img src= {`${Global.url}imagen/${articulo.image}`} />
              </div>
              <div className='datos'>
                <h3 className='title'>{articulo.title}</h3>
                <p className='description'>{articulo.content}</p>
                <p className='fecha'>{articulo.date}</p>
              </div>
            </article>
           : <h1>Artículo no encontrado</h1>
      }
    </>
  )
}