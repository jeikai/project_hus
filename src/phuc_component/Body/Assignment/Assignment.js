import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import AssignmentView from './AssignmentView';
function Assignment() {
    const [AllDocument, setAllDocument] = useState([]);
        const id = localStorage.getItem('teacherId')
    
    const reloadAssignment = () => {
        axios.get(`http://localhost:8000/database/handleAssignment.php/${id}`,)
                 .then(function(response){
                    console.log(response.data);
                    setAllDocument(response.data);
                }); 
    }
    useEffect(() => {
            axios.get(`http://localhost:8000/database/handleAssignment.php/${id}`,)
                 .then(function(response){
                    console.log(response.data);
                    setAllDocument(response.data);
                });    
    }, [])

    

    const [inputs, setInputs] = useState();
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`http://localhost:8000/database/handleAssignment.php`, inputs)
        .then(function(response){
            console.log(response.data);
            // setInputs({...inputs})
            // window.location.reload(false);
        }); 
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
        console.log(inputs);
    }
    const click = (event) => {
        if ( inputs.title  && inputs.id  && inputs.content) {
            alert("Thêm thành công");
        }
    }

    
    return (
        <>
            <div className='body_teacher ms-5 me-5'>
            <form onSubmit={handleSubmit}>
                <table>
                    <h1>UPLOAD KẾ HOẠCH HỌC TẬP</h1>
                    <tr>
                        <td>Tiêu đề</td>
                        <td><input className='type_input' type="text" onChange={handleChange} name="title" required></input></td>
                    </tr>
                    <tr>
                        <td>ID lớp</td>
                        <td><input className='type_input' type="text" onChange={handleChange} name="id" required></input></td>
                    </tr>
                    <tr>
                        <td>Nội dung kế hoạch</td>
                        <td><textarea className='type_input' onChange={handleChange} name="content" required></textarea></td>
                    </tr>
                    <tr>
                        <td><input className='submit' type="submit" onClick={click} /></td>
                        <td></td>
                    </tr>
                </table>
                </form>
                <AssignmentView AllDocument={AllDocument} reloadAssignment={reloadAssignment} />
            </div>
        </>
    )
}
export default Assignment;