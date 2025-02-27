import loginLogo from '../../assets/login_img.svg'
import '../../App.css'
import { useNavigate } from "react-router-dom";
import {useState} from "react";
import apiCall from "../../services/axios.jsx";

export default function SignUp() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const doSignUp = async () => {
        try {
            const response = await apiCall.post('/create-user', {
                name: fullName,
                email: email,
                password: password,
            });
            alert('Sign up successfully!');
            navigate('/login')
        } catch (error) {
            console.error('Error:', error);
            return [];
        }
    }
    const onChangeInput = (ev, setName) => {
        setName(ev.target.value);
    }
    return (
        <div className="login-form w-full h-full flex items-center justify-center">
            <div className="container grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="left-side text-black min-h-96 p-10">
                    <div className="py-10 flex flex-col items-center">
                        <div className="icon-task pb-10 text-center content-center">
                            <svg width="4rem" fill="currentColor" className="bi bi-clipboard-check"
                                 viewBox="0 0 16 16">
                                <path fillRule="evenodd"
                                      d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z">
                                </path>
                                <path
                                    d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z">
                                </path>
                                <path
                                    d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z">
                                </path>
                            </svg>
                        </div>
                        <h1 className="pb-10 text-3xl">My-Task Let's Management Better</h1>
                        <div className="image-task">
                            <img src={loginLogo} alt="React Logo"/>
                        </div>
                    </div>
                </div>
                <div className="right-side p-0 lg:p-10">
                    <div className="p-10 space-y-5 bg-color text-white rounded h-full">
                        <input type="hidden" name="_token"/>
                        <div className="">
                            <h1 className="text-3xl text-center p-4">Sign Up</h1>
                        </div>
                        <div className="sm:col-span-4">
                            <div className="mt-2">
                                <div
                                    className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                    <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6">Fullname:
                                    </div>
                                    <input type="text" name="fullname" id="fullname"
                                           className="block min-w-0 grow py-3 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 rounded-xl"
                                           placeholder="" onChange={(ev) => onChangeInput(ev, setFullName)}/>
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <div className="mt-2">
                                <div
                                    className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                    <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6">Email:
                                    </div>
                                    <input type="text" name="email" id="email"
                                           className="block min-w-0 grow py-3 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 rounded-xl"
                                           placeholder="" onChange={(ev) => onChangeInput(ev, setEmail)}/>
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <div className="mt-2">
                                <div
                                    className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                    <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6">Password:
                                    </div>
                                    <input type="text" name="password" id="password"
                                           className="block min-w-0 grow py-3 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 rounded-xl"
                                           placeholder="" onChange={(ev) => onChangeInput(ev, setPassword)}/>
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <button type="submit" className="text-black bg-white p-4 rounded"
                                    onClick={() => doSignUp()}>SIGN UP
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
