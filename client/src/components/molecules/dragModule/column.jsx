import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import Task from './Task';

const Column = ({ column, tasks }) => {
    const { setNodeRef } = useDroppable({
        id: column.id // Đặt ID để nhận diện cột
    });

    const style = {
        padding: '16px',
        width: '250px',
        backgroundColor: '#F4F5F7',
        borderRadius: '8px',
        border: '1px solid #ddd',
        minHeight: '300px'
    };

    return (
        <div ref={setNodeRef} style={style}>
            <h3>{column.title}</h3>
            <SortableContext items={tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
                {tasks.map((task) => (
                    <Task key={task.id} task={task} />
                ))}
            </SortableContext>
        </div>
    );
};

export default Column;