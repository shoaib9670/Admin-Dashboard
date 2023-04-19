import { useState, useEffect, Suspense } from 'react'
import { getVendor, deleteVendor } from '../Services/vendorDashServices';
import './Stores.css'
import { useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import { BiEdit } from 'react-icons/bi'
import { GrView } from 'react-icons/gr'


const Stores = () => {
    const navigate = useNavigate();
    const [storelist, setStorelist] = useState<any>([]);

    useEffect(() => {
        getVendor().then((res) => {
            console.log(res);
            setStorelist(res);
        })
    }, [])

    const goToVendorPage = (data: any, page: string) => {
        if (page == 'View') {
            navigate('/vendor', { state: data });
        } else if (page == 'Edit') {
            navigate('/edit', { state: data });
        } else if (page == 'Delete') {
            deleteVendor(data.uniqueId)
        }
    }

    return (
        <>
            <div className='main-header'>
                <h1>All Stores</h1>
            </div>
            <Suspense fallback={<div> Please Wait... </div>} >
                <div className="item-list">
                    <table>
                        <thead>
                            <tr>
                                <th>Serial Number</th>
                                <th>Item Name</th>
                                <th>Item ID</th>
                                <th>Phone No.</th>
                                <th>userId</th>
                                <th>Opreations</th>

                            </tr>
                        </thead>
                        <tbody>
                            {storelist?.map((item: any, index: any) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item?.storeName}</td>
                                    <td>{item?.uniqueId}</td>
                                    <td>{item?.phoneNo}</td>
                                    <td>{item?.userId}</td>
                                    <td>
                                        <MdDelete className='icons' onClick={() => goToVendorPage(item, 'Delete')} />
                                        <BiEdit className='icons' onClick={() => goToVendorPage(item, 'Edit')} />
                                        <GrView className='icons' onClick={() => goToVendorPage(item, 'View')} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Suspense>
        </>
    )
}

export default Stores
