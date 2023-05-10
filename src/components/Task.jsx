import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import {CSS} from '@dnd-kit/utilities'
export default function Task(props){
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({id: props.name})
    const index = props.index

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }
    return(
        <div className='task' ref={setNodeRef} style={style} {...attributes} {...listeners}>  
            <h5>{props.name}</h5>
        </div>
    )
}