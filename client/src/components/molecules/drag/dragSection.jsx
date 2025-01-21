import Card from "../../atoms/card/index.jsx";
import React from 'react';
import Box from '@mui/material/Box';
import { useDroppable } from '@dnd-kit/core';
import {
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import DragSectionItem from "./dragSectionItems.jsx";

const BoardSection = ({ id, title, tasks }) => {
    const { setNodeRef } = useDroppable({
        id,
    });

    return (
        <div className="flex flex-col flex-shrink-0 w-72 bg-secondary rounded-xl p-5" style={{background: '#ece0ef'}}>
            <div className="flex items-center flex-shrink-0 h-10 px-2">
                <span className="block text-sm font-semibold">{title}</span>
                <span
                    className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">6</span>
                <button
                    className="flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                </button>
            </div>
            {/*Card*/}
            <div className="flex flex-col pb-2 overflow-auto">
                <SortableContext
                    id={id}
                    items={tasks}
                    strategy={verticalListSortingStrategy}
                >
                    <div ref={setNodeRef}>
                        {tasks.map((task) => (
                            <Box key={task.id} sx={{mb: 2}}>
                                <DragSectionItem id={task.id}>
                                    <Card task={task}/>
                                    {/*<TaskItem task={task}/>*/}
                                </DragSectionItem>
                            </Box>
                        ))}
                    </div>
                </SortableContext>
            </div>
            <div className="flex items-center justify-start gap-4 hover:bg-sky-50 p-3 cursor-pointer rounded-lg">
                <button
                    className="text-indigo-500 rounded ">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                </button>
                <h5>Create task</h5>
            </div>
        </div>
    );
};

export default BoardSection;