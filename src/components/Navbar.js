import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';

const Navbar = () => {
    const { data, isLoading } = useQuery('bills', () =>
        fetch(`http://localhost:5000/billing-list`)
            .then(res => res.json())
    )

    if (isLoading) {
        return 'Loading'
    }
    const myFunc = (total, number) => {
        return Number(total) + Number(number);
    }
    const amounts = data.map(d => d.amount)
    const totalAmounts = amounts.reduce(myFunc)

    return (
        <nav className='px-5 lg:px-12 py-2 bg-slate-300'>
            <div className='flex flex-row justify-between items-center'>

                {/* logo here */}
                <div className='text-2xl font-semibold'>
                    <Link to='/' >Power-Hack</Link>
                </div>

                <div>
                    <p className='font-semibold'>Paid Total: {totalAmounts}</p>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;