import './App.css';
import { Routes,Route } from 'react-router-dom';
import Header from './component/Header/Header';
import Main from './component/Body/Main';
import Class from './component/Body/Class/Class';
import Timetable from './component/Body/Timetable/Timetable';
import Homework from './component/Body/Homework/Homework';
import Assignment from './component/Body/Assignment/Assignment';
import Document from './component/Body/Document/Document';
import Diemdanh from './component/Body/Diemdanh/Diemdanh';
import DocumentEdit from './component/Body/Document/DocumentEdit';
import AssignmentEdit from './component/Body/Assignment/AssignmentEdit';
import HomeworkEdit from './component/Body/Homework/HomeworkEdit';
function App() {
    return (
        <>
            <Header/>
            <Routes>
                <Route exact path='/' element={<Main />}/>
                <Route path='/class' element={<Class />} />
                <Route path='/btvn' element={<Homework />} />
                <Route path='/btvn/btvn/:id' element={<HomeworkEdit />} />
                <Route path='/timetable' element={<Timetable />} />
                <Route path='/assignment' element={<Assignment />} />
                <Route path='/assignment/assignment/:id' element={<AssignmentEdit />} />
                <Route path='/document' element={<Document />} />
                <Route path='/document/document/:id' element={<DocumentEdit />} />
                <Route path='/diem_danh' element={<Diemdanh />} />
            </Routes>
        </>
    );
};

export default App;