import * as React from "react";
import '../../../../App.css';
import { useRef, useState } from 'react';
import {faHome, faListCheck, faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ModalCustom from '../../modal/index';
import { FormControl } from '@mui/base/FormControl';
import UnstyledInput from '../../../atoms/input'
import {Typography} from "@mui/material";
import Button from "@mui/material/Button";

function SideBar() {
    const [activeIndex, setActiveIndex] = useState(null);
    const [formData, setFormData] = useState('');
    const [spaces, setSpace] = useState([]);

    const toggleCollapse = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const handleGetDataForm = (ev) => {
        setFormData(ev.target.value)
    }

    const handelCreateSpace = () => {
        console.log(formData);
    };

    const items = [
        {icon: faHome, title: "Dashboard", content: "Dashboard 1"},
        {icon: faHome, title: "Item 2", content: "This is the content of Item 2"},
        {icon: faListCheck, title: "Item 3", content: "This is the content of Item 3"},
    ];
    return (
        <div className="sidebar bg-primary p-8 rounded-2xl space-y-5 h-screen">
            <div className="header-sidebar flex items-center gap-5">
                <div className="icon-sidebar bg-white rounded-full p-3">
                    <svg width="40" height="40" fill="currentColor" className="bi bi-clipboard-check"
                         viewBox="0 0 16 16">
                        <path fillRule="evenodd"
                              d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"></path>
                        <path
                            d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"></path>
                        <path
                            d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"></path>
                    </svg>
                </div>
                <div className="title">
                    <h1 className="text-white font-extrabold text-2xl">My-Task</h1>
                </div>
            </div>
            <div className="sidebar-content">
                <div className="list-sidebar">
                    <ul className="w-full max-w-md mx-auto ">
                        {items.map((item, index) => (
                            <li key={index} className="py-3">
                                <button
                                    className="flex gap-10 justify-between w-full text-left text-white font-medium hover:text-chart-color1 focus:outline-none"
                                    onClick={() => toggleCollapse(index)}
                                >
                                    <div className="title-icon flex gap-4 items-center">
                                        <FontAwesomeIcon icon={item.icon} />
                                        {item.title}
                                    </div>
                                    <span
                                        className={`transform transition-transform ${
                                            activeIndex === index ? "rotate-90" : "rotate-0"
                                        }`}
                                    >
                                    ▶
                                    </span>
                                </button>
                                <div
                                    className={`ps-8 overflow-hidden transition-all duration-300 ease-in-out ${
                                        activeIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                                    }`}
                                >
                                    <div className="mt-4 text-white text-xs hover:text-chart-color1 cursor-pointer">{item.content}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="border mt-5"/>
                <div className="list-space flex flex-col">
                    <div className="action-create-space p-5">
                        <ModalCustom btnName="Create new space">
                            <div className="title-modal mb-10">
                                <Typography variant="h6">Create List</Typography>
                                <Typography variant="body2" color="textSecondary">A List represents major departments or
                                    organizations, each with its own workflows, settings, and integrations.</Typography>
                            </div>
                            <FormControl defaultValue="" required>
                                <UnstyledInput label="Select location" onChange={handleGetDataForm} value={formData}/>
                                <UnstyledInput label="Name" value={formData.nameInput}/>
                            </FormControl>
                            <div className="footer-modal mt-5 border-t p-3 content-end text-end">
                                <Button variant="contained" className="rounded-2xl" onClick={handelCreateSpace}>Create</Button>
                            </div>
                        </ModalCustom>
                    </div>
                    <div className="list-item-space">
                        <ul className="">
                            {spaces.map((item, index) => (
                                <li key={index}>{item.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideBar
