import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const TableRow = ({ bill, refetch }) => {
    const { _id, name, email, phone, amount } = bill;
    const confirmDelete = () => {
        fetch(`http://localhost:5000/delete-billing/${_id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount) {
                    toast.warning("Bill deleted")
                    refetch();
                } else {
                    toast("Data are not deleted")
                }
            })
    }
    return (
        <tr className='border-spacing-0.5 bg-transparent'>
            <th className='text-left bg-transparent border border-slate-900 px-2 py-1'>{_id || "Generating Id"}</th>
            <td className='text-left bg-transparent border border-slate-900 px-2 py-1'>{name}</td>
            <td className='text-left bg-transparent border border-slate-900 px-2 py-1'>{email}</td>
            <td className='text-left bg-transparent border border-slate-900 px-2 py-1'>{phone}</td>
            <td className='text-left bg-transparent border border-slate-900 px-2 py-1'>{amount}</td>
            <td className='text-left bg-transparent border border-slate-900 px-2 py-1'>
                <div>
                    <Link className='btn btn-primary mr-3' to={`/update/${_id}`}>Edit</Link>
                    {/* <Link className='btn btn-warning' to={`/delete/${_id}`}>Delete</Link> */}
                    <button onClick={confirmDelete} className='btn btn-warning'>Delete</button>
                </div>
            </td>
        </tr >
    );
};

export default TableRow;