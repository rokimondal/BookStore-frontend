import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsGoogle } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContex";
const Register = () => {
    const [message, setMessage] = useState("")
    const navigate = useNavigate();
    const { registerUser, googleSignIn } = useAuth()
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async data => {
        try {
            await registerUser(data);
            navigate('/')
        } catch (error) {
            setMessage("Please provide a valid email and password");
        }
    };
    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
            navigate('/');
        } catch (error) {
            alert("Google signup failed");
            console.log(error)
        }
    }
    return (
        <div className="h-[calc(100vh-120px)] flex justify-center items-center">
            <div className="w-full max-w-sm mx-auto bg-white shadow-lg rounded px-7 pt-6 pb-8 mb-4">
                <h2 className="text-xl font-semibold mb-4">Please Register</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className=" block text-sm text-gray-700 font bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            {...register("email", { required: true })}
                            type="email" name="email" id="email" placeholder="Email Address" className="w-full border border-gray-200 shadow-sm py-2 px-3 focus:outline-none focus:shadow-gray-300 focus:shadow-md rounded-md leading-normal placeholder-gray-300" />
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
                        <button className=" bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-semibold focus:outline-none focus:shadow-md focus:shadow-blue-200">
                            Sign Up
                        </button>
                    </div>
                </form>
                <p className="font-medium text-sm inline-block align-baseline mt-3 text-gray-500">
                    Already have an account? Please <Link to={"/login"} className="text-blue-500 hover:text-blue-700">Login</Link>
                </p>
                {/* google signIn */}
                <div className="mt-4">
                    <button
                        onClick={handleGoogleSignIn} className="bg-blue-400 flex flex-wrap text-white justify-center items-center py-2 px-3 rounded-md gap-2 bg-secondary w-full hover:bg-blue-800 hover:shadow-md hover:shadow-blue-300">
                        <BsGoogle />
                        sign up with Google
                    </button>
                </div>
                <p className="text-xs text-center text-gray-500 mb-2 mt-5">&copy;2025 Book Store. All rights reserved.</p>
            </div>
        </div >
    )
}

export default Register