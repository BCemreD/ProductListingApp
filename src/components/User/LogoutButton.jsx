import React from 'react';
import { useAuthStore } from '../../store/useAuthStore'; 
import { useNavigate } from 'react-router-dom'; 

export default function LogoutButton() {
  const logout = useAuthStore(state => state.logout); 
  const navigate = useNavigate(); 

  const handleLogout = () => {
    logout(); 
    navigate('/'); 
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 rounded-md bg-red-500 text-white font-medium hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
    >
      Log out
    </button>
  );
}
