import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className='px-5 lg:px-12 py-2 bg-slate-300'>
            <div className='flex flex-row justify-between items-center'>

                {/* logo here */}
                <div className='text-2xl font-semibold'>
                    <Link to='/' >Power-Hack</Link>
                </div>

                <div>
                    <p>Paid Total: 0</p>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;