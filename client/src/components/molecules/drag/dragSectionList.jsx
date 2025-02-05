import React, {useEffect, useState} from 'react';
import Card from "../../atoms/card/index.jsx";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import {
    useSensors,
    useSensor,
    PointerSensor,
    KeyboardSensor,
    DndContext,
    closestCorners,
    DragOverlay,
    defaultDropAnimation,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates, arrayMove } from '@dnd-kit/sortable';
import BoardSection from './dragSection.jsx';
import TaskItem from './taskItems.jsx';
import apiCall from "../../../services/axios.jsx";
import {useParams} from "react-router-dom";
import Button from "@mui/material/Button";
import {useSpinner} from "../../../services/spinnerContext.jsx";

const BoardSectionList = () => {
    const [statuses, setStatuses] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [boardSections, setBoardSections] = useState({});
    const [activeTaskId, setActiveTaskId] = useState(null);
    const { showSpinner, hideSpinner } = useSpinner();
    const {id} = useParams();
    // Fetch data from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const statusResponse = await apiCall.get(`/workspace/projects/${id}/status-task`);
                const taskResponse  = await apiCall.get(`/workspace/projects/${id}/tasks`);

                const statuses = statusResponse.data ? statusResponse.data.data : [];
                const tasks = taskResponse.data ? taskResponse.data.data.tasks : [];

                setStatuses(statuses);
                setTasks(tasks);

                const initialSections = {};
                statuses.forEach((status) => {
                    initialSections[status.name] = tasks.filter(
                        (task) => task.status_id === status.sequence
                    ) || []; // Đảm bảo mảng rỗng nếu không có task
                });

                setBoardSections(initialSections);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);


    // DnD Kit setup
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragStart = ({ active }) => {
        setActiveTaskId(active.id);
    };

    const handleDragOver = ({ active, over }) => {
        const activeContainer = findBoardSectionContainer(boardSections, active.id);
        const overContainer = findBoardSectionContainer(boardSections, over?.id) || over?.id; // Xử lý khi overContainer là rỗng

        if (!activeContainer || !overContainer || activeContainer === overContainer) {
            return;
        }

        setBoardSections((prevSections) => {
            const activeItems = prevSections[activeContainer];
            const overItems = prevSections[overContainer] || []; // Đảm bảo không bị undefined

            const activeIndex = activeItems.findIndex((item) => item.id === active.id);
            const movedTask = activeItems[activeIndex];

            return {
                ...prevSections,
                [activeContainer]: activeItems.filter((item) => item.id !== active.id),
                [overContainer]: [...overItems, movedTask],
            };
        });
    };


    const handleDragEnd = async ({ active, over }) => {
        const activeContainer = findBoardSectionContainer(boardSections, active.id);
        const overContainer = findBoardSectionContainer(boardSections, over?.id) || over?.id;

        if (!activeContainer || !overContainer) {
            setActiveTaskId(null);
            return;
        }

        const activeIndex = boardSections[activeContainer].findIndex(
            (task) => task.id === active.id
        );

        if (activeContainer === overContainer) {
            const overIndex = boardSections[overContainer].findIndex(
                (task) => task.id === over?.id
            );

            setBoardSections((prevSections) => ({
                ...prevSections,
                [overContainer]: arrayMove(
                    prevSections[overContainer],
                    activeIndex,
                    overIndex === -1 ? prevSections[overContainer].length - 1 : overIndex
                ),
            }));
            await onUpdateSectionServer(overContainer);
        } else {
            setBoardSections((prevSections) => {
                const activeTask = prevSections[activeContainer][activeIndex];
                const updatedActiveContainer = prevSections[activeContainer].filter(
                    (task) => task.id !== active.id
                );
                const updatedOverContainer = [
                    ...(prevSections[overContainer] || []),
                    activeTask,
                ];

                return {
                    ...prevSections,
                    [activeContainer]: updatedActiveContainer,
                    [overContainer]: updatedOverContainer,
                };
            });

            await onUpdateSectionServer(overContainer);
        }

        setActiveTaskId(null);
    };

    const onUpdateSectionServer = async (overContainer) => {
        try {
            const overStatus = statuses.find(status => status.name === overContainer);
            if (!overStatus) return; // Kiểm tra nếu không tìm thấy status

            const params = {
                status_id: overStatus.id,
            };

            const taskUpdate = await apiCall.put(`/update-tasks/${activeTaskId}`, params);
            console.log("Task updated:", taskUpdate);
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const findBoardSectionContainer = (sections, id) => {
        if (!id) return null; // Xử lý trường hợp ID không tồn tại

        if (id in sections) {
            return id; // Nếu ID là của section
        }

        return Object.keys(sections).find((key) =>
            (sections[key] || []).some((item) => item.id === id)
        );
    };

    const handleCreateTask = async (currentTask, taskName) => {
        const section = statuses.find(status => status.name === currentTask);
        showSpinner();
        try {
            const params = {
                status_id: section.id,
                name: taskName,
                project_id: id,
            };
            const taskResponse = await apiCall.post(`/create-task`, params);
            const newTask = taskResponse.data.data;

            setTasks((prevTasks) => {
                const updatedTasks = [...prevTasks, newTask];
                updateBoardSections(updatedTasks);
                return updatedTasks;
            });
        } catch (error) {
            console.error("Error creating task:", error);
        } finally {
            hideSpinner();
        }
    };

    const updateBoardSections = (updatedTasks) => {
        const updatedSections = {};
        statuses.forEach((status) => {
            updatedSections[status.name] = updatedTasks.filter(
                (task) => task.status_id === status.sequence
            ) || [];
        });
        setBoardSections(updatedSections);
    };

    const addGroup = async () => {

        // showSpinner();
        // try {
        //     const params = {
        //         status_id: section.id,
        //         name: taskName,
        //         project_id: id,
        //     };
        //     const taskResponse = await apiCall.post(`/create-status-task`, params);
        //     const newTask = taskResponse.data.data;
        //
        //     setTasks((prevTasks) => {
        //         const updatedTasks = [...prevTasks, newTask];
        //         updateBoardSections(updatedTasks);
        //         return updatedTasks;
        //     });
        // } catch (error) {
        //     console.error("Error creating task:", error);
        // } finally {
        //     hideSpinner();
        // }
    }

    return (
        <div className="drag-container flex gap-6">
            <DndContext
                sensors={sensors}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
            >
                <Grid container spacing={4} wrap={"nowrap"}>
                    {Object.keys(boardSections).map((sectionKey) => (
                        <Grid xs={4} key={sectionKey} wrap={"nowrap"}>
                            <BoardSection
                                id={sectionKey}
                                title={sectionKey}
                                tasks={boardSections[sectionKey]}
                                handleCreateTask={(currentTask, taskName) => handleCreateTask(currentTask, taskName)}
                            />
                        </Grid>
                    ))}
                </Grid>
                <DragOverlay>
                    {activeTaskId && <Card task={tasks.find((task) => task.id === activeTaskId)} />}
                </DragOverlay>
            </DndContext>
            <div>
                <div className="create-task hover:bg-slate-300 hover:text-white px-2 rounded">
                    <button className="py-2 px-4" onClick={addGroup}>+ Add Group</button>
                </div>
            </div>
        </div>

    );
};

export default BoardSectionList;