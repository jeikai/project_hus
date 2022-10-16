import React from "react";
import { NavLink } from "react-router-dom";
import "./sideNav.css"

class SideNav extends React.Component {

    render(){

        return(
            <>
                <div className={this.props.myActive ? 'sidebar active1' : 'sidebar'}>
                    <div className="logo_content" >
                        <div className="logo">
                            <img src="https://rabiloo.com/images/logo-menu-white.svg" alt="..."/>
                        </div>
                        <i className='bx bx-menu' 
                         onClick={ () => this.props.updateActive(!this.props.myActive)}></i>
                    </div>

                    <ul className="nav_list">
                        <li>
                            <NavLink to='/' end>
                                <i className= 'bx bx-home-alt-2 bx-sm' ></i>
                                <span className="links_name">Dashboard</span>
                            </NavLink>
                            <span className="tooltip">Dashboard</span>
                        </li>
                        <li>
                            <NavLink to='/Users'>
                                <i className='bx bx-user bx-sm' ></i>
                                <span className="links_name">Users</span>
                            </NavLink>
                            <span className="tooltip">Users</span>
                        </li>
                        <li>
                            <NavLink to='/AddUsers'>
                                <i className='bx bx-user-plus bx-sm' ></i>
                                <span className="links_name">Add Users</span>
                            </NavLink>
                            <span className="tooltip">Add Users</span>
                        </li>
                        <li>
                            <NavLink color="white" to='/Classes'>
                                <i className='bx bx-book-open bx-sm' ></i>
                                <span className="links_name">Classes</span>
                            </NavLink>
                            <span className="tooltip">Classes</span>
                        </li>
                        <li>
                            <NavLink to='/AddClass'>
                                <i className='bx bx-book-add bx-sm' ></i>
                                <span className="links_name">Add Classes</span>
                            </NavLink>
                            <span className="tooltip">Add Classes</span>
                        </li>
                        <li>
                            <NavLink to='/News'>
                                <i className='bx bx-news bx-sm' ></i>
                                <span className="links_name">News</span>
                            </NavLink>
                            <span className="tooltip">News</span>
                        </li>
                        <li>
                            <NavLink to='/AddNew'>
                                <i className='bx bx-message-add bx-sm' ></i>
                                <span className="links_name">Add News</span>
                            </NavLink>
                            <span className="tooltip">Add News</span>
                        </li>
                    </ul>
                    <div className="logo-out">
                            <NavLink to='/'>
                                <i className='bx bx-log-out  bx-sm' ></i>
                                <span className="links_name">Logo out</span>
                            </NavLink>
                    </div>
                </div>
            </>
        );
    }


}


export default SideNav;