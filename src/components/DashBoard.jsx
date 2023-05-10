import React from "react";
import ListTask from './ListTask'
import ToggableList from './ToggableList'
import {
  useState, useEffect
} from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners
} from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";

export default function DashBoard() {

  const [list, setList] = useState([
    {
      nameList: "ToDo",
      tasks: ['Walk Dog', 'Work out']
    },
    {
      nameList: "In Progres",
      tasks: ['Study', 'Make Coffe']
    },
    {
      nameList: "Done",
      tasks: ['Make the bed']
    }
  ]
  )

  useEffect(function () {
    console.log("Render")
  }, [list])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleFormSubmit(name) {
    setList((oldList) => [...oldList, { nameList: name, tasks: [] }])
  }

  function handleTaskFormSubmit(name, index){
    setList((oldList)=> {
      console.log(index)
      let array = [...oldList]
      array[index].tasks.push(name)
      return array
    })
  }

  function moveTask(lists, sourceListIndex, sourceTaskIndex, destinationListIndex, destinationTaskIndex) {
    // Copiar el objeto de las listas
    const array = [...lists];

    // Verificar si las listas de origen y destino existen
    if (array[sourceListIndex] && array[destinationListIndex]) {
      // Obtener la tarea que se va a mover
      const taskToMove = array[sourceListIndex].tasks[sourceTaskIndex];

      // Verificar si la tarea de origen existe en la lista
      if (taskToMove !== undefined) {
        // Eliminar la tarea de la lista de origen
        array[sourceListIndex].tasks.splice(sourceTaskIndex, 1);

        // Agregar la tarea a la lista de destino en el índice especificado
        array[destinationListIndex].tasks.splice(destinationTaskIndex, 0, taskToMove);
      }
    }

    // Devolver la lista actualizada
    return array;
  }

  //dragEnd controla el cambio de taraeas en los mismos containers
  function handleDragEnd(event) {
    const { active, over } = event
    const [activeContainer, activeIndex] = findContainer(active.id, list)
    const [overContainer, overIndex] = findContainer(over.id, list)

    if (active.id !== over.id && activeContainer === overContainer) {
      setList((oldList) => {
        let arrayTask = [...oldList]
        let activeContainerTasks = arrayTask[activeContainer].tasks;
        let overContainerTasks = arrayTask[overContainer].tasks;

        // Remove the item from the source container
        activeContainerTasks.splice(activeIndex, 1);

        // Insert the item into the destination container
        // If the destination container is empty, add it to the end
        overContainerTasks.splice(
          overIndex === -1 ? overContainerTasks.length : overIndex,
          0,
          active.id
        );

        return arrayTask;
      })
    }

  }

  function findContainer(task, array) {
    let indexTask = null
    let indexContainer = null
    for (let i = 0; i < array.length; i++) {
      const lista = array[i].tasks
      for (let j = 0; j < lista.length; j++) {
        if (task == lista[j]) {
          indexTask = j
          indexContainer = i
        }
      }
    }
    return [indexContainer, indexTask]
  }


  //dragOver Controla el cambio en containers distintos
  function handleDragOver(event) {
    const { active, over } = event
    const [activeContainer, activeIndex] = findContainer(active.id, list)
    const [overContainer, overIndex] = findContainer(over.id, list)

    setList((oldList) => {
      return moveTask(oldList, activeContainer, activeIndex, overContainer, overIndex)
    })
  }

  const listOfList = list.map((list, index) => {
    return (
      <ListTask
        nameList={list.nameList}
        listTask={list.tasks}
        onFormSubmit={handleTaskFormSubmit}
        index={index}
      />)
  })


  return (
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