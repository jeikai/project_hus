
import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
function DocumentEdit() {
    const [inputs, setInputs] = useState([]);
    const {id} = useParams();
    useEffect(() => {
            axios.get(`http://localhost:8000/database/handleDocumentView.php/${id}`,)
                 .then(function(response){
                    console.log(response.data);
                    setInputs(response.data);
                });    
    }, [])
    const handleSubmit = async(event) => {
        event.preventDefault();
        await axios.post(`http://localhost:8000/database/handleDocumentView.php/${id}`, 
            inputs, {
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            }
        );
    }
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
        console.log(inputs);
    }
    const handleFile = (event) => {
        console.log(inputs);
        setInputs( values => ({...values, file: event.target.files[0] }));
    }
    const click = (event) => {
        if ( inputs.documentName  ) {
            alert("Sửa thành công");
        }
    }
    return (
        <>
            <div className='body_teacher ms-5 m-5'>
            <form onSubmit={handleSubmit}>
                <table>
                    <h1>SỬA TÀI LIỆU HỌC TẬP</h1>
                    <tr>
                        <td>Tên tài liệu</td>
                        <td><input value={inputs.documentName} className='type_input' type="text" name = "documentName"  onChange={handleChange} required></input></td>
                    </tr>
                    <tr>
                        <td>ID lớp</td>
                        <td><input value={inputs.classId} className='type_input' type="text" name = "classId" onChange={handleChange} required></input></td>
                    </tr>
                    <tr>
                        <td>File đang có</td>
                        <td>{inputs.documentFile}</td>
                    </tr>
                    <tr>
                        <td>Upload file mới của bạn</td>
                        <td><input type="file" name = "file"  onChange={handleFile}></input></td>
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
export default DocumentEdit;