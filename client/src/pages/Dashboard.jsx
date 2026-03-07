import React, { useState, useEffect } from 'react'
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const Dashboard = () => {

  const navigate = useNavigate();
  const { user, logout, loading } = useAuth();
  const [username, setUsername] = useState('');
  const [personalitytype, setPersonalitytype] = useState('');
  const [email, setEmail] = useState('');
  const [roadmaps, setRoadmaps] = useState([]);

  // useEffect(() => {
  //   try {
  //     if (!loading) {
  //       setUsername(user.username);
  //       setEmail(user.email);
  //       setPersonalitytype(user.personalityType);
  //     }
  //   } catch (err) {
  //     console.log("Failed in retrieving info", err);
  //   }
  // }, [])

  useEffect(() => {
    const fetchRoadmaps = async() => {
      try {
        const response =await API.get('api/roadmap/view');
        setRoadmaps(response.data.roadmap);
      } catch (err) {
        console.log("Failed to fetch roadmaps", err);
      }
    }
    fetchRoadmaps();
  }, [])

  const logOut = () => {
    logout();
    navigate('/login');
  }

  const handleDelete = async (id) => {
    try {
      await API.delete(`/api/roadmap/${id}`);
      // Remove deleted roadmap from state
      setRoadmaps(prev => prev.filter(r => r._id !== id));
    } catch (err) {
      console.log("Failed to delete roadmap", err);
    }
  }

  return (
    <div>
      <div onClick={() => {
        logOut();
      }}>Logout</div>
      <div>
        <div>Hii {user.username}</div>
        <div>Personality type {user.personalityType}</div>
        <div>Email {user.email}</div>
      </div>
      <div>
        {roadmaps.map((roadmap) => {
          return <div key={roadmap._id}>
            <div>{roadmap.skill}</div>
            <div>{roadmap.personalityType}</div>
            <button onClick={() => navigate(`/roadmap/${roadmap._id}`)}>View</button>
            <button onClick={() => handleDelete(roadmap._id)}>Delete</button>
          </div>
        })}
      </div>
      <div>
        <button onClick={() => { navigate('/quiz') }}>Take quiz again</button>
        <button onClick={() => { navigate('/generate') }}>New roadmap</button>
      </div>
    </div>
  )
}

export default Dashboard
