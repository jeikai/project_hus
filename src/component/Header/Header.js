import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation , useNavigate, NavLink } from 'react-router-dom';
import './Header.css'
function Header(props) {

    const [selected, setSelected] = useState(0);
    const [id, setId] = useState(localStorage.getItem('studentId'));
    const navigte = useNavigate()
    const headerData = [
        {
            link:'/',
            headerName: 'OverView',
        },
        {
            link: '/class',
            headerName: 'Class',
        },
        {
            link: '/TimeTable',
            headerName: 'TimeTable',
        },
        {
            link: '/News',
            headerName: 'News',
        }
    ]
    const getStudent = async ()  =>{
        let result = await axios.get(`http://localhost:8000/database/data/handleUpdateStudent.php/${id}`);
        setImg(result.data.studentImage)
    }
    
    const[img, setImg] = useState(localStorage.getItem('img'))
    if(props.imgPassive === true){
        getStudent();
        props.setImg(false);
    }
    useEffect(() => {
        // setImg(localStorage.getItem('img'))
        getStudent();
        console.log(img);
    }, [])



    const Logout = () => {
        localStorage.clear();
        window.location.replace("http://localhost:3000/");
    }
    const pathname = useLocation().pathname.split('/');
    return(
        <header style={{ boxShadow: "0 0.3rem 1rem rgba(60,180,231,1)"}}>
                    <div className='nav'>
                        <div className='logo'>
                            <img src='https://rabiloo.com/images/logo-menu-white.svg' alt=''/>
                        </div>

                        <div className='navbar'>
                            <NavLink style={{ textDecoration: 'none' }} to={'/'} end>Over View</NavLink>
                            <NavLink style={{ textDecoration: 'none' }} className={`${pathname[1] === 'class' ? 'headerActive' : ''}`} to={'/class'} end>Class</NavLink>
                            <NavLink style={{ textDecoration: 'none' }} to={'/TimeTable'} end>Time Table</NavLink>
                            <NavLink style={{ textDecoration: 'none' }} to={'/News'} end>News</NavLink>

                        </div>

                        <div className='userControl'>
                            <div className='notification'>
                                <i className='bx bxs-bell-ring'></i>
                                <span>1</span>
                            </div>
                            <div className='user'>
                                <button>
                                    <img onClick={() => navigte('/user')} src={img === undefined || img === "" 
												? "/assets/studentImgs/defaultStudentImg.jpg": "/assets/studentImgs/"  + img}/>
                                </button>
                                <div><i onClick={Logout} className='bx bx-log-out'></i></div>
                            </div>
                        </div>

                    </div>
        </header>
    )
}

export default Header;