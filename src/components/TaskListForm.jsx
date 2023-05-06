import React from 'react'
import { useState } from 'react'

export default function TaskListForm(props){
    const submitText = props.id ? 'Update':'Create'
    const [name, setName] = useState('')
    function handleNameChange(e){
        setName(()=> e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        props.onFormSubmit(name)
    }

    return(
        <div>
            <label>Name</label>
            <input 
            type='text'
            value={name}
            onChange={handleNameChange}></input>
            <button
            onClick={handleSubmit}>{submitText}</button>
        </div>
    )
}