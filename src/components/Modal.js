import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const Modal = ({ setAddedRow, refetch }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const onSubmit = data => {
        console.log(data);
        setAddedRow(data);

        fetch(`https://enigmatic-retreat-31550.herokuapp.com/add-billing`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    toast.success('Bill added')
                    refetch()
                    setAddedRow('')
                } else {
                    toast('Bill not added')
                    setAddedRow('')
                }
            })

        reset();
    };

    return (
        <div>
            {/* <!-- The button to open modal --> */}
            {/* <label htmlFor="my-modal-6" className="btn modal-button">open modal</label> */}

            <input type="checkbox" id="my-modal-6" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box relative">
                    <label htmlFor="my-modal-6" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <form className='flex-1 flex flex-col p-5' onSubmit={handleSubmit(onSubmit)}>

                        {/* name input field */}
                        <label className='text-sm text-blue-900 pl-3 font-semibold' htmlFor="name">Full Name</label>
                        <input
                            className="my-2 py-2 px-3 border-2 border-blue-100 rounded-full"
                            type='text'
                            id='name'
                            placeholder='Enter your full name'
                            {...register("name", {
                                required: {
                                    value: true,
                                    message: "This field is required"
                                }
                            })} />
                        {errors.name?.type === "required" && <p className='text-sm text-red-500'>{errors.name.message}</p>}

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

                        {/* its for mobile nuumber */}
                        <label className='text-sm text-blue-900 pl-3 font-semibold' htmlFor="phone">Your Mobile Number</label>
                        <input
                            className="my-2 py-2 px-3 border-2 border-blue-100 rounded-full"
                            type='text'
                            id='phone'
                            placeholder='Enter your mobile number'
                            {...register("phone", {
                                required: {
                                    value: true,
                                    message: "This field is required"
                                },
                                maxLength: {
                                    value: 11,
                                    message: "Please enter 11 digit number"
                                },
                                minLength: {
                                    value: 11,
                                    message: "Please enter 11 digit number"
                                }
                            })} />
                        {errors.phone?.type === "required" && <p className='text-sm text-red-500'>{errors.phone.message}</p>}
                        {errors.phone?.type === "maxLength" && <p className='text-sm text-red-500'>{errors.phone.message}</p>}
                        {errors.phone?.type === "minLength" && <p className='text-sm text-red-500'>{errors.phone.message}</p>}


                        {/* paid amount */}
                        <label className='text-sm text-blue-900 pl-3 font-semibold' htmlFor="amount">Paid Amount</label>
                        <input
                            className="my-2 py-2 px-3 border-2 border-blue-100 rounded-full"
                            type='number'
                            id='amount'
                            placeholder='Enter paid amount'
                            {...register("amount", {
                                required: {
                                    value: true,
                                    message: "This field is required"
                                }
                            })} />
                        {errors.amount?.type === "required" && <p className='text-sm text-red-500'>{errors.amount.message}</p>}


                        <button className="modal-action" type="submit">
                            <label htmlFor="my-modal-6" className="btn">Add Bill</label>
                        </button>

                    </form>


                </div>
            </div>
        </div >
    );
};

export default Modal;