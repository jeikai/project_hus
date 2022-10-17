import Menu from '../Menu';
import '../Menu.css';
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import DocumentView from './DocumentView';
function Document() {
    const [inputs, setInputs] = useState();
    const handleSubmit = async(event) => {
        event.preventDefault();
        await axios.post('http://localhost:8000/database/handleDocument.php', 
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
        }
    }
    return (
        <section>
            <Menu />
            <div className='body_teacher'>
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
                        <td><input className='submit' type="submit" onClick={click}/></td>
                        <td></td>
                    </tr>
                </table>
            </form>
            <DocumentView/>
            </div>
            
        </section>
    )
}
export default Document;