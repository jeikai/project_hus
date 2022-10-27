import React from 'react';
import './Homework.css';
import { useState } from 'react';

import axios from 'axios';
import HomeworkView from './HomeworkView';
function Homework() {
    const [inputs, setInputs] = useState({['type']: 'practice'});
    const handleSubmit = async(event) => {
        event.preventDefault();
        await axios.post('https://test.modnro.xyz/database/handleHomework.php', 
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
        if ( inputs.id  && inputs.name  && inputs.file && inputs.type) {
            alert("Thêm thành công");
            window.location.reload();
        }
    }
    return (      
        <>
            <div className='body_teacher ms-5 m-5'>
                <form onSubmit={handleSubmit}>
                <table>
                    <h1>UPLOAD BÀI TẬP</h1>
                    <tr>
                        <td>Tên bài tập</td>
                        <td><input onChange={handleChange} className='type_input' type="text" required name="name"></input></td>
                    </tr>
                    <tr>
                        <td>ID lớp</td>
                        <td><input onChange={handleChange} className='type_input' type="text" required name="id"></input></td>
                    </tr>
                    <tr>
                        <td>Thời gian bắt đầu</td>
                        <td>
                            <input onChange={handleChange} className='type_input' type="datetime-local" required name="startingDay"/>
                        </td>
                    </tr>
                    <tr>
                        <td>Thời gian kết thúc</td>
                        <td>
                            <input onChange={handleChange} className='type_input' type="datetime-local" required name="deadline"/>
                        </td>
                    </tr>
                    <tr>
                        <td>Loại bài tập</td>
                        <td>
                        <select onChange={handleChange} className='type_input' name="type">
                            <option value="practice">Luyện tập</option>
                            <option value="mid">Giữa kì</option>
                            <option value="final">Cuối kì</option>
                        </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Upload file của bạn</td>
                        <td><input onChange={handleFile} type="file" multiple required name="file"></input></td>
                    </tr>
                    <tr>
                        <td><button type="submit" class="btn btn-success" onClick={click}>Submit</button></td>
                        <td></td>
                    </tr>
                </table>
                </form>
                <HomeworkView/>
            </div>
        </>
    )
}

export default Homework;