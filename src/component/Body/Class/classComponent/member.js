import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import './member.css'
import axios from 'axios';
export default function Member() {
    const id = useParams().id;
    console.log(id);
    const [students, setStudents] = useState([]);
    useEffect(() => {
            axios.get(`http://localhost:3000/src/database/member.php/${id}`)
                 .then(function(response){
                    console.log(response.data);
                    setStudents(response.data);
                });    
    }, [])
    return(
        <div id="member">
            <div className="heading">
                <p>Thành viên lớp học (1)</p>
            </div>
            <div className="find-member">
                    <form>
                        <button><i class='bx bx-search'></i></button>
                        <input type='text' placeholder="Nhập và ấn enter để tìm kiếm"/>
                    </form>
                <button>Thêm học sinh</button>
            </div>
            <div className='list-member'>
                <table>
                    <thead>
                        <tr>
                            <th>Họ và tên</th>
                            <th>Trường</th>
                            <th>Lớp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {students.map(item => {
                            return(
                                <tr key={item.studentId}>
                                    <td>
                                        <div>
                                            <img src='https://i.pinimg.com/originals/62/ae/fb/62aefb044922a5a847546e30b9036913.jpg' />
                                        </div>
                                        <p>{item.studentName}</p>
                                    </td>
                                    <td>{item.studentEmail}</td>
                                    <td>{item.birthDate}</td>
                                </tr>
                            )
                        })} */}
                    </tbody>
                </table>
            </div>
        </div>
    )
}