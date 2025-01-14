import '../../App.css'
import Card from '../../components/atoms/card'
import Button from '@mui/material/Button';
import BoardSectionList from '../../components/molecules/drag/dragSectionList.jsx';
import {Typography} from "@mui/material";

function List() {
    return (
        <div className="flex flex-col w-full h-full overflow-auto text-gray-700 bg-gradient-to-tr bg-white p-5">
            <div className="create-task">
                <Button variant="contained">Add Task</Button>
            </div>
            {/*List task*/}
            <div className="flex flex-grow mt-4 space-x-6 overflow-auto">
                <BoardSectionList/>
            </div>
        </div>
    )
}

export default List
