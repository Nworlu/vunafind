import React from 'react';
import './StudentGetRoom.css'
import PrimaryButton from '../../../components/PrimaryButton';
function StudentGetRoom() {
    return (
        <div className='student-get-room-page'>
            <form className='student-get-room-form'>
                <div className='getroomInput'>
                    <label>Matric No</label>
                    <input/>
                </div>
                <div className='getroomInput'>
                    <label></label>
                    <input/>
                </div>
                <div className='getroomInput'>
                    <label></label>
                    <input/>
                </div>
                <div className='getroomInput'>
                    <label></label>
                    <input/>
                </div>
                <div style={{display:'block'}}>
                <PrimaryButton style={{margin:0}}>
                    Submit
                </PrimaryButton>
                </div>
            </form>
        </div>
    );
}

export default StudentGetRoom;
