import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css'
function Header() {
    const [selected, setSelected] = useState(0);
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
                                        <Link className = {selected === index ? 'headerActive' : ''} to={item.link}>{item.headerName}</Link>
                                    </div>
                                )
                            })}
                        </div>

                        <div className='userControl'>
                            <div className='notification'>
                                <i class='bx bxs-bell-ring'></i>
                                <span>1</span>
                            </div>
                            <div className='user'>
                                <button>
                                    <img src='https://i.pinimg.com/originals/62/ae/fb/62aefb044922a5a847546e30b9036913.jpg'/>
                                </button>
                                <div>UserName</div>
                            </div>
                        </div>

                        <div className='dropDown'>
                            <ul>
                                <li><a>1</a></li>
                                <li><a>1</a></li>
                                <li><a>1</a></li>
                                <li><a>1</a></li>
                                <li><a>1</a></li>
                            </ul>
                        </div>

                    </div>
        </header>
    )
}

export default Header;