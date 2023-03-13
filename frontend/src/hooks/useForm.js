import { useState } from 'react'

export const useForm = (objetoInicial = {}) => {

    const [formulario, setFormulario] = useState(objetoInicial);

    /* Con esto, recojo todos los campos del form en un for. */
    const serializarFormulario = (formulario) => {
        const formdata = new FormData(formulario)
        const datos = {}
        for(let [name, value] of formdata){
            datos[name] = value
        }

        setFormulario(datos)
    }

    const enviarForm = (e) => {
        e.preventDefault();

        const datosForm = serializarFormulario(e.target)
        setFormulario(datosForm)
    }

    const modForm = (e) => {
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value
        })
    }

    return { formulario, enviarForm, modForm }
}