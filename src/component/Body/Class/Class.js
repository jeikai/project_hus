import { useEffect, useState } from 'react'
import { Router, useNavigate, Route, Routes } from "react-router-dom";
import DropDown from '../../DropDown'
import './Class.css'
import axios from 'axios';
import { useParams } from 'react-router-dom'
export default function Classes() {
    const navigate = useNavigate();
    const [selected, setSelected] = useState(0);

    const dataClass = [
        {
            link: '/',
            nameClass: 'Lớp của bạn',
        },
        {
            link: '/type=pending',
            nameClass: 'Lớp đang chờ'
        }
    ]

    const [AllClass, setAllClass] = useState([]);
    const [items, setItem] = useState([]);

    const filterClass = (index) => {
        const updatedItem = AllClass.filter(curItem => {
            return curItem.type === index
        })
        console.log(index);
        setItem(updatedItem)
        setSelected(index)
    }
    

    useEffect(() => {
            axios.get('http://localhost:8000/database/AllClass.php',)
                 .then(function(response){
                    console.log(response.data);
                    setAllClass(response.data);
                });    
            filterClass(0)
    }, [])

    

    

    return(
        <section id='class'>
            <div>
                {dataClass.map((item, index) =>{
                    return(
                        <button className={selected === index ? 'button classActive' : 'button'} 
                            key={index}
                            onClick={() => filterClass(index)}
                        >
                            {item.nameClass}
                        </button>
                    )
                })}
            </div>
            
            <div className='filterClass'>
                <div className='inputClass'>
                    <input type='text' placeholder='Tìm kiếm...'/>
                </div>
                
                <div className='selectFilter'>
                    <DropDown></DropDown>
                </div>         
    
                <button className='findClass'><span>+</span> Tìm lớp học</button>
            </div>
            
            <div className="MulBoxClass">
                    {items.map((item, index) =>{
                    return(
                        <div className="BoxClass" key={index}
                            onClick={()=> {
                                if(selected !== 1){
                                    navigate(`/class/${item.classId}`)
                                }
                            }}
                        >
                            <img src={item.classImage} alt='' />
                            <div className="content">   
                                <div>
                                    <p><h4>{item.className}</h4></p>
                                    <p>{item.classId}</p>
                                </div>
                                <div>
                                    <button>...</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}