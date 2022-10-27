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
import Diemdanh from './phuc_component/Body/Class/Diemdanh';
import ChiTietDiemDanh from './phuc_component/Body/Class/ChiTietDiemDanh';
import ClassResult from './phuc_component/Body/Mark/ClassResult';
import ExerciseView from './phuc_component/Body/Mark/ExerciseView';
import AllStudentView from './phuc_component/Body/Mark/AllStudentView';
import MarkView from './phuc_component/Body/Mark/MarkView';
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
import ClassRank from './phuc_component/Body/Rank/ClassRank';
import Rank from './phuc_component/Body/Rank/Rank';
import RollUp from './component/Body/Class/rollUp';
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
                        <Route path='/' element={<OverView />}/>
                        <Route path='/class' element={<Classes />}/>
                        <Route path='/class/:id' element={<InClass />}/>
                        {/* <Route path='/class/:id/schedule' element={<Schedule />}/> */}
                        <Route path='/timeTable' element={<Timetable />}/>
                        <Route path='/news' element={<News />}/>
                        <Route path='/news/detailNew/:id' element={<DetailNew />}/>
                        <Route path='/doHomeWork/:id' element={<DoHomeWork />}/>
                        <Route path='/user' element={<User setImg={setClassImg} />}  />
                        <Route path='/rollup' element={<RollUp />}/>
                    </Routes>
                </>
                : login.mail !== null && login.name !== null && login.role === '1' ?
                <>
                <TeacherSideNav myActive={active} updateActive={upDateMyContainerActive} />
                <div  className={active ? 'my-container mainBodyActive' : 'my-container'}>
                <Routes>
                    <Route exact path='/' element={<TeacherMain />}/>
                    <Route path='/class' element={<TeacherClass />} />
                    <Route path='/class/:id' element={<Diemdanh />} />
                    <Route path='/class/diemDanhChiTiet/:id' element={<ChiTietDiemDanh />} />
                    <Route path='/btvn' element={<TeacherHomework />} />
                    <Route path='/btvn/btvn/:id' element={<TeacherHomeworkEdit />} />
                    <Route path='/timetable' element={<TeacherTimetable />} />
                    <Route path='/assignment' element={<TeacherAssignment />} />
                    <Route path='/assignment/assignment/:id' element={<TeacherAssignmentEdit />} />
                    <Route path='/document' element={<TeacherDocument />} />
                    <Route path='/document/document/:id' element={<TeacherDocumentEdit />} />
                    <Route path='/classMark' element={<ClassResult />} />
                    <Route path='/ExerciseView/:id/' element={<ExerciseView />} />
                    <Route path='/AllStudentView/:id/:classId' element={<AllStudentView />} />
                    <Route path='/markView/:id/:exerciseId/:classId' element={<MarkView />} />
                    <Route path='/rank' element={<ClassRank />} />
                    <Route path='/RankView/:id' element={<Rank />} />
                </Routes>
                </div>
            </>
                : 
                <>
                    <Admin_SideNav myActive={active} updateActive={upDateMyContainerActive}/>
                        <div  className={active ? 'my-container mainBodyActive' : 'my-container'}>
                            <Routes >
                            <Route path='/' element={<Admin_DashBoard />}/>
                            <Route path='/Users' element={<Admin_Users />}/>
                            <Route path='/AddUsers' element={<Admin_AddUser />}/>
                            <Route path='/Classes' element={<Admin_Classes />}/>
                            <Route path='/AddClass' element={<Admin_AddClass />}/>
                            <Route path='/News' element={<Admin_News />}/>
                            <Route path='/AddNew' element={<Admin_AddNew />}/>
                            <Route path='/EditNew/:id' element={<Admin_EditNew />}/>
                            <Route path='/ClassDetail/:id/:className' element={<Admin_ClassDetail />}/>
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
