
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import DocumentView from './DocumentView';
function Document() {
    const [inputs, setInputs] = useState();
    const handleSubmit = async(event) => {
        event.preventDefault();
        await axios.post('https://test.modnro.xyz/database/handleDocument.php', 
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
        setInputs( values => ({...values, file: event.target.files[0] }));
    }
    const click = (event) => {
        if ( inputs.ID  && inputs.name  && inputs.file ) {
            alert("Thêm thành công");
            window.location.reload();
        }
    }
    return (
        <>
            <div className='body_teacher ms-5 m-5'>
            <form onSubmit={handleSubmit}>
                <table>
                    <h1>UPLOAD TÀI LIỆU HỌC TẬP</h1>
                    <tr>
                        <td>Tên tài liệu</td>
                        <td><input className='type_input' type="text" name = "name"  onChange={handleChange} required></input></td>
                    </tr>
                    <tr>
                        <td>ID lớp</td>
                        <td><input className='type_input' type="text" name = "ID"  onChange={handleChange} required></input></td>
                    </tr>
                    <tr>
                        <td>Upload file của bạn</td>
                        <td><input type="file" name = "file"  onChange={handleFile} required></input></td>
                    </tr>
                    <tr>
                        <td><button type="submit" class="btn btn-success" onClick={click}>Submit</button></td>
                        <td></td>
                    </tr>
                </table>
            </form>
            <DocumentView/>
            </div>
            
        </>
    )
}
export default Document;