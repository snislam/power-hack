import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Modal from './Modal';
import TableRow from './TableRow';

const BillingBody = () => {
    const [addedRow, setAddedRow] = useState('')
    const { data, isLoading, refetch } = useQuery('bills', () =>
        fetch(`http://localhost:5000/billing-list`)
            .then(res => res.json())
    )

    if (isLoading) {
        return 'loading'
    }

    return (
        <div className='overflow-x-auto my-10 px-20 mx-auto'>

            <div className='flex flex-row justify-between items-center mb-5 bg-slate-300 py-1 px-2'>
                <div className='flex flex-row items-center'>
                    <p className='mr-5 text-lg font-semibold'>Billings</p>
                    <input className='border-2 border-slate-500 bg-slate-300 px-2' type="text" placeholder='Search' />
                </div>
                <div>
                    <button className='bg-slate-900 px-5 py-2 text-slate-50'>
                        <label htmlFor="my-modal-6">Add New Bill</label>
                    </button>
                </div>
            </div>

            <Modal setAddedRow={setAddedRow} refetch={refetch} />

            <div className="overflow-x-auto bg-slate-200 p-5">
                <table className="table w-full border-collapse">
                    {/* table head */}
                    <thead className='py-3'>
                        <tr>
                            <th className='text-left border border-slate-900 p-2'>Billing ID</th>
                            <th className='text-left border border-slate-900 p-2'>Full Name</th>
                            <th className='text-left border border-slate-900 p-2'>Email</th>
                            <th className='text-left border border-slate-900 p-2'>Phone</th>
                            <th className='text-left border border-slate-900 p-2'>Pay Amount</th>
                            <th className='text-left border border-slate-900 p-2'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map(d => <TableRow key={d._id} bill={d} refetch={refetch} />)
                        }
                        {
                            addedRow && <TableRow bill={addedRow} />
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default BillingBody;