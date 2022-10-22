import './App.css';
import { Routes,Route } from 'react-router-dom';
import Header from './component/Header/Header';
import OverView from './component/Body/OverView/OverView';
import Timetable from './component/Body/TimeTable/Timetable';
import News from './component/Body/News/News';
import DetailNew from './component/Body/News/DetailNew';
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
import User from './component/userdetail/User';
//import from teacher
import TeacherSideNav from './phuc_component/SideNav/SideNav';
import TeacherMain from './phuc_component/Body/Main';
import TeacherClass from './phuc_component/Body/Class/Class';
import TeacherTimetable from './phuc_component/Body/Timetable/Timetable';
import TeacherHomework from './phuc_component/Body/Homework/Homework';
import TeacherAssignment from './phuc_component/Body/Assignment/Assignment';
import TeacherDocument from './phuc_component/Body/Document/Document';
import TeacherDocumentEdit from './phuc_component/Body/Document/DocumentEdit';
import TeacherAssignmentEdit from './phuc_component/Body/Assignment/AssignmentEdit';
import TeacherHomeworkEdit from './phuc_component/Body/Homework/HomeworkEdit';
// import Schedule from './component/Body/Class/classComponent/schedule'
function App() {

    const [img, setImg] = useState(false);

    let setClassImg = (passive)=>{
        setImg(passive);
    }

    //This is props for login
    const [login, setLogin] = useState({
        mail: localStorage.getItem('email'),
        name: localStorage.getItem('name'),
        role: localStorage.getItem('role'),
        image: localStorage.getItem('img'),
    })

    //This is props and states of hieu-to-admin
    const [active, setActive] = useState(false);

    let upDateMyContainerActive = (my_active) =>{
        setActive(my_active);
    }
    return (
        <>  
            {login.mail === null && login.name === null ?
            <Routes>
                <Route exact path='/' element={<Login />}/>
                <Route exact path='/TeacherLogin' element={<TeacherLogin />}/>
            </Routes> 
              
              : login.mail !== null && login.name !== null && login.role === '0' ? 
                <>
                <Header setImg={setImg} imgPassive={img}/>
                    <Routes>
                        <Route exact path='/' element={<OverView />}/>
                        <Route path='/class' element={<Classes />}/>
                        <Route path='/class/:id' element={<InClass />}/>
                        {/* <Route path='/class/:id/schedule' element={<Schedule />}/> */}
                        <Route path='/timeTable' element={<Timetable />}/>
                        <Route path='/news' element={<News />}/>
                        <Route path='/News/DetailNew/:id' element={<DetailNew />}/>
                        <Route path='/doHomeWork/:id' element={<DoHomeWork />}/>
                        <Route path='/user' element={<User setImg={setClassImg} />}  />
                    </Routes>
                </>
                : login.mail !== null && login.name !== null && login.role === '1' ?
                <>
                <TeacherSideNav myActive={active} updateActive={upDateMyContainerActive} />
                <div  className={active ? 'my-container mainBodyActive' : 'my-container'}>
                <Routes>
                    <Route exact path='/' element={<TeacherMain myActive={active}/>}/>
                    <Route path='/class' element={<TeacherClass myActive={active}/>} />
                    <Route path='/btvn' element={<TeacherHomework myActive={active}/>} />
                    <Route path='/btvn/btvn/:id' element={<TeacherHomeworkEdit myActive={active}/>} />
                    <Route path='/timetable' element={<TeacherTimetable myActive={active}/>} />
                    <Route path='/assignment' element={<TeacherAssignment myActive={active}/>} />
                    <Route path='/assignment/assignment/:id' element={<TeacherAssignmentEdit myActive={active}/>} />
                    <Route path='/document' element={<TeacherDocument myActive={active}/>} />
                    <Route path='/document/document/:id' element={<TeacherDocumentEdit myActive={active}/>} />
                </Routes>
                </div>
            </>
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
