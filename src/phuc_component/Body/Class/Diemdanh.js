import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from 'axios';
export default function Diemdanh() {
    const id = useParams().id;
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    const [AllStudent, setAllStudent] = useState([]);       
    const [diemdanh, setDiemdanh] = useState([{}]);
    useEffect(() => {
            axios.get(`http://localhost:8000/database/handleDiemdanh.php/${id}`,)
                 .then(function(response){
                    console.log(response.data);
                    console.log(id);
                    setAllStudent(response.data);
                });
    }, [])
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setDiemdanh(values => ({...values, [`name`]: value + " " + name  }))
        console.log(diemdanh);
    }
    // const handleSubmit = async(event) => {
    //     event.preventDefault();
    //     await axios.post('http://localhost:8000/database/handleDocument.php', 
    //         inputs, {
    //             headers: {
    //             'Content-Type': 'multipart/form-data'
    //             }
    //         }
    //     );
    // }
    return (
        <>
        <div className="body_teacher m-5 ms-5">
        <h1 className="float-start">Bảng điểm danh ngày {day + " - " + month + " - " + year}</h1>
        <button type="button" className=" float-end btn btn-primary" >Save</button>
        <table>
            
            <thead>
                <tr>
                    <th>ID học viên</th>
                    <th>Họ và tên</th>
                    <th>Ngày sinh</th>
                    <th colSpan={2}></th>
                </tr>
            </thead>
            <tbody>
                {AllStudent.map((sv, index) =>{
                    return(
                        <tr>
                            <td>{sv.studentId}</td>
                            <td>{sv.studentName}</td>
                            <td>{sv.birthDate}</td>
                            <td>
                            <div class="form-check">
                                <input value='co' class="form-check-input" type="radio" name={sv.studentId} id="flexRadioDefault1" onClick={handleChange} />
                                <label class="form-check-label" for="flexRadioDefault1">
                                    Có
                                </label>
                            </div>
                            </td>
                            <td>
                            <div class="form-check">
                                <input value='khong' class="form-check-input" type="radio" name={sv.studentId} id="flexRadioDefault1" onClick={handleChange} />
                                <label class="form-check-label" for="flexRadioDefault1">
                                    Không
                                </label>
                            </div>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        </div>
        </>
    )
}