import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {toast} from 'react-toastify';
import axios from 'axios';
export default function ChiTietDiemDanh() {
    const id = useParams().id;
    const navigate = useNavigate();
    console.log(id);
    const [AllStudent, setAllStudent] = useState([]);
    const [DiemDanhChiTiet, setDiemDanhChiTiet] = useState([]);
    const [Ngay, setNgay] = useState([]);
    useEffect( () => {
            getAllStudent();
            getAllStatusDiemDanh();
            getAllDay();
    }, [])
    const getAllStudent = async () =>{
        await axios.get(`http://localhost:8000/database/handleDiemdanh.php/${id}`,)
                 .then(function(response){
                    console.log(response.data);
                    setAllStudent(response.data);
                });
    }
    const getAllStatusDiemDanh = async () =>{
        await axios.get(`http://localhost:8000/database/data/handleDetailDiemDanh.php?classId=${id}`, )
                    .then(function(response){
                    console.log(response.data);
                    setDiemDanhChiTiet(response.data);
                });
    }
    const getAllDay = async () =>{
        await axios.get(`http://localhost:8000/database/data/handleDetailDay.php?classId=${id}`, )
                    .then(function(response){
                    console.log(response.data);
                    setNgay(response.data);
                });
    }
    // const handleChange = (event) => {
    //     const name = event.target.name;
    //     const value = event.target.value;
        
    // }
    // const handleSubmit = async(event) => {
    //     event.preventDefault();
    //     let idToast = toast.loading("Please wait!");
    //     let response =  await axios.post('http://localhost:8000/database/data/handleDiemDanh.php', 
    //     diemdanh, {
    //             headers: {
    //             'Content-Type': 'multipart/form-data'
    //             }
    //         }
    //     );
    //     if(response.data.status === 1) {
    //         setDiemdanh({});
    //         toast.update(idToast, {render: response.data.message, type: "success", isLoading: false,autoClose: true, closeButton: true});

    //     }else{
    //         toast.update(idToast, {render: "Something went wrong!!!", type: "error", isLoading: false, autoClose: true, closeButton: true});

    //     }
    // }
    return (
        <>
            <div className="body_teacher m-5 ms-5">
            <h1 className="float-start">Bảng điểm danh chi tiết</h1>
            <button type="button" onClick={() =>navigate(`/class/${id}`)} className=" float-end btn btn-primary" >Back</button>
            <table className="table">
            <thead>
                <tr>
                <th scope="col">#</th>
                {Ngay !== undefined && 
                    Ngay.map((date, index) =>{
                        return(
                            <th scope="col" key={index}>{date.DAY}</th>
                        )
                    })}
                </tr>
            </thead>
            <tbody>
                
                {AllStudent !== undefined && 
                    AllStudent.map((sv, index) =>{
                        return(
                            <>
                            <tr key={index}>
                                <th scope="row">{sv.studentName}</th>
                                {DiemDanhChiTiet !== undefined && 
                                DiemDanhChiTiet.filter(item=>item.studentId === sv.studentId).map((date, index) =>{
                                    return(
                                        <td scope="col" key={index}>{date.status === 1?"Có mặt":"Vắng"}</td>
                                    )
                                })}
                            </tr>
                            </>
                        )
                })}
                
                
            </tbody>
            </table>
            

            </div>
        </>
    )
}