import Card from "../../atoms/card/index.jsx";
import React, {useEffect, useRef, useState} from 'react';
import Box from '@mui/material/Box';
import { useDroppable } from '@dnd-kit/core';
import {
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import DragSectionItem from "./dragSectionItems.jsx";
import UnstyledInput from "../../atoms/input/index.jsx";
import Button from "@mui/material/Button";
import UnstyledSelectBasic from "../../atoms/picker/index.jsx";
import {faCalendar, faFlag, faPlus, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const BoardSection = ({ id, title, tasks, handleCreateTask }) => {
    const [isCreate, setIsCreate] = useState(false);
    const [taskName, setTaskName] = useState("");
    const [section, setSection] = useState(null);
    const containerRef = useRef(null);
    const { setNodeRef, isOver } = useDroppable({ id });

    const handleGetSection = (ev) => {
        setIsCreate(true);
        const currentTask = ev.currentTarget.getAttribute('data-sections');
        setSection(currentTask);
    }

    // Hàm xử lý khi click ra ngoài container
    const handleClickOutside = (event) => {
        if (containerRef.current && !containerRef.current.contains(event.target)) {
            setIsCreate(false);
        }
    };

    const createTask = () => {
        handleCreateTask(section, taskName);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsCreate(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    return (
        <div ref={setNodeRef} className="flex flex-col flex-shrink-0 w-80 bg-secondary rounded-xl p-5" style={{ background: isOver ? '#d1e7dd' : '#ece0ef' }}>
            <div className="flex items-center flex-shrink-0 h-10 px-2">
                <span className="block text-sm font-semibold">{title}</span>
                <span
                    className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">{tasks.length}</span>
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
            <SortableContext id={id} items={tasks} strategy={verticalListSortingStrategy}>
                    {tasks.length > 0 ? (
                        tasks.map((task) => (
                            <DragSectionItem key={task.id} id={task.id}>
                                <Card task={task} />
                            </DragSectionItem>
                        ))
                    ) : (
                        <div className="rounded-md flex items-center justify-center"></div>
                    )}
                </SortableContext>
                {
                    isCreate && (
                        <div className={`create-container slide-container ${isCreate ? "slide-down" : "slide-up"} flex 
                        flex-col items-start p-4 mt-3 bg-white shadow-custom border rounded-lg cursor-pointer bg-opacity-90 
                        group hover:bg-opacity-100 space-y-2`}
                            ref={containerRef}
                        >
                            <div className="flex gap-2">
                                <input className="bg-transparent w-full p-1 focus:border-0 text-sm"
                                       placeholder="Task name..." onChange={(ev) => setTaskName(ev.target.value)}/>
                                <Button variant="contained" onClick={createTask}>Save</Button>
                            </div>
                            <div className="flex gap-2 items-center w-full">
                                <FontAwesomeIcon icon={faUser}/>
                                <UnstyledSelectBasic extendStyle="no-border-input"/>
                            </div>
                            <div className="flex gap-2 items-center w-full">
                                <FontAwesomeIcon icon={faCalendar}/>
                                <UnstyledSelectBasic extendStyle="no-border-input"/>
                            </div>
                            <div className="flex gap-2 items-center w-full">
                                <FontAwesomeIcon icon={faFlag}/>
                                <UnstyledSelectBasic extendStyle="no-border-input"/>
                            </div>
                        </div>
                    )
                }
            </div>
            <div className="flex items-center justify-start gap-4 hover:bg-sky-50 p-3 cursor-pointer rounded-lg"
                 data-sections={id} onClick={handleGetSection}>
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