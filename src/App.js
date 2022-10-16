import './App.css';
import { Routes,Route } from 'react-router-dom';
import Header from './component/Header/Header';
import OverView from './component/Body/OverView/OverView';
import TimeTable from './component/Body/TimeTable/TimeTable';
import News from './component/Body/News/News';
import Classes from './component/Body/Class/Class';
import InClass from './component/Body/Class/InClass';
import Schedule from './component/Body/Class/classComponent/schedule';
import NewsFeed from './component/Body/Class/classComponent/newfeed';
import Test from './component/Body/Class/temp';
import Login from './login/Login';
import { useState } from 'react';

// import Schedule from './component/Body/Class/classComponent/schedule'
function App() {
    const [login, setLogin] = useState({
        mail: localStorage.getItem('email'),
        name: localStorage.getItem('name'),
        role: localStorage.getItem('role')

    })
    console.log(login);
    return (
        // <Login />
        <>  
            {/* <Login/> */}
            {login.mail === null && login.name === null ?  <Login /> : login.role === '0' ? 
                <>
                <Header/>
                    <Routes>
                        <Route exact path='/' element={<OverView />}/>
                        <Route path='/class' element={<Classes />}/>
                        <Route path='/class/:id' element={<InClass />}/>
                        {/* <Route path='/class/:id/schedule' element={<Schedule />}/> */}
                        <Route path='/timeTable' element={<TimeTable />}/>
                        <Route path='/news' element={<News />}/>
                    </Routes>
                </>
                : 'hhaaa'
            }
            

        </>
    );
}

export default App;
