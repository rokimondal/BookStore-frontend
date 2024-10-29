import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import getBaseUrl from "../utils/getBaseUrl";
const AdminLogin = () => {
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async data => {
        try {
            const response = await axios.post(`${getBaseUrl()}/api/auth/admin`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const auth = response.data;
            if (auth.token) {
                localStorage.setItem('token', auth.token);
                localStorage.setItem('tokenSavedAt', new Date().toISOString());
                navigate('/dashboard')
            }
        } catch (error) {
            setMessage("Please provide a valid email and password");
        }
    };
    return (
        <div className="h-[calc(100vh-120px)] flex justify-center items-center">
            <div className="w-full max-w-sm mx-auto bg-white shadow-lg rounded px-7 pt-6 pb-8 mb-4">
                <h2 className="text-xl font-semibold mb-4">Please Login As Admin</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className=" block text-sm text-gray-700 font bold mb-2" htmlFor="username">
                            UserName
                        </label>
                        <input
                            {...register("username", { required: true })}
                            type="username" name="username" id="username" placeholder="Username" className="w-full border border-gray-200 shadow-sm py-2 px-3 focus:outline-none focus:shadow-gray-300 focus:shadow-md rounded-md leading-normal placeholder-gray-300" />
                    </div>
                    <div className="mb-4">
                        <label className=" block text-sm text-gray-700 font bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            {...register("password", { required: true })}
                            type="password" name="password" id="password" placeholder="Password" className="w-full border border-gray-200 shadow-sm py-2 px-3 focus:outline-none focus:shadow-gray-300 focus:shadow-md rounded-md leading-normal placeholder-gray-300" />
                    </div>
                    {
                        message && <p className="text-red-500 text-sm italic mb-4">{message}</p>
                    }
                    <div className="flex items-center justify-between">
                        <button className=" bg-blue-500 w-full hover:bg-blue-700 text-white px-4 py-2 rounded-md font-semibold focus:outline-none focus:shadow-md focus:shadow-blue-200">
                            Login
                        </button>
                    </div>
                </form>
                <p className="text-xs text-center text-gray-500 mb-2 mt-5">&copy;2025 Book Store. All rights reserved.</p>
            </div>
        </div >
    )
}

export default AdminLogin