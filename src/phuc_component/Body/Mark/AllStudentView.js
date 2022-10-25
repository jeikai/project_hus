import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
export default function AllStudentView() {
    const id = useParams().id;
    const [AllSTudent, setAllSTudent] = useState([]);
    useEffect(() => {
            axios.get(`http://localhost:8000/database/handleMarkStudentView.php/${id}`,)
                 .then(function(response){
                    console.log(response.data);
                    setAllSTudent(response.data);
                });    
    }, [])
    return (
        <>
        <div className='body_teacher ms-5 m-5'>
            <h3>DANH SÁCH HỌC SINH ĐÃ NỘP</h3>
            <table>
            <thead>
                <tr>
                    <th>Họ và tên</th>
                    <th></th>
                </tr>
            </thead>
            {AllSTudent.map( (item, index) => {
                return (
                    <tr key={index}>
                        <td>{item.studentName}</td>
                        <td><Link className='edit' to={`markView/${item.ExerciseId}`}>View</Link></td>
                    </tr>
                )
            })
            }
            </table>
        </div>
        </>
    )
}