import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './components/Login';
import Users from './pages/Users';
import Constants from './pages/Constants';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';
import Forbidden from './pages/Forbidden';
import FormPengajuan from './pages/FormPengajuan';
import AddConstant from './pages/AddConstant';
import Detail from './pages/Detail';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState(null);
  const [constants, setConstants] = useState([]);

  useEffect(() => {
    getConstants();
  }, []);

  const getConstants = async () => {
    try {
      const response = await axios.get("http://localhost:5000/constants");
      setConstants(response.data);
    } catch (error) {
      console.error("Error fetching constants:", error);
    }
  };

  const getValueByName = (name) => {
    const item = constants.find((obj) => obj.name === name);
    return item ? item.value : null;
  };

  const getUUIDByName = (name) => {
    const item = constants.find((obj) => obj.name === name);
    return item ? item.uuid : null;
  };

  const updateYear = async (lastChecked, year, uuid) => {
    try {
      await axios.patch(`http://localhost:5000/constants/${uuid}`, {
        name: lastChecked,
        value : year
      })
    } catch (error) {
      if (error.response) {
        console.error('Failed to update database:', error.response.data.msg);
      }
      
    }
  }

  useEffect(() => {
    const checkForNewYear = () => {
        const now = new Date();
        const year = now.getFullYear();
        const firstOfJanuary = new Date(year, 0, 1);
        const lastChecked = getValueByName("lastChecked");
        const uuid = getUUIDByName("lastChecked");

        if (year !== parseInt(lastChecked, 10)) {
          updateYear(lastChecked, year, uuid);
        }
    };

    checkForNewYear();

    const interval = setInterval(checkForNewYear, 24 * 60 * 60 * 1000); // Cek setiap 24 jam

    return () => clearInterval(interval);
  }, []); 

  return (
    <div className=''>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/constants" element={<Constants />} />
          <Route path="/constants/add" element={<AddConstant />} />
          <Route path="/form" element={<FormPengajuan setFormData={setFormData}/>} />
          <Route
            path="/tampilkan-data-cuti"
            element={<Detail formData={formData} />}
          />

          <Route path="/forbiden" element={<Forbidden />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
