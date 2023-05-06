import React from 'react'
import TaskForm from './TaskForm'
import { useState } from 'react'

export default function ToggleableFormTask(props){

    const [isOpen, setIsOpen] = useState(false)

    function handleFormSubmit(name){
        props.onFormSubmit(name)
        setIsOpen((previousIsOpen)=> !previousIsOpen )
    }

    function handleChange(){
        setIsOpen((previousIsOpen)=> !previousIsOpen )
    }

    if(isOpen){
        return(
            <TaskForm 
            onFormSubmit={handleFormSubmit}/>
        )
    }else{
        return(
            <div>
                <button className='add-task'
                onClick={handleChange}>+</button> 
            </div>
        )
    }
    
}