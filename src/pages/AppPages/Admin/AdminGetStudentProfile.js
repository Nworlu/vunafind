import React from 'react';
import './AdminGetStudentProfile.css'
import { ArrowLeft } from 'iconsax-react';
import user5 from '../../../assets/user5.png'
function AdminGetStudentProfile() {
    return (
        <div className='admin-manage-student-page-container'>
            <div className='admin-manage-student-detail-div'>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <ArrowLeft style={{marginRight: 15}} />
                <h2>Back to manage students</h2>
                </div>
                <div className='admin-get-profile-student-container'>
                    <div className='admin-get-profile-student-pic'>
                        <div className='admin-get-student-img-container'>
                            <img src={user5}/>
                        </div>
                        <button>Delete Student</button>
                    </div>
                    <div className='admin-get-student-detail-form'>
                        <div className='admin-name-get-container'>
                        <div className='admin-student-little-detail'>
                            <h4>Name</h4>
                            <p>Akintade Oluwaseun Timothy</p>
                        </div>
                        <div className='admin-student-little-detail'>
                            <h4>Hobbies</h4>
                            <p>Basketball, Reading, Poetry</p>
                        </div>
                        </div>

                        <div className='admin-student-matric'>
                        <div className='admin-student-little-detail'>
                            <h4>Matric no.</h4>
                            <p>Vug/csc/19/3347</p>
                        </div>
                        <div className='admin-student-little-detail'>
                            <h4>Phonenumber</h4>
                            <p>08163421203</p>
                        </div>
                        <div className='admin-student-little-detail'>
                            <h4>Level</h4>
                            <p>400lvl</p>
                        </div>
                        <div className='admin-student-little-detail'>
                            <h4>Department</h4>
                            <p>Computer Science</p>
                        </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminGetStudentProfile;
