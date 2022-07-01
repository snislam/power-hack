import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Modal from './Modal';
import TableRow from './TableRow';

const BillingBody = () => {
    const [addedRow, setAddedRow] = useState('')
    const [searchdata, setSearchData] = useState('')
    const [pageCount, setPageCount] = useState(0)
    const [pageNumber, setPageNumber] = useState(0)
    const limit = 10;
    const { data, isLoading, refetch } = useQuery('bills', () => fetch(`http://localhost:5000/billing-list?page=${pageNumber}&size=${limit}`)
        .then(res => res.json())
    )

    useEffect(() => {
        fetch('http://localhost:5000/billingscount')
            .then(res => res.json())
            .then(data => {
                const count = data.count;
                const page = Math.ceil(count / limit);
                setPageCount(page);
            })
    }, [])

    if (isLoading) {
        return 'loading'
    }



    const searchDataByEmail = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        console.log(email)
        fetch(`http://localhost:5000/search-billing-email/${email}`)
            .then(res => res.json())
            .then(data => {
                setSearchData(data)
                e.target.email.value = ''
            })
    }

    const searchDataByName = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        console.log(name)
        fetch(`http://localhost:5000/search-billing-name/${name}`)
            .then(res => res.json())
            .then(data => {
                setSearchData(data)
                e.target.name.value = ''
            })
    }

    const searchDataByNumber = (e) => {
        e.preventDefault();
        const number = e.target.number.value;
        console.log(number)
        fetch(`http://localhost:5000/search-billing-number/${number}`)
            .then(res => res.json())
            .then(data => {
                setSearchData(data)
                e.target.number.value = ''
            })
    }

    return (
        <div>
            <div className='overflow-x-auto my-10 px-20 mx-auto'>
                <div className='flex flex-row justify-between items-center mb-5 bg-slate-300 py-1 px-2'>
                    <div className='flex flex-row items-center'>
                        <p className='mr-5 text-lg font-semibold'>Billings</p>
                        <form onSubmit={searchDataByEmail}>
                            <input name='email' className='border-2 border-slate-500 bg-slate-300 px-2' type="text" placeholder='Search By Email' />
                            <input type="submit" value="Search" className='bg-slate-900 px-5 border-2 border-slate-900 mr-2 text-slate-50' />
                        </form>
                        <form onSubmit={searchDataByName}>
                            <input name='name' className='border-2 border-slate-500 bg-slate-300 px-2' type="text" placeholder='Search By name' />
                            <input type="submit" value="Search" className='bg-slate-900 px-5 border-2 border-slate-900 text-slate-50 mr-2' />
                        </form>
                        <form onSubmit={searchDataByNumber}>
                            <input name='number' className='border-2 border-slate-500 bg-slate-300 px-2' type="text" placeholder='Search By number' />
                            <input type="submit" value="Search" className='bg-slate-900 px-5 border-2 border-slate-900 text-slate-50' />
                        </form>
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
                                searchdata ? searchdata.map(d => <TableRow key={d._id} bill={d} refetch={refetch} />) : data.map(d => <TableRow key={d._id} bill={d} refetch={refetch} />)
                            }
                            {/* {
                            data.map(d => <TableRow key={d._id} bill={d} refetch={refetch} />)
                        } */}
                            {
                                addedRow && <TableRow bill={addedRow} />
                            }
                        </tbody>
                    </table>
                </div>
                {
                    [...Array(pageCount).keys()].map(num => <button key={num}
                        onClick={() => setPageNumber(num)}
                        className={pageNumber === num ? 'bg-blue-800 text-slate-100 px-4 py-2 m-1' : 'bg-slate-500 text-white px-4 py-2 m-1'}
                    >{num + 1}</button>)
                }

            </div>
        </div>
    );
};

export default BillingBody;