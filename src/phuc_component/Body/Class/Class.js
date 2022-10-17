import { useState } from 'react'
import './Class.css'
import Menu from '../Menu';
import '../Menu.css';
import { useEffect } from 'react';
import axios from 'axios';
import NumberStudent from './NumberStudent';
export default function Class() {
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
        <section>
            <Menu />
            <div className='body_teacher'>
            <div className="MulBoxClass">
                {AllClass.map((item, index) =>{
                    return(
                        <div className="BoxClass" key={index} >
                            <img src={item.classImage} alt='' />
                            <div className="content">   
                                <div>
                                    <p><h4>{item.className}</h4></p>
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
        </section>   
    )
}