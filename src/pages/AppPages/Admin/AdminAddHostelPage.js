import React from 'react';
import './AdminAddHostelPage.css'
import { Add, ArrowLeft } from 'iconsax-react';
import user5 from '../../../assets/user5.png'
function AdminAddHostelPage() {
    return (
        <div className='admin-add-hostel-page-container'>
            <div className='admin-add-hostel-div'>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <ArrowLeft style={{marginRight: 15}} />
                <h2>Back</h2>
                </div>
                <div className='admin-add-hostel-container-field'>
                    <h2>Add Images</h2>
                    <form className='admin-add-hostel-form'>
                        <div className='admin-add-images'>
                            <label>
                                <Add color='#1E523E' size={40}/>
                                <input type='file' />
                            </label>
                            <label>
                                <Add color='#1E523E' size={40}/>
                                <input type='file' />
                            </label>
                            <label>
                                <Add color='#1E523E' size={40}/>
                                <input type='file' />
                            </label>
                            <label>
                                <Add color='#1E523E' size={40}/>
                                <input type='file' />
                            </label>
                            <label>
                                <Add color='#1E523E' size={40}/>
                                <input type='file' />
                            </label>
                            <label>
                                <Add color='#1E523E' size={40}/>
                                <input type='file' />
                            </label>
                            <label>
                                <Add color='#1E523E' size={40}/>
                                <input type='file' />
                            </label>
                            <label>
                                <Add color='#1E523E' size={40}/>
                                <input type='file' />
                            </label>
                        </div>
                        <div className='admin-number-of-items'>
                            <div className='admin-number-container'>
                                <label>Number of rooms</label>
                                <input type='text' placeholder='5' />
                                <p>Rooms</p>
                            </div>
                            <div className='admin-number-container'>
                                <label>Number of bathrooms</label>
                                <input type='text' placeholder='5' />
                                <p>Bathrooms</p>
                            </div>
                            <div className='admin-number-container'>
                                <label>Name of hostel</label>
                                <input type='text' placeholder='Hostel B' />
                            </div>
                            <div className='admin-number-container'>
                                <label>Hostel type</label>
                                <input type='text' placeholder='Boy hostel' />
                            </div>
                            <div className='admin-number-container'>
                                <label>Price of hostel</label>
                                <input type='text' placeholder='N 360,000' />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AdminAddHostelPage;
