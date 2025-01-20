import React, {useEffect, useState} from "react";
import apiCall from '../../../../services/axios.jsx';
import '../../../../App.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faHome, faListCheck, faPlus, faList} from '@fortawesome/free-solid-svg-icons';
import ModalCustom from '../../modal/index';
import { FormControl } from '@mui/base/FormControl';
import UnstyledInput from '../../../atoms/input';
import UnstyledSelectBasic from '../../../atoms/picker';
import { Typography, Button } from "@mui/material";
import {useNavigate} from "react-router-dom";

// Reusable Sidebar Item Component
function SidebarItem({ icon, title, content, isActive, toggleCollapse }) {
    return (
        <li className="py-3">
            <button
                className="flex gap-10 justify-between w-full text-left text-white font-medium hover:text-chart-color1 focus:outline-none"
                onClick={toggleCollapse}
            >
                <div className="title-icon flex gap-4 items-center">
                    <FontAwesomeIcon icon={icon} />
                    {title}
                </div>
                <span className={`transform transition-transform ${isActive ? "rotate-90" : "rotate-0"}`}>
                    ▶
                </span>
            </button>
            <div
                className={`ps-8 overflow-hidden transition-all duration-300 ease-in-out ${
                    isActive ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
            >
                <div className="mt-4 text-white text-xs hover:text-chart-color1 cursor-pointer">
                    {content}
                </div>
            </div>
        </li>
    );
}

// Reusable Space Item Component
function SpaceItem({ space, isActive, toggleCollapse, onGetDataFromForm, onHandleOpen, onCreateList, data, list }) {
    const navigate = useNavigate();
    // const onHandleOpen = (ev) => {
    //     let idSpace = ev.currentTarget.getAttribute('data-space');
    //
    // }
    return (
        <li>
            <div className="py-3 flex items-center w-full gap-2 border-b text-black">
                 <ModalCustom customStyle="hover:bg-chart-color1 h-10 w-10 text-sm" idSpace={space.id} onHandleOpen={onHandleOpen}>
                    <div className="title-modal mb-10">
                        <Typography variant="h6">Create List</Typography>
                        <Typography variant="body2" color="textSecondary">
                            A List represents major departments or organizations, each with its own workflows,
                            settings, and integrations.
                        </Typography>
                    </div>
                    <FormControl required>
                        <UnstyledSelectBasic label="Select location" data={data} />
                        <UnstyledInput label="Name" onChange={onGetDataFromForm} />
                    </FormControl>
                    <div className="footer-modal mt-5 border-t p-3 content-end text-end">
                        <Button variant="contained" className="rounded-2xl" onClick={onCreateList}>
                            Create
                        </Button>
                    </div>
                </ModalCustom>
                <button
                    className="flex text-white w-full justify-between text-left font-medium hover:text-chart-color1 focus:outline-none"
                    onClick={toggleCollapse}
                >
                    <div className="title-icon flex gap-4 items-center">
                        {space.name}
                    </div>
                    <span
                        className={`transform transition-transform ${
                            isActive ? "rotate-90" : "rotate-0"
                        }`}
                    >
                        ▶
                    </span>
                </button>
            </div>
            <div
                className={`ps-8 overflow-hidden transition-all duration-300 ease-in-out ${
                    isActive ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
            >
                {list.map((item, idx) => (
                    <div
                        key={idx}
                        className="mt-4 text-white text-xm hover:text-chart-color1 cursor-pointer flex gap-4 items-center py-3"
                        onClick={() => navigate('/list')}
                    >
                        <FontAwesomeIcon icon={faList}/>
                        <span>{item.name}</span>
                    </div>
                ))}
            </div>
        </li>
    );
}

function SideBar() {
    const [activeIndex, setActiveIndex] = useState(null); // State cho list-sidebar
    const [activeSpaceIndex, setActiveSpaceIndex] = useState(null); // State cho list-item-space
    const [location, setLocation] = useState('');
    const [nameSpace, setNameSpace] = useState('');
    const [spaces, setSpaces] = useState([]);
    const [nameProjects, setNameProjects] = useState([]);
    const [list, setList] = useState([]);
    const data = [{ value: '1', text: '1' }, { value: '2', text: '2' }];

    const session = JSON.parse(localStorage.getItem('session'));
    const userInfo = session.user;
    const items = [
        { icon: faHome, title: "Dashboard", content: "Dashboard 1" },
        { icon: faHome, title: "Item 2", content: "This is the content of Item 2" },
        { icon: faListCheck, title: "Item 3", content: "This is the content of Item 3" },
    ];

    useEffect(() => {
        const getWorkspaces = async () => {
            const spacesData = await getWorkSpace();
            setSpaces(spacesData);
        };

        getWorkspaces();
    }, []);

    const getWorkSpace = async () => {
        try {
            // const response = await apiCall.get('/workspaces');
            const response = await apiCall.get(`/users/${userInfo.uId}/workspaces`);
            return response.data ? response.data.data : [];
        } catch (error) {
            console.error('Error:', error);
            return [];
        }
    }

    const onHandleOpen = (ev) => {
        let idSpace = ev.currentTarget.getAttribute('data-space');
    }

    const toggleCollapse = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const toggleSpaceCollapse = (index) => {
        setActiveSpaceIndex(activeSpaceIndex === index ? null : index);
    };

    const handleNameSpaceChange = (e) => setNameSpace({
        name: e.target.value,
        owned_id: 1
    });

    const onCreateList = async (ev) => {
        setList([...list, nameProjects]);
        try {
            const response = await apiCall.get('/create-project');
            return response.data ? response.data.data : [];
        } catch (error) {
            console.error('Error:', error);
            return [];
        }
        setLocation('');
        setNameSpace('');
    }

    const handleCreateSpace = async () => {
        setSpaces([...spaces, nameSpace]);
        try {
            const response = await apiCall.post('/create-workspace', {
                name: nameSpace.name,
                owner_id: userInfo.uId
            });
        } catch (error) {
            console.error('Error:', error);
            return [];
        }
        setLocation('');
        setNameSpace('');
    };

    return (
        <div className="sidebar bg-primary p-8 rounded-2xl space-y-5 h-screen overflow-y-scroll overflow-d-none">
            {/* Sidebar Header */}
            <div className="header-sidebar flex items-center gap-5">
                <div className="icon-sidebar bg-white rounded-full p-3">
                    <svg
                        width="40"
                        height="40"
                        fill="currentColor"
                        className="bi bi-clipboard-check"
                        viewBox="0 0 16 16"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"
                        ></path>
                        <path
                            d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"
                        ></path>
                        <path
                            d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3z"
                        ></path>
                    </svg>
                </div>
                <h1 className="text-white font-extrabold text-2xl">My-Task</h1>
            </div>

            {/* Sidebar Content */}
            <div className="sidebar-content">
                <div className="list-sidebar">
                    <ul className="w-full max-w-md mx-auto">
                        {items.map((item, index) => (
                            <SidebarItem
                                key={index}
                                icon={item.icon}
                                title={item.title}
                                content={item.content}
                                isActive={activeIndex === index}
                                toggleCollapse={() => toggleCollapse(index)}
                            />
                        ))}
                    </ul>
                </div>
                <div className="border mt-5" />
                <div className="list-space flex flex-col">
                    <div className="action-create-space p-5">
                        <ModalCustom btnName="Create new space" customStyle="bg-chart-color1">
                            <div className="title-modal mb-10">
                                <Typography variant="h6">Create Space</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    A space represents a workspace or a team within your organization.
                                </Typography>
                            </div>
                            <FormControl required>
                                <UnstyledSelectBasic label="Select location" data={data} />
                                <UnstyledInput label="Name" onChange={handleNameSpaceChange} />
                            </FormControl>
                            <div className="footer-modal mt-5 border-t p-3 content-end text-end">
                                <Button
                                    variant="contained"
                                    className="rounded-2xl"
                                    onClick={handleCreateSpace}
                                >
                                    Create
                                </Button>
                            </div>
                        </ModalCustom>
                    </div>
                    <ul className="list-space-item">
                        {spaces.map((space, index) => (
                            <SpaceItem
                                key={index}
                                space={space}
                                isActive={activeSpaceIndex === index}
                                toggleCollapse={() => toggleSpaceCollapse(index)}
                                onGetDataFromForm={(e) =>
                                    setNameProjects({
                                        name: e.target.value
                                    })
                                }
                                onHandleOpen={onHandleOpen}
                                onCreateList={onCreateList}
                                list={list}
                                data={data}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default SideBar;