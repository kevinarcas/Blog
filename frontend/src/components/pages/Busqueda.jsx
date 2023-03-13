import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Peticion } from '../../helpers/Peticion';
import { Global } from '../../helpers/Global';
import { Listado } from './Listado';

export const Busqueda = () => {
  
  const [articulos, setArticulos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const parametros = useParams()
  
  useEffect(() => {
    getData()
  }, []);

  useEffect(() => {
    getData()
  }, [parametros]);

  const getData = async() => {
    let url = `${Global.url}buscar/${parametros.busqueda}`
    const {datos, carga} = await Peticion(url, 'GET')

    if(datos.status === 'success'){
      setArticulos(datos.articulosEncontrados)
    }
    else{
      setArticulos([])
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