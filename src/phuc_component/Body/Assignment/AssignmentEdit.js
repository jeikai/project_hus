import Menu from '../Menu';
import '../Menu.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
export default function AssignmentEdit() {
    const [inputs, setInputs] = useState([]);
    const {id} = useParams();
    useEffect(() => {
            axios.get(`http://localhost:8000/database/handleAssignmentView.php/${id}`,)
                 .then(function(response){
                    console.log(response.data);
                    
                    setInputs(response.data);
                });    
    }, [])
    const handleSubmit = async(event) => {
        event.preventDefault();
        await axios.post(`http://localhost:8000/database/handleAssignmentView.php/${id}`, 
            inputs, {
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            }
        );
        console.log(inputs);
    }
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs({...inputs, [name]: value})
        console.log(inputs);
    }
    const handleFile = (event) => {
        setInputs( values => ({...values, file: event.target.files[0] }));
    }
    const click = (event) => {
        if (  inputs.title  && inputs.content ) {
            alert("Sửa thành công");
        }
    }
    return (
        <section>
            <Menu />
            <div className='body_teacher'>
            <form onSubmit={handleSubmit}>
                <table>
                    <h1>SỬA KẾ HOẠCH HỌC TẬP</h1>
                    <tr>
                        <td>Tên tiêu đề</td>
                        <td><input value={inputs.title} className='type_input' type="text" name = "title"  onChange={handleChange} required></input></td>
                    </tr>
                    <tr>
                        <td>ID lớp</td>
                        <td><input value={inputs.classId} className='type_input' type="text" name = "classId" onChange={handleChange} required></input></td>
                    </tr>
                    <tr>
                        <td>Nội dung kế hoạch</td>
                        <td><textarea value={inputs.content} className='type_input' onChange={handleChange} name="content" required></textarea></td>
                    </tr>
                    <tr>
                        <td><input className='submit' type="submit" onClick={click}/></td>
                        <td></td>
                    </tr>
                </table>
            </form>
            </div>
        </section>
    )
}