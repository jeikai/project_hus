import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ViewFile from '../../../component/Body/Class/classComponent/viewFile';
import { Link, useParams } from 'react-router-dom';
export default function MarkView() {
    const studentId = useParams().id;
    const exerciseId = useParams().exerciseId;
    const classId = useParams().classId;
    const [AllMarkView, setAllMarkView] = useState([]);
    const [inputs, setInputs] = useState([]);
    const [isActive, setIsActive] = useState(undefined);
    const [viewPdf, setViewPdf] = useState(
        () => localStorage.getItem('file')
    )
    useEffect(() => {
            axios.get(`https://test.modnro.xyz/database/handleMarkView.php/${studentId}/${exerciseId}/${classId}`,)
                 .then(function(response){
                    console.log(response.data);
                    setAllMarkView(response.data);
                    console.log(AllMarkView);
                });    
    }, [])
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
        console.log(inputs);
    }
    let type;
    AllMarkView.map( (item, index) => {
        if (item.typeExercise === "practice")  {
            type = item.componentMark;
        } else if (item.typeExercise === "mid") {
            type = item.midMark;
        } else if ( item.typeExercise === "final") {
            type = item.finalMark;
        }
    })
    console.log(type);
    const handleSubmit = async(event) => {
        event.preventDefault();
        
<<<<<<< HEAD
        await axios.post(`https://test.modnro.xyz/database/handleMarkView.php/${studentId}/${AllMarkView[0].typeExercise}/${type}/${AllMarkView[0].classId}/${AllMarkView[0].averageMark}`, 
=======
        await axios.post(`http://localhost:8000/database/handleMarkView.php/${studentId}/${AllMarkView[0].typeExercise}/${type}/${AllMarkView[0].classId}/${AllMarkView[0].averageMark}/${exerciseId}`, 
>>>>>>> f554828b3dc6f751b8866953cf6a733d5e4622f1
            inputs, {
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            }
        );
    }
    const click = (event) => {
        if ( inputs.point ) {
            alert("Ch???m xong");
            window.location.reload();
        }
    }
    return (
        <>
        <div className='body_teacher ms-5 m-5'>          
        {AllMarkView.map( (item, index) => {
            return (
            <div>
            <h1>B??i l??m c???a {item.studentName}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input placeholder='Ch???m ??i???m t???i ????y' required onChange={handleChange} min={0} max={10} type="number" name="point" className="form-control"/>
                </div>
                <div>
                    <button class="btn btn-success" onClick={click} type="submit">Save</button>
                </div> 
            </form>  
            <div className="viewFilePdf">
                    <ViewFile setIsActive={setIsActive} viewPdf={item.fileUpload} />
            </div>
            </div>
            )
            })
        }
        </div>
        </>
    )
}