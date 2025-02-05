import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const Task = ({ task }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: task.id
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition: transition || 'transform 200ms ease', // Thêm transition mượt mà
        padding: '10px',
        margin: '8px 0',
        backgroundColor: isDragging ? '#e0f7fa' : '#fff', // Hiệu ứng khi kéo
        border: '1px solid #ccc',
        borderRadius: '4px',
        cursor: isDragging ? 'grabbing' : 'grab', // Đổi cursor khi kéo
        boxShadow: isDragging ? '0 4px 8px rgba(0,0,0,0.2)' : 'none' // Đổ bóng khi kéo
    };

    return (
        <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
            {task.content}
        </div>
    );
};

export default Task;