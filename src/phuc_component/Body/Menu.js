import './Menu.css';
import { Link } from 'react-router-dom';
function Menu() {
    return (
        <div className='menu'>                               
                    <Link className = 'menuItem_teacher active' to={'/class'}>                        
                        <div><i class='bx bxs-customize'></i></div>
                        <span>Lớp học của bạn</span>
                    </Link>
                    <Link className = 'menuItem_teacher active' to={'/btvn'}>                        
                        <div><i class='bx bx-receipt'></i></div>
                        <span>Up bài tập về nhà</span>
                    </Link>
                    <Link className = 'menuItem_teacher active' to={'/document'}>                        
                        <div><i class='bx bxs-book-open' ></i></div>
                        <span>Up tài liệu học</span>
                    </Link>
                    <Link className = 'menuItem_teacher active' to={'/assignment'}>                        
                        <div><i class='bx bxs-pencil' ></i></div>
                        <span>Kế hoạch học tập</span>
                    </Link>
                    <Link className = 'menuItem_teacher active' to={'/timetable'}>                        
                        <div><i class='bx bx-table'></i></div>
                        <span>Thời khoá biểu của bạn</span>
                    </Link>                   
        </div>
    )
}
export default Menu;