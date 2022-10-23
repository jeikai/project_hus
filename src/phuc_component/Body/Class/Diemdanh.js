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
    useEffect(() => {
            axios.get(`http://localhost:8000/database/handleDiemdanh.php/${id}`,)
                 .then(function(response){
                    console.log(response.data);
                    console.log(id);
                    setAllStudent(response.data);
                });    
    }, [])
    return (
        <>
        <div className="body_teacher m-5 ms-5">
        <h1 className="float-start">Bảng điểm danh ngày {day + " - " + month + " - " + year}</h1>
        <button type="button" className=" float-end btn btn-primary">Save</button>
        <table>
            
            <thead>
                <tr>
                    <th>Họ và tên</th>
                    <th colSpan={2}></th>
                </tr>
            </thead>
            <tbody>
                {AllStudent.map((sv, index) =>{
                    return(
                        <tr>
                            <td>{sv.studentName}</td>
                            <td>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                <label class="form-check-label" for="flexRadioDefault1">
                                    Có
                                </label>
                            </div>
                            </td>
                            <td>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
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