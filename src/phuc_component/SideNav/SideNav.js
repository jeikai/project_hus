import React from "react";
import { NavLink } from "react-router-dom";
import "./SideNav.css"

class TeacherSideNav extends React.Component {
    logout = () =>{
        localStorage.clear();
        window.location.replace("http://localhost:3000/");
    }
    render(){

        return(
            <>
                <div className={this.props.myActive ? 'sidebar active1' : 'sidebar'}>
                    <div className="logo_content" >
                        <div className="logo">
                        <NavLink to={'/'} end>
                            <img src="https://rabiloo.com/images/logo-menu-white.svg" alt="..."/>
                        </NavLink>
                        </div>
                        <i className='bx bx-menu' 
                         onClick={ () => this.props.updateActive(!this.props.myActive)}></i>
                    </div>

                    <ul className="nav_list">
                        <li>
                            <NavLink to={'/class'} end>
                                <i className='bx bxs-customize'></i>
                                <span className="links_name">Lớp học của bạn</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/btvn'} end>
                                <i className='bx bx-receipt'></i>
                                <span className="links_name">Upload bài tập</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/timetable'} end>
                                <i className='bx bx-table'></i>
                                <span className="links_name">Thời khoá biểu của bạn</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/document'} end>
                                <i className='bx bxs-customize'></i>
                                <span className="links_name">Up tài liệu học</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/assignment'} end>
                                <i className='bx bxs-pencil' ></i>
                                <span className="links_name">Kế hoạch học tập</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/classMark'} end>
                                <i className='bx bxs-edit-alt'></i>
                                <span className="links_name">Chấm điểm bài tập</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/rank'} end>
                                <i className='bx bx-table'></i>
                                <span className="links_name">Điểm thành phần</span>
                            </NavLink>
                        </li>
                    </ul>
                    <div className="logo-out">
                            <NavLink onClick={()=>this.logout()}>
                                <i className='bx bx-log-out  bx-sm' ></i>
                                <span className="links_name">Logo out</span>
                            </NavLink>
                    </div>
                </div>
            </>
        );
    }


}


export default TeacherSideNav;