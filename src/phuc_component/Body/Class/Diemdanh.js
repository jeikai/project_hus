import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from 'axios';
export default function Diemdanh() {
    const id = useParams().id;
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
        <div className="body_teacher m-5">
            {AllStudent.map((sv, index) =>{
                    return(
                        <div key={index}>
                            <p>{sv.studentName}</p>
                        </div>
                    )
                })}
        </div>
        </>
    )
}