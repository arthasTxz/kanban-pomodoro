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
    useSensors,
    closestCorners } from "@dnd-kit/core";
 import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy} from "@dnd-kit/sortable";

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
                let arrayTask = [...oldList]
                // let arrayTask = JSON.parse(JSON.stringify(oldList))
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
   

    //dragOver Controla el cambio en containers distintos
    function handleDragOver(event){
        const {active, over} = event
        const [activeContainer, activeIndex ]= findContainer(active.id, list)
        const [overContainer, overIndex ]= findContainer(over.id, list)

        if (
            !activeContainer ||
            !overContainer ||
            activeContainer === overContainer
          ) {
            return;
          }

        if(activeIndex !== overIndex){
            setList((oldList)=> {
                //quizas deberia trabajar sobre esta lista copiada y no sobre la original
                let arrayTask = [...oldList]
                
                let dragContainer = arrayTask[activeIndex]
                let dropContainer = arrayTask[overIndex]
                
                const taskDrag = dragContainer.tasks.indexOf(active.id)
                const taskDrop = dropContainer.tasks.indexOf(over.id)
                let dragContainerTask = dragContainer.tasks
                let dropContainerTask = dropContainer.tasks
                // console.log(taskDrag)
                // console.log(taskDrop)
                if(active.id === over.id){
                    dragContainer = {...dragContainer, tasks: removeAtIndex(dragContainerTask, taskDrop)}
                    dropContainer = {...dropContainer, tasks: insertAtIndex(dragContainerTask,0,element)}
                }
                else{
                    let element = dragContainerTask[taskDrag]
                    dragContainerTask.splice(taskDrag,1)
                    // console.log(dragContainer)
                    dropContainerTask.splice(taskDrop, 0, element)
                    // console.log(dropContainerTask)
                    dragContainer = {...dragContainer, tasks: dragContainerTask}
                    dropContainer = {...dropContainer, tasks: dropContainerTask}
                }
                
                // console.log(dragContainer)
                // console.log(dropContainer)
                arrayTask[activeIndex] = dragContainer
                arrayTask[overIndex] = dropContainer
                console.log(arrayTask)
                return arrayTask
            })
        }
        
    }

    // setList(oldList => {
    //     let arrayTask = [...oldList]
    //     let dragContainer = arrayTask[activeIndex]
    //     let dropContainer = arrayTask[overIndex]
    //     const taskDrag = dragContainer.tasks.indexOf(active.id)
    //     const taskDrop = dropContainer.tasks.indexOf(over.id)
    //     let dragContainerTask = dragContainer.tasks
    //     let dropContainerTask = dropContainer.tasks
    //     const element = dragContainerTask[taskDrag]
        
    //     arrayTask[activeIndex] = dragContainer
    //     arrayTask[overIndex] = dropContainer
    //     console.log(arrayTask)
    //     return arrayTask
    // })

    const removeAtIndex = (array, index) => {
        return [...array.slice(0, index), ...array.slice(index + 1)];
      };
      
    const insertAtIndex = (array, index, item) => {
        return [...array.slice(0, index), item, ...array.slice(index)];
      };

    const listOfList = list.map( (list)=> {
        return(
        <ListTask 
        nameList={list.nameList}
        listTask={list.tasks}
        />)
    })
    

    return(
        <div className="lists-container">
            <DndContext 
            
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            
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