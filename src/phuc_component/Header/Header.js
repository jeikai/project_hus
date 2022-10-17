import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css'
function Header() {
    const Logout = () => {
        localStorage.clear();
        window.location.replace("http://localhost:3000/");
    }
    return(
        <header>
                    <div className='nav'>
                        <div className='logo'>
                            <Link to={'/'}><img src='https://rabiloo.com/images/logo-menu-white.svg' alt=''/></Link>
                        </div>
                        <div className='userControl'>
                            <div className='user'>
                                <button>
                                    <img src='https://i.pinimg.com/originals/62/ae/fb/62aefb044922a5a847546e30b9036913.jpg'/>
                                </button>
                                <div><i onClick={Logout} className='bx bx-log-out'></i></div>
                            </div>
                        </div>
                        
                    </div>
        </header>
    )
}

export default Header;