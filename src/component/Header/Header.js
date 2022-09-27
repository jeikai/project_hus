import { NavLink } from 'react-router-dom';
import './Header.css'
function Header() {
    return(
        <header>
                    <div className='nav'>
                        <div className='logo'>
                            <img src='https://rabiloo.com/images/logo-menu-white.svg' alt=''/>
                        </div>

                        <div className='navbar'>
                            <div><NavLink to='/'>Over View</NavLink></div>
                            <div><NavLink to='/class'>Class</NavLink></div>
                            <div><NavLink to='/TimeTable'>Time Table</NavLink></div>
                            <div><NavLink to='/News'>News</NavLink></div>
                        </div>

                        <div className='userControl'>
                            <div className='notification'>
                                <i class='bx bxs-bell-ring'></i>
                            </div>

                            <div className='user'>UserName</div>
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