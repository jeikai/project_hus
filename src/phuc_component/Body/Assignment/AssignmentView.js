import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
export default function AssignmentView(props) {
    const AllDocument = props.AllDocument
    const reloadAssignment = props.reloadAssignment
    const [login, setLogin] = useState({
        mail: localStorage.getItem('email'),
        name: localStorage.getItem('name'),
        id: localStorage.getItem('teacherId')
    })
    
    const deleteAssignment = (documentId) => {
        axios.delete(`https://test.modnro.xyz/database/handleAssignmentView.php/${documentId}`).then(function(response){
            axios.get(`https://test.modnro.xyz/database/handleAssignment.php/${login.id}`,)
                 .then(function(response){
                    console.log(response.data);
                    // setAllDocument(response.data);
                    reloadAssignment();
            });    
        })
    }
    return (
            <div>
                <h3>KẾ HOẠCH HỌC TẬP ĐÃ UP</h3>
                <table>
                    
                    <thead>
                <tr>
                    <th>ID lớp</th>
                    <th>Tiêu đề</th>
                    <th>Nội dung kế hoạch</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            {AllDocument.map( (item, index) => {
                return (
                    <tr key={index}>
                        <td>{item.classId}</td>
                        <td>{item.title}</td>
                        <td>{item.content}</td>
                        <td><Link className='edit' to={`assignment/${item.AssignmentId}`}>Edit</Link></td>
                        <td>
                            <i className='bx bxs-trash' onClick={() => deleteAssignment(item.AssignmentId)}></i>
                        </td>
                    </tr>
                )
            })
            }
            </table>
            </div>
    )
}