import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {toast} from 'react-toastify';
import axios from 'axios';
export default function Diemdanh() {
    const id = useParams().id;
    const navigate = useNavigate();
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    const [AllStudent, setAllStudent] = useState([]);    
    const [diemdanh, setDiemdanh] = useState({["classId"]: id});
    useEffect(() => {
            axios.get(`https://test.modnro.xyz/database/handleDiemdanh.php/${id}`,)
                 .then(function(response){
                    console.log(response.data);
                    console.log(id);
                    setAllStudent(response.data);
                });
    }, [])
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setDiemdanh(values => ({...values, [name]: value }))
        console.log(diemdanh);
    }
    const handleSubmit = async(event) => {
        event.preventDefault();
        let idToast = toast.loading("Please wait!");
        let response =  await axios.post('https://test.modnro.xyz/database/data/handleDiemDanh.php', 
        diemdanh, {
            
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            }
        );
        if(response.data.status === 1) {
            toast.update(idToast, {render: response.data.message, type: "success", isLoading: false,autoClose: true, closeButton: true});
            navigate(`/class/diemDanhChiTiet/${id}`);
        }else{
            toast.update(idToast, {render: "Something went wrong!!!", type: "error", isLoading: false, autoClose: true, closeButton: true});

        }
    }
    return (
        <>
        <div className="body_teacher m-5 ms-5">
        <h1 className="float-start">Bảng điểm danh ngày {day + " - " + month + " - " + year}</h1>
        <form onSubmit={(e)=>{handleSubmit(e)}}>
        <button type="submit" className=" float-end btn btn-primary" >Save</button>
        <button type="button" onClick={()=>{navigate(`/class/diemDanhChiTiet/${id}`)}} className=" float-end btn btn-primary mx-3" >Detail</button>
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
                        <tr key={index}>
                            <td>{sv.studentName}</td>
                            <td>
                            <div className="form-check">
                                <input required value='1' className="form-check-input" type="radio" name={sv.studentId} id="flexRadioDefault1" onClick={handleChange} />
                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                    Có
                                </label>
                            </div>
                            </td>
                            <td>
                            <div className="form-check">
                                <input required value='0' className="form-check-input" type="radio" name={sv.studentId} id="flexRadioDefault1" onClick={handleChange} />
                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                    Không
                                </label>
                            </div>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        </form>
        </div>
        </>
    )
}