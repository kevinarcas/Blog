import React, { useState, useEffect } from 'react'
import { Peticion } from '../../helpers/Peticion';
import { Global } from '../../helpers/Global';
import { Listado } from './Listado';

export const Articulos = () => {

  const [articulos, setArticulos] = useState([]);
  const [cargando, setCargando] = useState(true);
  
  useEffect(() => {
    getData()
  }, []);

  const getData = async() => {
    let url = `${Global.url}articulos`
    const {datos, carga} = await Peticion(url, 'GET')

    if(datos.status === 'success'){
      setArticulos(datos.articulos)
    }

    setCargando(carga)
  }

  return (
    <>
      { cargando ? <p>Cargando...</p> :
            articulos.length > 0 ? 
            <Listado articulos={articulos} setArticulos={setArticulos} /> : 
            <h1>No hay artículos</h1>
      }      
    </>
  )
}