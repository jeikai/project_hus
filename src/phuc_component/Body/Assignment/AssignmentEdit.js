
import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
export default function AssignmentEdit() {
    const [inputs, setInputs] = useState([]);
    const {id} = useParams();
    useEffect(() => {
            axios.get(`https://test.modnro.xyz/database/handleAssignmentView.php/${id}`,)
                 .then(function(response){
                    console.log(response.data);
                    
                    setInputs(response.data);
                });    
    }, [])
    const handleSubmit = async(event) => {
        event.preventDefault();
        await axios.post(`https://test.modnro.xyz/database/handleAssignmentView.php/${id}`, 
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
            window.location.reload();
        }
    }
    return (
        <>
            <div className='body_teacher ms-5 m-5'>
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
                        <td><button type="submit" class="btn btn-success" onClick={click}>Submit</button></td>
                        <td></td>
                    </tr>
                </table>
            </form>
            </div>
        </>
    )
}