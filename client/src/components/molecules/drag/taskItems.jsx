import { Card, CardContent } from '@mui/material';

const TaskItem = ({task}) => {
    return (
        <Card>
            <CardContent>{task.title}</CardContent>
        </Card>
    );
};

export default TaskItem;
