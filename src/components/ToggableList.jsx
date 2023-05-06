import React from "react";
import { useState } from "react";
import TaskListForm from './TaskListForm'

export default function ToggableList(props){
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
            <TaskListForm
            onFormSubmit={handleFormSubmit} />
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