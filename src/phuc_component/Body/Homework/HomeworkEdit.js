import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import React from 'react';
export default function HomeworkEdit() {
    const [inputs, setInputs] = useState({['type']: 'practice'});
    const navigate = useNavigate();
    const {id} = useParams();
    useEffect(() => {
            axios.get(`https://test.modnro.xyz/database/handleHomeworkView.php/${id}`,)
                 .then(function(response){
                    console.log(response.data);
                    setInputs(response.data);
                }); 
    }, [])
    const handleSubmit = async(event) => {
        event.preventDefault();
        await axios.post(`https://test.modnro.xyz/database/handleHomeworkView.php/${id}`, 
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
        console.log(inputs);
            alert("Sửa thành công");
            window.location.reload();
    }
    return (      
        <>
            <div className='body_teacher ms-5 m-5'>
                <form onSubmit={handleSubmit}>
                <table>
                    <h1>SỬA BÀI TẬP</h1>
                    <tr>
                        <td>Tên bài tập</td>
                        <td><input value={inputs.ExerciseName} onChange={handleChange} className='type_input' type="text" required name="ExerciseName"></input></td>
                    </tr>
                    <tr>
                        <td>ID lớp</td>
                        <td><input value={inputs.classId} onChange={handleChange} className='type_input' type="text" required name="classId"></input></td>
                    </tr>
                    <tr>
                        <td>Thời gian bắt đầu</td>
                        <td>
                            <input onChange={handleChange} className='type_input' type="datetime-local" name="start"/>
                        </td>
                    </tr>
                    <tr>
                        <td>Thời gian bắt đầu đã cài đặt</td>
                        <td>{inputs.startingDay}</td>
                    </tr>
                    <tr>
                        <td>Thời gian kết thúc</td>
                        <td>
                            <input onChange={handleChange} className='type_input' type="datetime-local" name="end"/>
                        </td>
                    </tr>
                    <tr>
                        <td>Thời gian kết thúc đã cài đặt</td>
                        <td>{inputs.deadline}</td>
                    </tr>
                    <tr>
                        <td>Loại bài tập đã chọn</td>
                        <td>{inputs.typeExercise}</td>
                    </tr>
                    <tr>
                        <td>Loại bài tập</td>
                        <td>
                        <select onChange={handleChange} className='type_input' name="type">
                            <option selected hidden value="">---</option>
                            <option value="practice">Luyện tập</option>
                            <option value="mid">Giữa kì</option>
                            <option value="final">Cuối kì</option>
                        </select>
                        </td>
                    </tr>
                    <tr>
                        <td>File đã upload</td>
                        <td>{inputs.ExerciseFile}</td>
                    </tr>
                    <tr>
                        <td>Upload file của bạn</td>
                        <td><input onChange={handleFile} type="file" name="file"></input></td>
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