import React, {useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './components/Login';
import Users from './pages/Users';
import Constants from './pages/Constants';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';
import Forbidden from './pages/Forbidden';
import FormPengajuan from './pages/FormPengajuan';
import DetailPengajuanCuti from './components/DetailPengajuanCuti';
import AddConstant from './pages/AddConstant';
import Detail from './pages/Detail';

function App() {
  const [formData, setFormData] = useState(null);

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
