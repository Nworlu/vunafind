import React from 'react';
import './AdminManageHostel.css'
import { ArrowRight } from 'iconsax-react';

function AdminManageHostel() {
    return (
        <div className='admin-manage-hostel-page-container'>
            <div className='admin-manage-detail-div'>
                <h2>Manage My Hostel (Hostel D)</h2>
                <div className='admin-manage-container'>
                    <div className='admin-manage-div'>
                        <p>Number of students</p>
                        <div className='admin-detail-stud'>
                            <div className='admin-stude-inner'>
                                <h4>56</h4>
                                <p>students</p>
                            </div>
                            <ArrowRight className='icon'/>
                        </div>
                    </div>
                    <div className='admin-manage-div'>
                        <p>Number of rooms</p>
                        <div className='admin-detail-stud'>
                            <div className='admin-stude-inner'>
                                <h4>5</h4>
                                <p>rooms</p>
                            </div>
                        </div>
                    </div>
                    <div className='admin-manage-div'>
                        <p>Number of bathrooms</p>
                        <div className='admin-detail-stud'>
                            <div className='admin-stude-inner'>
                                <h4>5</h4>
                                <p>bathrooms</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='admin-manage-detail-div'>
                <h2>Manage Other hostels</h2>
                <div className='admin-manage-container'>
                    <div className='admin-manage-div'>
                        <p>Number of hostels</p>
                        <div className='admin-detail-stud'>
                            <div className='admin-stude-inner'>
                                <h4>20</h4>
                                <p>hostels</p>
                            </div>
                            <ArrowRight className='icon'/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminManageHostel;
