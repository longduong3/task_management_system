import React, { useEffect, useState } from 'react';
import { DndContext, closestCenter, DragOverlay } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { fetchBoardData, updateBoardData } from './api.jsx';
import Column from './Column';
import Task from './Task';

const Board = () => {
    const [boardData, setBoardData] = useState(null);
    const [activeTask, setActiveTask] = useState(null);

    useEffect(() => {
        fetchBoardData().then(setBoardData);
    }, []);

    const handleDragStart = (event) => {
        const { active } = event;
        const task = boardData.tasks[active.id];
        setActiveTask(task); // Lưu task đang kéo
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        setActiveTask(null); // Reset sau khi kéo thả

        if (!over || active.id === over.id) return;

        const sourceColumnId = findColumnByTaskId(active.id);
        const destinationColumnId = findColumnByTaskId(over.id) || over.id;

        if (!sourceColumnId || !destinationColumnId) return;

        const newBoardData = { ...boardData };
        const sourceTasks = [...newBoardData.columns[sourceColumnId].taskIds];
        const destinationTasks = [...newBoardData.columns[destinationColumnId].taskIds];

        const sourceIndex = sourceTasks.indexOf(active.id);
        sourceTasks.splice(sourceIndex, 1);

        if (sourceColumnId === destinationColumnId) {
            const overIndex = destinationTasks.indexOf(over.id);
            newBoardData.columns[sourceColumnId].taskIds = arrayMove(destinationTasks, sourceIndex, overIndex);
        } else {
            const overIndex = over.id.startsWith('task-') ? destinationTasks.indexOf(over.id) : destinationTasks.length;
            destinationTasks.splice(overIndex === -1 ? destinationTasks.length : overIndex, 0, active.id);

            newBoardData.columns[sourceColumnId].taskIds = sourceTasks;
            newBoardData.columns[destinationColumnId].taskIds = destinationTasks;
        }

        setBoardData(newBoardData);
        updateBoardData(newBoardData);
    };

    const findColumnByTaskId = (taskId) => {
        return Object.values(boardData.columns).find((column) => column.taskIds.includes(taskId))?.id;
    };

    if (!boardData) return <p>Loading...</p>;

    return (
        <DndContext
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div style={{ display: 'flex', gap: '16px', padding: '16px' }}>
                {boardData.columnOrder.map((columnId) => {
                    const column = boardData.columns[columnId];
                    const tasks = column.taskIds.map((taskId) => boardData.tasks[taskId]);
                    return <Column key={column.id} column={column} tasks={tasks} />;
                })}
            </div>

            {/* Drag Overlay để xử lý hiệu ứng khi kéo */}
            <DragOverlay dropAnimation={{ duration: 200, easing: 'ease-out' }}>
                {activeTask ? <Task task={activeTask} /> : null}
            </DragOverlay>
        </DndContext>
    );
};

export default Board;