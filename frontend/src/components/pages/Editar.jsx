import React, {useState, useEffect} from 'react'
import { useForm } from '../../hooks/useForm'
import { useParams } from 'react-router-dom'
import { Peticion } from '../../helpers/Peticion'
import { Global } from '../../helpers/Global'

export const Editar = () => {

  const [original, setOriginal] = useState([]);
  const { formulario, enviarForm, modForm } = useForm({})
  const [resultado, setResultado] = useState('');
  const parametros = useParams()
  let articulo

  useEffect(() => {
    getData()
  }, []);

  // Cargo el artículo original, sin cambios.
  const getData = async() => {
    let url = `${Global.url}articulo/${parametros.id}`
    const { datos } = await Peticion(url, 'GET')
    if(datos.status === 'success'){
      setOriginal(datos.articulo)
    }
  }

  const editarArticulo = async(e) => {
    e.preventDefault()

    // Recoger información.
    articulo = {title: original.title, content: original.content} 
    if(formulario.title){
      articulo.title = formulario.title
    }

    if(formulario.content){
      articulo.content = formulario.content
    }

    // Guardar con petición AJAX.
    let url = `${Global.url}articulo/${parametros.id}`
    const { datos } = await Peticion(url, 'PUT', articulo)

    if(datos.status === 'success'){
      setResultado('guardado')

      //Subir imagen
      const fileInput = document.querySelector('#file')
      if(fileInput.value !== ''){
        const formData = new FormData()
        formData.append('file0', fileInput.files[0])

        url = `${Global.url}subir-imagen/${datos.articulo._id}`
        const subidaImagen = await Peticion(url, 'POST', formData, true)

        if(subidaImagen.datos.status !== 'success'){
          setResultado('errorImagen')
        }
      }
    }
    else{
      setResultado('error')
    }
  }

  return (
    <div className='crear'>
      <h1>Editar artículo</h1>
      { resultado === 'guardado' ? <strong>Artículo editado con éxito</strong> : '' }
      { resultado === 'error' ? <strong>Datos del formulario incorrectos</strong> : '' }
      { resultado === 'errorImagen' ? <strong>Error al cargar la imagen</strong> : '' }

      <form className='formulario' onSubmit={editarArticulo}>
        <div className='form-group'>
          <label htmlFor='title'>Titulo</label>
          <input type='text' name='title' onChange={modForm}
            defaultValue={original.length !== 0 ? original.title : ''}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='content'>Contenido</label>
          <textarea name='content' onChange={modForm} 
            defaultValue={original.length !== 0 ? original.content : ''}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='file0'>Imagen</label>
          {
            original.length !== 0 ? 
            <div className='mascara-edit'>
              <img src= {`${Global.url}imagen/${original.image}`} />
            </div>
            : ''
          }
          <input type='file' name='file0' id='file' />
        </div>

        <input type='submit' value='Guardar' />
      </form>
    </div>
  )
}