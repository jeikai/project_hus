import './Main.css'
import { Link } from 'react-router-dom';
import { useState } from 'react';
function Main() {
    const [login, setLogin] = useState({
        mail: localStorage.getItem('email'),
        name: localStorage.getItem('name'),
        id: localStorage.getItem('teacherId')
    })
    return (
        <section>
        <div className='menu'>                             
                    <Link className = 'menuItem_teacher active' to={'/class'}>                        
                        <div><i className='bx bxs-customize'></i></div>
                        <span>Lớp học của bạn</span>
                    </Link>
                    <Link className = 'menuItem_teacher active' to={'/btvn'}>                        
                        <div><i className='bx bx-receipt'></i></div>
                        <span>Up bài tập về nhà</span>
                    </Link>
                    <Link className = 'menuItem_teacher active' to={'/document'}>                        
                        <div><i className='bx bxs-book-open' ></i></div>
                        <span>Up tài liệu học</span>
                    </Link>
                    <Link className = 'menuItem_teacher active' to={'/assignment'}>                        
                        <div><i className='bx bxs-pencil' ></i></div>
                        <span>Kế hoạch học tập</span>
                    </Link>
                    <Link className = 'menuItem_teacher active' to={'/timetable'}>                        
                        <div><i className='bx bx-table'></i></div>
                        <span>Thời khoá biểu của bạn</span>
                    </Link>         
        </div>
        <div className='body_main'>
            <h2 className='welcome neonText'>WELCOME ¯⁠\⁠_⁠ʘ⁠‿⁠ʘ⁠_⁠/⁠¯</h2>
        </div>
        </section>
    )
}

export default Main;