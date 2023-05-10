import React, { useEffect } from 'react'
import TaskForm from './TaskForm'
import { useState, useRef } from 'react'

export default function ToggleableFormTask(props){

    const [isOpen, setIsOpen] = useState(false)
    const toggleRef = useRef(null);

    function handleFormSubmit(name){
        props.onFormSubmit(name, props.index)
        setIsOpen((previousIsOpen)=> !previousIsOpen )
    }

    function handleChange(){
        setIsOpen((previousIsOpen)=> !previousIsOpen )
    }

    function handleClickOutside(event) {
        if (toggleRef.current && !toggleRef.current.contains(event.target)) {
            setIsOpen((previousIsOpen)=> !previousIsOpen )
        }
      }

    function handleFormClose(){
        setIsOpen((previousIsOpen)=> !previousIsOpen )
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);

    if(isOpen){
        return(
            <TaskForm 
            onFormSubmit={handleFormSubmit}
            onFormClose={handleFormClose}/>
        )
    }else{
        return(
            <div >
                <button className='add-task'
                onClick={handleChange}>+</button> 
            </div>
        )
    }
    
}