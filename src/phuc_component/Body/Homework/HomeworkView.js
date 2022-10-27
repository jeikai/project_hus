import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
export default function HomeworkView() {
    const [login, setLogin] = useState({
        mail: localStorage.getItem('email'),
        name: localStorage.getItem('name'),
        id: localStorage.getItem('teacherId')
    })
    const [AllHomework, setAllHomework] = useState([]);
    useEffect(() => {
            axios.get(`https://test.modnro.xyz/database/handleHomework.php/${login.id}`,)
                 .then(function(response){
                    console.log(response.data);
                    setAllHomework(response.data);
                });    
    }, [])
    const deleteDoc = (documentId) => {
        axios.delete(`https://test.modnro.xyz/database/handleHomeworkView.php/${documentId}`).then(function(response){
            axios.get(`https://test.modnro.xyz/database/handleHomework.php/${login.id}`,)
                 .then(function(response){
                    console.log(response.data);
                    setAllHomework(response.data);
            });    
        })
    }
    return (
        <div>
            <h3>BÀI TẬP BẠN ĐÃ UP</h3>
            <table>  
            <thead>
                <tr>
                    <th>ID lớp</th>
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
                        <td>{item.classId}</td>
                        <td>{item.ExerciseName}</td>
                        <td>{item.startingDay}</td>
                        <td>{item.deadline}</td>
                        <td>{item.ExerciseFile}</td>
                        <td>{item.typeExercise}</td>
                        <td><Link className='edit' to={`btvn/${item.ExerciseId}`}>Edit</Link></td>
                        <td>
                            <i className='bx bxs-trash' onClick={() => deleteDoc(item.ExerciseId)}></i>
                        </td>
                    </tr>
                )
            })
            }
            </table>
        </div>
    )
}