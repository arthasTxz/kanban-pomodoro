import React from "react";
import ListTask from './ListTask'
import ToggableList from './ToggableList'
import { useState
 } from "react";
 import { DndContext } from "@dnd-kit/core";

export default function DashBoard(){

    const [list, setList] = useState([
        {nameList: "ToDo",
        tasks: ['Walk Dog', 'Work out']},
        {nameList: "In Progres",
      tasks: ['Study', 'Make Coffe']},
      {nameList: "Done",
      tasks:['Make the bed']}
    ]
    )

    function handleFormSubmit(name){
        setList((oldList)=>[...oldList, {nameList: name, tasks:[]}])
    }

   
    //  console.log(promps.listOfListTask[1].tasks)
    const listOfList = list.map( (list)=> {
        return(
        <ListTask 
        nameList={list.nameList}
        listTask={list.tasks}/>)
    })
    

    return(
        <div className="lists-container">
            <DndContext>
                {listOfList}
            </DndContext>
            <ToggableList
            onFormSubmit={handleFormSubmit} />
        </div>
    )
}