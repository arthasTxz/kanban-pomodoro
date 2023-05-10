import React, { useState} from "react";
import Task from "./Task";
import Toggable from './Toggable'
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";

export default function ListTask(props){
    const [indice, setIndex] = useState(props.index)
    console.log("el indice es " + indice)
    const list = props.listTask

    const {setNodeRef} = useDroppable({
            id: props.nameList
        })
    

    function handleFormSubmit(name, index){
        props.onFormSubmit(name, index)
    }

    const listTask = list.map( (task) => {
        return(
        <Task 
        name={task}
        index={indice}
        />
        )
    })

    return(
        <div ref={setNodeRef} className="list-task">
            <h6>{props.nameList}</h6>
            <SortableContext
                items={list}
                id={props.nameList}>
                {listTask}
            </SortableContext>
            <Toggable 
            onFormSubmit={handleFormSubmit}
            index={indice}
            />
        </div>
    )
}