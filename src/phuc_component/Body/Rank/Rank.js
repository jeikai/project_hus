import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
export default function Rank() {
    const id = useParams().id;
    const [AllSTudent, setAllSTudent] = useState([]);
    useEffect(() => {
            axios.get(`https://test.modnro.xyz/database/handleRank.php/${id}`,)
                 .then(function(response){
                    console.log(response.data);
                    setAllSTudent(response.data);
                });    
    }, [])
    return (
        <>
        <div className='body_teacher ms-5 m-5'>
            <h3>BẢNG ĐIỂM LỚP </h3>
            <table>
            <thead>
                <tr>
                    <th>ID học sinh</th>
                    <th>Họ và tên</th>
                    <th>Ngày sinh</th>
                    <th>Điểm thành phần(4 bài)</th>
                    <th>Điểm giữa kỳ(2 bài)</th>
                    <th>Điểm cuối Kỳ(1 bài)</th>
                    <th>Điểm tổng</th>
                </tr>
            </thead>
            {AllSTudent.map( (item, index) => {
                return (
                    <tr key={index}>
                        <td>{item.studentId}</td>
                        <td>{item.studentName}</td>
                        <td>{item.birthDate}</td>
                        <td>{item.componentMark}</td>
                        <td>{item.midMark}</td>
                        <td>{item.finalMark}</td>
                        <td>{item.averageMark}</td>
                        <td></td>
                    </tr>
                )
            })
            }
            </table>
        </div>
        </>
    )
}