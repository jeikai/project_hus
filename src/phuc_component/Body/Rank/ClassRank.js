import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import NumberStudent from '../Class/NumberStudent';
export default function ClassRank() {
    const navigate = useNavigate();
    const [login, setLogin] = useState({
        mail: localStorage.getItem('email'),
        name: localStorage.getItem('name'),
        id: localStorage.getItem('teacherId')
    })
    const [AllClass, setAllClass] = useState([]);
    useEffect(() => {
            axios.get(`http://localhost:8000/database/handleclass.php/${login.id}`,)
                 .then(function(response){
                    console.log(response.data);
                    setAllClass(response.data);
                });    
    }, [])
    return(     
        <>
            <div className='body_teacher ms-5 me-5'>
            <div className="MulBoxClass">
                {AllClass.map((item, index) =>{
                    return(
                        <div className="BoxClass" key={index} 
                        onClick={() =>navigate(`/RankView/${item.classId}`)}
                        >
                            <img src={item.classImage === "" ? "/assets/classImgs/defaultClassImg.jpg" :  '/assets/classImgs/' + item.classImage} alt='' />
                            <div className="content">   
                                <div>
                                    <div><h4>{item.className}</h4></div>
                                    <p>{item.classId}</p>
                                </div>
                                <div>
                                    <button><NumberStudent id={item.classId}/></button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            </div>
        </>   
    )
}