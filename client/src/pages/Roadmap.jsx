import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';


const Roadmap = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const[roadmap,setRoadmap]=useState([]);
  const[loading,setLoading]=useState(true);

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const response = await API.get(`/api/roadmap/${id}`);
        setRoadmap(response.data.roadmap);
      } catch (err) {
        console.log("Failed to fetch that particular roadmap",err);
      }
      setLoading(false);
    }
    fetchRoadmap();
  },[])

  if(loading){
    return <div>Loading...</div>
  }

  return (
    <div>
      <div>
        <button onClick={()=>{
          navigate('/dashboard');
        }}>Back</button>
        <div>
          <div>{roadmap.skill}</div>
          <div>{roadmap.personalityType}</div>
        </div>
      </div>
      <div>
        {roadmap.roadmap}
      </div>
    </div>
  )
}

export default Roadmap
