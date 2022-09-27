import './App.css';
import { Routes,Route } from 'react-router-dom';
import Header from './component/Header/Header';
import OverView from './component/Body/OverView/OverView';
import Classes from './component/Body/Class/Class';
import TimeTable from './component/Body/TimeTable/TimeTable';
import News from './component/Body/News/News';
function App() {
    return (
        <>
            <Header/>
            <Routes>
                <Route exact path='/' element={<OverView />}/>
                <Route path='/class' element={<Classes />}/>
                <Route path='/timeTable' element={<TimeTable />}/>
                <Route path='/news' element={<News />}/>
            </Routes>
        </>
    );
}

export default App;