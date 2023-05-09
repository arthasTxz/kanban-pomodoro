import React from "react";
import ListTask from './ListTask'
import ToggableList from './ToggableList'
import { useState, useEffect
 } from "react";
 import { DndContext, 
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors, } from "@dnd-kit/core";
 import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
 

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

    useEffect(function(){
        console.log("Render")
    }, [list])

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
          coordinateGetter: sortableKeyboardCoordinates,
        })
      );

    function handleFormSubmit(name){
        setList((oldList)=>[...oldList, {nameList: name, tasks:[]}])
    }

    //dragEnd controla el cambio de taraeas en los mismos containers
    function handleDragEnd(event){
        const {active, over} = event
        console.log("ACTIVE : " + active.id)
        console.log("OVER :" + over.id)

        const [activeContainer, activeIndex ]= findContainer(active.id, list)
        const [overContainer, overIndex ]= findContainer(over.id, list)
        // console.log(activeContainer)
        // console.log(overContainer)
        // console.log(activeIndex)
            
        if(active.id !== over.id && activeIndex === overIndex){
            setList((oldList)=> {
                // let arrayTask = [...oldList]
                let arrayTask = JSON.parse(JSON.stringify(oldList))
                let container = arrayTask[activeIndex]
                const taskDrag = container.tasks.indexOf(active.id)
                const taskDrop = container.tasks.indexOf(over.id)
                container = {...container, tasks:arrayMove(container.tasks, taskDrop, taskDrag)}
                // console.log(arrayTask)
                // console.log(container)
                arrayTask[activeIndex] = container
                console.log(arrayTask)
                return arrayTask
            })
        }
            
    }

    function findContainer(task, array){
        let taskList = null
        let name = null
        let index = null
        for(let i=0; i < array.length; i++){
          taskList = array[i]
          const lista = taskList.tasks
          for(const t of lista){
            if(task == t){
              name = taskList
              index = i
            }
          }
        }
        return [name, index]
    }

    // function moveBetweenContainers(items, activeContainer, activeIndex, ){}
   
    //  console.log(promps.listOfListTask[1].tasks)
    const listOfList = list.map( (list, index)=> {
        return(
        <ListTask 
        nameList={list.nameList}
        listTask={list.tasks}
        key={index}/>)
    })

    //dragOver Controla el cambio en containers distintos
    function handleDragOver(event){
        const {active, over} = event

        
    }
    

    return(
        <div className="lists-container">
            <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
           >
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