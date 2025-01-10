import '../../App.css'
import Card from '../../components/atoms/card'
import Button from '@mui/material/Button';
import {Typography} from "@mui/material";

function List() {
    return (
        <div className="flex flex-col w-full h-full overflow-auto text-gray-700 bg-gradient-to-tr bg-white p-5">
            <div className="create-task">
                <Button variant="contained">Add Task</Button>
            </div>
            {/*List task*/}
            <div className="flex flex-grow px-10 mt-4 space-x-6 overflow-auto">
                <div className="flex flex-col flex-shrink-0 w-72">
                    <div className="flex items-center flex-shrink-0 h-10 px-2">
                        <span className="block text-sm font-semibold">Backlog</span>
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
                        <Card/>
                        <Card/>
                        <Card/>
                    </div>
                </div>
                <div className="flex flex-col flex-shrink-0 w-72">
                    <div className="flex items-center flex-shrink-0 h-10 px-2">
                        <span className="block text-sm font-semibold">Backlog</span>
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
                        <Card/>
                        <Card/>
                        <Card/>
                    </div>
                </div>
                <div className="flex flex-col flex-shrink-0 w-72">
                    <div className="flex items-center flex-shrink-0 h-10 px-2">
                        <span className="block text-sm font-semibold">Backlog</span>
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
                        <Card/>
                        <Card/>
                        <Card/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default List
