import './App.css';
import { Routes,Route } from 'react-router-dom';
import Header from './component/Header/Header';
import OverView from './component/Body/OverView/OverView';
import Timetable from './component/Body/TimeTable/Timetable';
import News from './component/Body/News/News';
import Classes from './component/Body/Class/Class';
import InClass from './component/Body/Class/InClass';
import Schedule from './component/Body/Class/classComponent/schedule';
import NewsFeed from './component/Body/Class/classComponent/newfeed';
import Test from './component/Body/Class/temp';
import Login from './login/Login';
import TeacherLogin from './login/TeacherLogin';
import { useState } from 'react';
import DoHomeWork from './component/Body/Class/classComponent/doHomeWork';


// Import from admin
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Admin_SideNav from './hieuto-admin/includes/SideNav/SideNav';
import Admin_AddClass from './hieuto-admin/views/Body/Classes/AddClass';
import Admin_Classes from './hieuto-admin/views/Body/Classes/Classes';
import Admin_ClassDetail from './hieuto-admin/views/Body/Classes/ClassDetail';
import Admin_DashBoard from './hieuto-admin/views/Body/DashBoard/DashBoard';
import Admin_AddNew from './hieuto-admin/views/Body/News/AddNew';
import Admin_EditNew from './hieuto-admin/views/Body/News/EditNew';
import Admin_News from './hieuto-admin/views/Body/News/News';
import Admin_AddUser from './hieuto-admin/views/Body/Users/AddUser';
import Admin_Users from './hieuto-admin/views/Body/Users/Users';

// import Schedule from './component/Body/Class/classComponent/schedule'
function App() {
    const [login, setLogin] = useState({
        mail: localStorage.getItem('email'),
        name: localStorage.getItem('name'),
        role: localStorage.getItem('role')

    })

    //This is props and states of hieu-to-admin
    const [active, setActive] = useState(false);

    let upDateMyContainerActive = (my_active) =>{
        setActive(my_active);
    }
    console.log(login);
    return (
        <>  
            {login.mail === null && login.name === null ?
            <Routes>
                <Route exact path='/' element={<Login />}/>
                <Route exact path='/TeacherLogin' element={<TeacherLogin />}/>
            </Routes> 
              
              : login.mail !== null && login.name !== null && login.role === '0' ? 
                <>
                <Header/>
                    <Routes>
                        <Route exact path='/' element={<OverView />}/>
                        <Route path='/class' element={<Classes />}/>
                        <Route path='/class/:id' element={<InClass />}/>
                        {/* <Route path='/class/:id/schedule' element={<Schedule />}/> */}
                        <Route path='/timeTable' element={<Timetable />}/>
                        <Route path='/news' element={<News />}/>
                        <Route path='/doHomeWork/:id' element={<DoHomeWork />}/>
                    </Routes>
                </>
                : login.mail !== null && login.name !== null && login.role === '1' ?
                     "Cai cua phuc de day"
                : 
                <>
                    <Admin_SideNav myActive={active} updateActive={upDateMyContainerActive}/>
                        <div  className={active ? 'my-container mainBodyActive' : 'my-container'}>
                            <Routes >
                            <Route path='/' element={<Admin_DashBoard myActive={active}/>}/>
                            <Route path='/Users' element={<Admin_Users myActive={active}/>}/>
                            <Route path='/AddUsers' element={<Admin_AddUser myActive={active}/>}/>
                            <Route path='/Classes' element={<Admin_Classes myActive={active}/>}/>
                            <Route path='/AddClass' element={<Admin_AddClass myActive={active}/>}/>
                            <Route path='/News' element={<Admin_News myActive={active}/>}/>
                            <Route path='/AddNew' element={<Admin_AddNew myActive={active}/>}/>
                            <Route path='/EditNew/:id' element={<Admin_EditNew myActive={active}/>}/>
                            <Route path='/ClassDetail/:id/:className' element={<Admin_ClassDetail myActive={active}/>}/>
                            </Routes>
                        </div>
                </>
            }
            

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
