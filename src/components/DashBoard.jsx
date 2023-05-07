import React from "react";
import ListTask from './ListTask'
import ToggableList from './ToggableList'
import { useState
 } from "react";
 import { DndContext, closestCenter } from "@dnd-kit/core";
 import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
 import { useDroppable } from "@dnd-kit/core";

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

    function handleDragEnd(event){
        const {active, over} = event
        console.log("ACTIVE : " + active.id)
        console.log("OVER :" + over.id)
            
        // if(active.id !== over.id){
        //     setList( (list)=> {
        //         const activeIndex = list.tasks.indexOf(active.id)
        //         const overIndex = list.tasks.indexOf(over.id)
                
        //         return {
        //             ...list, 
        //             tasks: }
        //     })
        // }
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
            <DndContext 
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}>
                <SortableContext
                items={list}
                strategy={verticalListSortingStrategy}>
                    {listOfList}
                </SortableContext>
            </DndContext>
            <ToggableList
            onFormSubmit={handleFormSubmit} />
        </div>
    )
}