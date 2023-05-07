import React, { useState, useRef } from "react";
import Task from "./Task";
import Toggable from './Toggable'
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

export default function ListTask(props){
    // const list = props.listTask
    const [list, setList] = useState(props.listTask)

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
            <SortableContext
                items={list}>
                {listTask}
            </SortableContext>
            <Toggable 
            onFormSubmit={handleFormSubmit}/>
        </div>
    )
}