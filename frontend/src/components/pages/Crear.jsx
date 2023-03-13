import React, {useState} from 'react'
import { useForm } from '../../hooks/useForm'
import { Peticion } from '../../helpers/Peticion'
import { Global } from '../../helpers/Global'

export const Crear = () => {

  const [resultado, setResultado] = useState('');

  const { formulario, enviarForm, modForm } = useForm({})

  const guardarArticulo = async(e) => {
    e.preventDefault()

    // Recoger información.
    let articulo = formulario

    // Guardar con petición AJAX.
    let url = `${Global.url}crear`
    const { datos } = await Peticion(url, 'POST', articulo)

    if(datos.status === 'success'){
      setResultado('guardado')

      //Subir imagen
      const fileInput = document.querySelector('#file')
      if(fileInput.value){
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
      <h1>Crear artículo</h1>
      { resultado === 'guardado' ? <strong>Artículo guardado con éxito</strong> : '' }
      { resultado === 'error' ? <strong>Datos del formulario incorrectos</strong> : '' }
      { resultado === 'errorImagen' ? <strong>Error al cargar la imagen</strong> : '' }

      <form className='formulario' onSubmit={guardarArticulo}>
        <div className='form-group'>
          <label htmlFor='title'>Titulo</label>
          <input type='text' name='title' onChange={modForm} />
        </div>
        <div className='form-group'>
          <label htmlFor='content'>Contenido</label>
          <textarea name='content' onChange={modForm} />
        </div>
        <div className='form-group'>
          <label htmlFor='file0'>Imagen</label>
          <input type='file' name='file0' id='file' />
        </div>

        <input type='submit' value='Guardar' />
      </form>
    </div>
  )
}