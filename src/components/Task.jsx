import React from 'react'
import { useDraggable } from '@dnd-kit/core'

export default function Task(props){
    return(
        <div className='task'>
            <h5>{props.name}</h5>
        </div>
    )
}