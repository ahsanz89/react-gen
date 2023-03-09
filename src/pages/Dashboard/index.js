import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAuthToken } from '../../app/features/auth/authSlice';

export default function Dashboard() {
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  const doLogout = () => { 
    dispatch(setAuthToken(false));
    navigate("/login");
};
  return (
    <div>this is Dashboard  
      <button onClick={doLogout}>Logout</button>
    </div>
  )
}
