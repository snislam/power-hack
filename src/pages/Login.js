import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    return (
        <div className='bg-slate-100 py-10'>
            <div className='flex flex-row w-[90vw] lg:w-[900px] mx-auto my-10 shadow-lg bg-white'>
                <div className='flex-1  p-5'>
                    <form className='flex flex-col ' onSubmit={handleSubmit(onSubmit)}>

                        <h2 className='text-4xl text-center font-semibold py-2 my-3'>Please Log In</h2>

                        {/* email input field */}
                        <label className='text-sm text-blue-900 pl-3 font-semibold' htmlFor="email">Your Email</label>
                        <input
                            className="my-2 py-2 px-3 border-2 border-blue-100 rounded-full"
                            type='email'
                            id='email'
                            placeholder='Enter your email'
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: "This field is required"
                                },
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Please enter a valid email address."
                                }
                            })} />
                        {errors.email?.type === "required" && <p className='text-sm text-red-500'>{errors.email.message}</p>}
                        {errors.email?.type === "pattern" && <p className='text-sm text-red-500'>{errors.email.message}</p>}

                        {/* password input field */}
                        <label className='text-sm text-blue-900 pl-3 font-semibold' htmlFor="password">Enter Your Password</label>
                        <input
                            className="my-2 py-2 px-3 border-2 border-blue-100 rounded-full"
                            type='password'
                            id='password'
                            placeholder='Enter your password'
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: "This field is required"
                                }
                            })} />
                        {errors.password?.type === "required" && <p className='text-sm text-red-500'>{errors.password.message}</p>}

                        <input className='text-slate-100 bg-blue-700 py-2 px-4 hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-500 duration-700 my-2 rounded-full' type="submit" value="Sign In" />
                    </form>
                    <p className='mt-3'>Are you new here? <Link className='text-blue-500' to='/register'>Register here</Link> </p>
                </div>
                <div className='flex-1 hidden lg:flex'>
                    <img src="https://i.ibb.co/0Xvdd88/login.jpg" alt="home rent and sale platform" />
                </div>
            </div>
        </div>
    );
};

export default Login;