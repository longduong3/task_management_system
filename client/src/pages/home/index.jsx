import loginLogo from '../../assets/login_img.svg'
import '../../App.css'
import Card from '../../components/atoms/card'
import {Typography} from "@mui/material";

function Home() {
    return (
        <div className="flex flex-col w-full h-full overflow-auto text-gray-700 bg-gradient-to-tr bg-white p-5">
            <div className="title-task-board flex items-end justify-end pb-10">
                <div className="flex gap-4">
                    <div className="flex flex-col items-end">
                        <span className="font-bold">Dylan Hunter</span>
                        <span className="text-sm text-end">Admin Profile</span>
                    </div>
                    <img className="w-14 h-14 ml-auto rounded-full border" src='https://randomuser.me/api/portraits/women/26.jpg'/>
                </div>
            </div>
            <div className="px-10">
                <div className="title-task-management border-b">
                    <Typography variant="h5">Task Progress</Typography>
                </div>
                <div className="grid grid-cols-3 gap-6 py-5">
                    <div className="task-progress bg-transparent p-5 space-y-5 rounded-lg border shadow-custom h-90">
                        <div className="heading">
                            <h1 className="uppercase text-xs font-bold py-2">Task Management</h1>
                        </div>
                        <div className="task-progress-list space-y-5 h-full overflow-auto">
                            <div className="task-progress-item">
                                <h1 className="uppercase text-xs font-bold py-2">Website design</h1>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                    <div className="bg-amber-200 h-2.5 rounded-full w-[45%]"></div>
                                </div>
                            </div>
                            <div className="task-progress-item">
                                <h1 className="uppercase text-xs font-bold py-2">Quality Assurance</h1>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                    <div className="bg-red-200 h-2.5 rounded-full w-[45%]"></div>
                                </div>
                            </div>
                            <div className="task-progress-item">
                                <h1 className="uppercase text-xs font-bold py-2">Development</h1>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                    <div className="bg-cyan-300 h-2.5 rounded-full w-[45%]"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="recent-activity bg-transparent p-5 space-y-5 rounded-lg border shadow-custom h-90">
                        <div className="heading">
                            <h1 className="uppercase text-xs font-bold py-2">Recent Activity</h1>
                        </div>
                        <div className="list-recent h-full overflow-auto">
                            <div className="recent-item flex border-b border-l p-3 gap-4 items-center relative">
                                <div className="img-recent">
                                    <img className="w-10 h-10 ml-auto rounded-full border"
                                         src='https://randomuser.me/api/portraits/women/26.jpg'/>
                                </div>
                                <div className="info">
                                    <h1 className="uppercase text-xs font-bold py-2">Rechard Add New Task</h1>
                                    <p className="text-sm text-gray-300 font-light">20Min ago</p>
                                </div>
                            </div>
                            <div className="recent-item flex border-b border-l p-3 gap-4 items-center relative">
                                <div className="img-recent">
                                    <img className="w-10 h-10 ml-auto rounded-full border"
                                         src='https://randomuser.me/api/portraits/women/26.jpg'/>
                                </div>
                                <div className="info">
                                    <h1 className="uppercase text-xs font-bold py-2">Rechard Add New Task</h1>
                                    <p className="text-sm text-gray-300 font-light">20Min ago</p>
                                </div>
                            </div>
                            <div className="recent-item flex border-b border-l p-3 gap-4 items-center relative">
                                <div className="img-recent">
                                    <img className="w-10 h-10 ml-auto rounded-full border"
                                         src='https://randomuser.me/api/portraits/women/26.jpg'/>
                                </div>
                                <div className="info">
                                    <h1 className="uppercase text-xs font-bold py-2">Rechard Add New Task</h1>
                                    <p className="text-sm text-gray-300 font-light">20Min ago</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="allocated bg-transparent p-5 space-y-5 rounded-lg border shadow-custom h-90">
                        <div className="heading">
                            <h1 className="uppercase text-xs font-bold py-2">Allocated Task Members</h1>
                        </div>
                        <div className="list-allocated h-full overflow-auto">
                            <div className="allocated-item flex border-b p-3 gap-4 items-center relative">
                                <div className="img-allocated">
                                    <img className="w-10 h-10 ml-auto rounded-full border"
                                         src='https://randomuser.me/api/portraits/women/26.jpg'/>
                                </div>
                                <div className="info">
                                    <h1 className="uppercase text-xs font-bold py-2">Rechard Add New Task</h1>
                                    <p className="text-sm text-gray-300 font-light">20Min ago</p>
                                </div>
                            </div>
                            <div className="allocated-item flex border-b p-3 gap-4 items-center relative">
                                <div className="img-allocated">
                                    <img className="w-10 h-10 ml-auto rounded-full border"
                                         src='https://randomuser.me/api/portraits/women/26.jpg'/>
                                </div>
                                <div className="info">
                                    <h1 className="uppercase text-xs font-bold py-2">Rechard Add New Task</h1>
                                    <p className="text-sm text-gray-300 font-light">20Min ago</p>
                                </div>
                            </div>
                            <div className="allocated-item flex border-b p-3 gap-4 items-center relative">
                                <div className="img-allocated">
                                    <img className="w-10 h-10 ml-auto rounded-full border"
                                         src='https://randomuser.me/api/portraits/women/26.jpg'/>
                                </div>
                                <div className="info">
                                    <h1 className="uppercase text-xs font-bold py-2">Rechard Add New Task</h1>
                                    <p className="text-sm text-gray-300 font-light">20Min ago</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

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

export default Home
