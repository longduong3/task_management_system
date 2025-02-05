import { v4 as uuidv4 } from 'uuid';

let data = {
    columns: {
        'column-1': { id: 'column-1', title: 'To Do', taskIds: ['task-1', 'task-2'] },
        'column-2': { id: 'column-2', title: 'In Progress', taskIds: ['task-3'] },
        'column-3': { id: 'column-3', title: 'Done', taskIds: [] }
    },
    tasks: {
        'task-1': { id: 'task-1', content: 'Design Homepage' },
        'task-2': { id: 'task-2', content: 'Fix Login Bug' },
        'task-3': { id: 'task-3', content: 'Update Database Schema' }
    },
    columnOrder: ['column-1', 'column-2', 'column-3']
};

export const fetchBoardData = () => Promise.resolve(data);

export const updateBoardData = (newData) => {
    data = newData;
    return Promise.resolve(data);
};

export const addTask = (columnId, content) => {
    const newTaskId = uuidv4();
    const newTask = { id: newTaskId, content };
    data.tasks[newTaskId] = newTask;
    data.columns[columnId].taskIds.push(newTaskId);
    return Promise.resolve(newTask);
};