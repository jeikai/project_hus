import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'
function Header(props) {

    const [selected, setSelected] = useState(0);
    const [id, setId] = useState(localStorage.getItem('studentId'));
    const navigte = useNavigate()
    const headerData = [
        {
            link:'/',
            headerName: 'Over View',
        },
        {
            link: '/class',
            headerName: 'Class',
        },
        {
            link: '/TimeTable',
            headerName: 'Time Table',
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
    return(
        <header>
                    <div className='nav'>
                        <div className='logo'>
                            <img src='https://rabiloo.com/images/logo-menu-white.svg' alt=''/>
                        </div>

                        <div className='navbar'>
                            {headerData.map((item, index) => {
                                return(
                                    <div key={index} 
                                        
                                         onClick={() => setSelected(index)}
                                    >
                                        <Link style={{ textDecoration: 'none' }} className = {selected === index ? 'headerActive' : ''} to={item.link}>{item.headerName}</Link>
                                    </div>
                                )
                            })}
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