import React, { useState} from "react";
import Task from "./Task";
import Toggable from './Toggable'
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";

export default function ListTask(props){
    // const list = props.listTask
    // const [list, setList] = useState(props.listTask)
    const list = props.listTask

    const {setNodeRef} = useDroppable({
            id: props.nameList
        })
    
    console.log(list)

    // function handleFormSubmit(name){
    //     setList((oldList)=>[...oldList, name])
    // }

    const listTask = list.map( (task) => {
        return(
        <Task 
        name={task}
        />
        )
    })

    return(
        <div ref={setNodeRef} key={props.key}>
            <h6>{props.nameList}</h6>
            <SortableContext
                items={list}
                id={props.nameList}>
                {listTask}
            </SortableContext>
            <Toggable 
            />
        </div>
    )
}