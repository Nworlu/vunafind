import React, { useContext, useEffect, useState } from 'react';
import FlatButton from '../../../components/FlatButton';
import PrimaryButton from '../../../components/PrimaryButton';
import './StudentDashboardPage.css';
import hostelPic from '../../../assets/hostel.png';
import { AddCircle } from 'iconsax-react';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';

const apiUrl = 'https://vunafind.onrender.com';

function StudentDashboardPage() {
  const authCtx = useContext(AuthContext);
  const [isHostel, setIsHostel] = useState([
    {
      id: 1,
      hostel: 'Old hostel',
      gender: 'Male',
      type: 'old',
      selected: true,
    },
    {
      id: 2,
      hostel: 'New hostel',
      gender: 'Female',
      type: 'new',
      selected: false,
    },
  ]);
  const [hostel, setHostel] = useState([]);

  useEffect(() => {
    async function getHostels() {
      try {
        const response = await axios.get(`${apiUrl}/api/v1/hostel/hostels`, {
          headers: {
            Authorization: `Bearer ${authCtx.userToken}`,
            'Content-Type': 'application/json',
          },
        });
        setHostel(response.data.hostels);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
    getHostels();
  }, []);

  function selectHostel(hostelId) {
    const updatedButtons = isHostel.map((data) => {
      if (data.id === hostelId) {
        return { ...data, selected: true };
      } else {
        return { ...data, selected: false };
      }
    });
    setIsHostel(updatedButtons);
    console.log(updatedButtons);
  }

  function getFilteredHostels() {
    const selectedHostel = isHostel.find((data) => data.selected);
    return hostel.filter(
      (h) =>
        h.category === selectedHostel.gender

    );
  }

  return (
    <div className="student-dashboard-container">
      <div className="student-dashboard-manage-hostel">
        <h2>Hostels</h2>
        <div className="student-dashboard-manage-buttons">
          {isHostel.map((data) => (
            <div>
            <button
              key={data.id}
              type="button"
              style={{
                marginRight: 20,
                width: 150,
                height: 40,
                border: '2px solid rgba(30, 82, 62, 1)',
              }}
              onClick={() => selectHostel(data.id)}
              className={data.selected ? 'active' : 'inactive'}
            >
              {data.gender}
            </button>
              </div>
          ))}
        </div>
      </div>
      <div className="student-dashboard-hostel-container">
        {getFilteredHostels().map((hostel) => (
          <div className="student-dashboard-hostel-div" key={hostel.id}>
            <div className="student-dashboard-hostel-img-container">
              <img src={hostel?.images[0]} alt="hostel-pic" />
              <div className="student-dashboard-available">
                <p></p>
                <span>{hostel.status}</span>
              </div>
            </div>
            <div className="student-dashboard-short-des">
              <span>{hostel.name}</span>
              <p>N {hostel.price}</p>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          position: 'fixed',
          bottom: '4%',
          right: '4%',
          width: '80px',
          height: '80px',
        }}
      >
      </div>
    </div>
  );
}

export default StudentDashboardPage;
