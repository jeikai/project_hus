import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './DocumentView.css';
export default function DocumentView() {
    const [login, setLogin] = useState({
        mail: localStorage.getItem('email'),
        name: localStorage.getItem('name'),
        id: localStorage.getItem('teacherId')
    })
    const [AllDocument, setAllDocument] = useState([]);
    useEffect(() => {
            axios.get(`http://localhost:8000/database/handleDocument.php/${login.id}`,)
                 .then(function(response){
                    console.log(response.data);
                    setAllDocument(response.data);
                });    
    }, [])
    const deleteDoc = (documentId) => {
        axios.delete(`http://localhost:8000/database/handleDocumentView.php/${documentId}`).then(function(response){
            axios.get(`http://localhost:8000/database/handleDocument.php/${login.id}`,)
                 .then(function(response){
                    console.log(response.data);
                    setAllDocument(response.data);
            });    
        })
    }
    return (
        <div>
            <h3>TÀI LIỆU BẠN ĐÃ UP</h3>
            <table>
            
            <thead>
                <tr>
                    <th>ID lớp</th>
                    <th>Tiêu đề</th>
                    <th>Tài liệu</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            {AllDocument.map( (item, index) => {
                return (
                    <tr key={index}>
                        <td>{item.classId}</td>
                        <td>{item.documentName}</td>
                        <td>{item.documentFile}</td>
                        <td><Link className='edit' to={`document/${item.documentId}`}>Edit</Link></td>
                        <td>
                            <i className='bx bxs-trash' onClick={() => deleteDoc(item.documentId)}></i>
                        </td>
                    </tr>
                )
            })
            }
            </table>
        </div>
    )
}