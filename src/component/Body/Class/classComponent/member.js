import { useState, useEffect } from 'react';
import './member.css'
import axios from 'axios';
export default function Member(props) {
    // console.log(id);
    const students = props.students;
    return(
        <div id="member">
            <div className="heading">
                <p>Thành viên lớp học ({students.length})</p>
            </div>
            <div className="find-member">
                    <form>
                        <button><i className='bx bx-search'></i></button>
                        <input type='text' placeholder="Nhập và ấn enter để tìm kiếm"/>
                    </form>
                <button>Thêm học sinh</button>
            </div>
            <div className='list-member'>
                <table className='table table-bordered table-striped'>
                    <thead>
                        <tr>
                            <th>Họ và tên</th>
                            <th>Trường</th>
                            <th>Lớp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(item => {
                            return(
                                <tr key={item.studentId}>
                                    <td colSpan={2}>
                                        {item.studentName}
                                    </td>
                                    <td>{item.phoneNumber}</td>
                                    <td>{item.birthDate}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}