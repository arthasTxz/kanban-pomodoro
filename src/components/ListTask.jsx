import React, { useState, useRef } from "react";
import Task from "./Task";
import Toggable from './Toggable'

export default function ListTask(props){
    // const list = props.listTask
    const [list, setList] = useState(props.listTask)
    const dragItem = useRef()
    const dragOverItem = useRef()


    function handleFormSubmit(name){
        setList((oldList)=>[...oldList, name])
    }


    

    const listTask = list.map( (task) => {
        return(
        <Task 
        name={task}
        />
        )
    })

    return(
        <div>
            <h6>{props.nameList}</h6>
            {listTask}
            <Toggable 
            onFormSubmit={handleFormSubmit}/>
        </div>
    )
}