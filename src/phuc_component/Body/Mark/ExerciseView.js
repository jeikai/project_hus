import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
export default function ExerciseView() {
    const id = useParams().id;
    const [AllHomework, setAllHomework] = useState([]);
    useEffect(() => {
            axios.get(`http://localhost:8000/database/handleMark.php/${id}`,)
                 .then(function(response){
                    console.log(response.data);
                    setAllHomework(response.data);
                });    
    }, [])
    return (
        <>
        <div className='body_teacher ms-5 m-5'>
            <h3>BÀI TẬP BẠN ĐÃ UP</h3>
            <table>
            <thead>
                <tr>
                    <th>Tên bài tập</th>
                    <th>Thời gian bắt đầu</th>
                    <th>Thời gian kết thúc</th>
                    <th>Tài liệu</th>
                    <th>Phân loại</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            {AllHomework.map( (item, index) => {
                return (
                    <tr key={index}>
                        <td>{item.ExerciseName}</td>
                        <td>{item.startingDay}</td>
                        <td>{item.deadline}</td>
                        <td>{item.ExerciseFile}</td>
                        <td>{item.typeExercise}</td>
                        <td><Link className='edit' to={`/AllStudentView/${item.ExerciseId}/${id}`}>View</Link></td>
                    </tr>
                )
            })
            }
            </table>
        </div>
        </>
    )
}