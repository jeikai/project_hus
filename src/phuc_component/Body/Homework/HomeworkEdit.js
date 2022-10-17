import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Menu from '../Menu';
import '../Menu.css';
import axios from 'axios';
import React from 'react';
export default function HomeworkEdit() {
    const [inputs, setInputs] = useState([]);
    const {id} = useParams();
    useEffect(() => {
            axios.get(`http://localhost:8000/database/handleHomeworkView.php/${id}`,)
                 .then(function(response){
                    console.log(response.data);
                    setInputs(response.data);
                });    
    }, [])
    const handleSubmit = async(event) => {
        event.preventDefault();
        await axios.post(`http://localhost:8000/database/handleHomeworkView.php/${id}`, 
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
        if ( inputs.name  && inputs.file ) {
            alert("Sửa thành công");
        }
    }
    return (      
        <section>
            <Menu />
            <div className='body_teacher'>
                <form onSubmit={handleSubmit}>
                <table>
                    <h1>SỬA BÀI TẬP</h1>
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
                            <input onChange={handleChange} min='2022' className='time' type="number" placeholder='year' required name="startyear"/>-
                            <input onChange={handleChange} min='1' className='time' type="number" placeholder='month' required name="startmonth"/>-
                            <input onChange={handleChange} min='1' max='31' className='time' type="number" placeholder='day' required name="startday"/> |
                            <input onChange={handleChange} min='0' max='24'className='time' type="number" placeholder='hour' required name="starthour"/>-
                            <input onChange={handleChange} min='0' max='59' className='time' type="number" placeholder='minute' required name="startmin"/>-
                            <input onChange={handleChange} min='0' max='59' className='time' type="number" placeholder='second' required name="startsecond"/>
                        </td>
                    </tr>
                    <tr>
                        <td>Thời gian kết thúc</td>
                        <td>
                            <input onChange={handleChange} min='2022' className='time' type="number" placeholder='year' required name="endyear"/>-
                            <input onChange={handleChange} min='1' className='time' type="number" placeholder='month' required name="endmonth"/>-
                            <input onChange={handleChange} min='1' max='31' className='time' type="number" placeholder='day' required name="endday"/> |
                            <input onChange={handleChange} min='0' max='24'className='time' type="number" placeholder='hour' required name="endhour"/>-
                            <input onChange={handleChange} min='0' max='59' className='time' type="number" placeholder='minute' required name="endmin"/>-
                            <input onChange={handleChange} min='0' max='59' className='time' type="number" placeholder='second' required name="endsecond"/>
                        </td>
                    </tr>
                    <tr>
                        <td>Loại bài tập</td>
                        <td>
                        <select onChange={handleChange} className='type_input' name="type">
                            <option selected value="practice">Luyện tập</option>
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
                        <td><input onClick={click} className='submit' type="submit" /></td>
                        <td></td>
                    </tr>
                </table>
                </form>
                </div>
            </section>
        )
}