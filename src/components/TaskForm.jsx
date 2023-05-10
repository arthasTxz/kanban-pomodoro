import React from 'react'
import { useState } from 'react'

export default function TaskForm(props){
    const submitText = props.id ? 'Update':'Create'
    const [name, setName] = useState('')
    const index = props.index
    function handleNameChange(e){
        setName(()=> e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        props.onFormSubmit(name, props.index)
    }
    return(
        <div className='task-form'>
            <input type='text' 
            defaultValue={props.name}
            value={name}
            onChange={handleNameChange}></input>
            <div className='button-form'>
            <button
            className='submit'
            onClick={handleSubmit}>{submitText}</button>
            <button
            className='cancel'
            onClick={props.onFormClose}>Close</button>
            </div>
        </div>
    )
}