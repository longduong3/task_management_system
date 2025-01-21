import React, { useState } from 'react';
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

const initializeBoard = (tasks) => {
    const taskSections = {
        backlog: 'backlog',
        'in progress': 'in progress',
        done: 'done',
    }
    const boardSections = {};

    Object.keys(taskSections).forEach((boardSectionKey) => {
        boardSections[boardSectionKey] = tasks.filter(
            (task) => task.status === boardSectionKey
        );
    });

    return boardSections;
};

const findBoardSectionContainer = (boardSections, id) => {
    if (id in boardSections) {
        return id;
    }

    const container = Object.keys(boardSections).find((key) =>
        boardSections[key].find((item) => item.id === id)
    );
    return container;
};

const BoardSectionList = () => {
    const tasks = [
        {
            id: 1,
            title: 'Title 2',
            description: 'Desc 2',
            status: 'backlog',
        },
        {
            id: 2,
            title: 'Title 3',
            description: 'Desc 3',
            status: 'backlog',
        },
        {
            id: 3,
            title: 'Title 4',
            description: 'Desc 4',
            status: 'done',
        },
    ];
    const initialBoardSections = initializeBoard(tasks);
    const [boardSections, setBoardSections] = useState(initialBoardSections);
    const [activeTaskId, setActiveTaskId] = useState(null);

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
        const overContainer = findBoardSectionContainer(boardSections, over?.id);

        if (!activeContainer || !overContainer || activeContainer === overContainer) {
            return;
        }

        setBoardSections((boardSection) => {
            const activeItems = boardSection[activeContainer];
            const overItems = boardSection[overContainer];

            const activeIndex = activeItems.findIndex((item) => item.id === active.id);
            const overIndex = overItems.findIndex((item) => item.id !== over?.id);

            return {
                ...boardSection,
                [activeContainer]: [
                    ...boardSection[activeContainer].filter((item) => item.id !== active.id),
                ],
                [overContainer]: [
                    ...boardSection[overContainer].slice(0, overIndex),
                    boardSections[activeContainer][activeIndex],
                    ...boardSection[overContainer].slice(overIndex, boardSection[overContainer].length),
                ],
            };
        });
    };

    const handleDragEnd = ({ active, over }) => {
        const activeContainer = findBoardSectionContainer(boardSections, active.id);
        const overContainer = findBoardSectionContainer(boardSections, over?.id);
        console.log(overContainer);

        if (!activeContainer || !overContainer || activeContainer !== overContainer) {
            return;
        }

        const activeIndex = boardSections[activeContainer].findIndex(
            (task) => task.id === active.id
        );
        const overIndex = boardSections[overContainer].findIndex(
            (task) => task.id === over?.id
        );

        if (activeIndex !== overIndex) {
            setBoardSections((boardSection) => ({
                ...boardSection,
                [overContainer]: arrayMove(
                    boardSection[overContainer],
                    activeIndex,
                    overIndex
                ),
            }));
        }

        setActiveTaskId(null);
    };

    const dropAnimation = {
        ...defaultDropAnimation,
    };

    const getTaskById = (tasks, id) => {
        return tasks.find((task) => task.id === id);
    }

    const task = activeTaskId ? getTaskById(tasks, activeTaskId) : null;

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
            <Grid container spacing={4}>
                {Object.keys(boardSections).map((boardSectionKey) => (
                    <Grid item xs={4} key={boardSectionKey}>
                        <BoardSection
                            id={boardSectionKey}
                            title={boardSectionKey}
                            tasks={boardSections[boardSectionKey]}
                        />
                    </Grid>
                ))}
                <DragOverlay dropAnimation={dropAnimation}>
                    {/*{task ? <TaskItem task={task}/> : null}*/}
                    {task ? <Card task={task}/> : null}
                </DragOverlay>
            </Grid>
        </DndContext>
    );
};

export default BoardSectionList;





