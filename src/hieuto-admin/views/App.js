
import './App.css';
import SideNav from '../includes/SideNav/SideNav';
import React, { useState } from 'react';
import{Route, Routes} from'react-router-dom';
import AddClass from './Body/Classes/AddClass';
import Classes from './Body/Classes/Classes';
import ClassDetail from './Body/Classes/ClassDetail';
import DashBoard from './Body/DashBoard/DashBoard';
import AddNew from './Body/News/AddNew';
import EditNew from './Body/News/EditNew';
import News from './Body/News/News';
import AddUser from './Body/Users/AddUser';
import Users from './Body/Users/Users';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [active, setActive] = useState(false);

  let upDateMyContainerActive = (my_active) =>{
    setActive(my_active);
  }

  return (
    <>
      <SideNav myActive={active} updateActive={upDateMyContainerActive}/>
      <div  className={active ? 'my-container mainBodyActive' : 'my-container'}>
        <Routes >
          <Route path='/' element={<DashBoard myActive={active}/>}/>
          <Route path='/Users' element={<Users myActive={active}/>}/>
          <Route path='/AddUsers' element={<AddUser myActive={active}/>}/>
          <Route path='/Classes' element={<Classes myActive={active}/>}/>
          <Route path='/AddClass' element={<AddClass myActive={active}/>}/>
          <Route path='/News' element={<News myActive={active}/>}/>
          <Route path='/AddNew' element={<AddNew myActive={active}/>}/>
          <Route path='/EditNew/:id' element={<EditNew myActive={active}/>}/>
          <Route path='/ClassDetail/:id/:className' element={<ClassDetail myActive={active}/>}/>
        </Routes>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
    </>
  );
}

export default App;
