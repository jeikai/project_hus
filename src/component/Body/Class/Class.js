import { useEffect, useState } from 'react'
import { Router, useNavigate, Route, Routes } from "react-router-dom";
import DropDown from '../../DropDown'
import './Class.css'
import axios from 'axios';
import { useParams } from 'react-router-dom'
import ModalFindClas from './modalFindClass';
import JoinClass from './joinClass';
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
    
    const selectAllClass = () => {

        axios.get(`https://test.modnro.xyz/database/AllClass.php/${studentId}`,)
                 .then(function(response){
                    console.log(response.data);
                    setAllClass(response.data);
                });
    }

    const studentId = localStorage.getItem('studentId');
    useEffect(() => {
            axios.get(`https://test.modnro.xyz/database/AllClass.php/${studentId}`,)
                 .then(function(response){
                    console.log(response.data);
                    setAllClass(response.data);
                    
                });    
            // filterClass(0)
    }, [])

    
    const [active, setActive] = useState(false)
    const [activeJoin, setActiveJoin] = useState(false)
    const [classValue, setClassValue] = useState()

    return(
        <section id='class'>
            {active ? <ModalFindClas selectAllClass={selectAllClass} setActiveJoin={setActiveJoin} activeJoin={activeJoin} 
                        setActive={setActive} active={active} /> : ""}
            {activeJoin ? <JoinClass classValue={classValue} setActiveJoin={setActiveJoin} activeJoin={activeJoin} /> : ""}
            <div>
                {dataClass.map((item, index) =>{
                    return(
                        <button className={selected === index ? 'button classActive' : 'button'} 
                            key={index}
                            onClick={() => setSelected(index)}
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
    
                <button onClick={() => setActive(!active)} className='findClass'><span>+</span> Tìm lớp học</button>
            </div>
            
            <div className="MulBoxClass">
                    {AllClass.map((item, index) =>{
                    return(
                        <div className="BoxClass" key={index}
                            onClick={() =>navigate(`/class/${item.classId}`)}
                        >
                            <img src={'/assets/classImgs/' + item.classImage} alt='' />
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