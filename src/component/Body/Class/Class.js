import { useState } from 'react'
import { Router, useNavigate, Route, Routes } from "react-router-dom";
import DropDown from '../../DropDown'
import './Class.css'
import InClass from './InClass';

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

    const AllClass = [
        {
            type: 1,
            image: 'https://static.remove.bg/remove-bg-web/3ad3b721d276f1af1fb7121aff638a866139749a/assets/start-1abfb4fe2980eabfbbaaa4365a0692539f7cd2725f324f904565a9a744f8e214.jpg',
            name: 'Class 1', 
            id: '1'
        },
        {
            type: 0,
            image: 'https://d5nunyagcicgy.cloudfront.net/external_assets/hero_examples/hair_beach_v391182663/original.jpeg',
            name: 'Class 2', 
            id: '2'
        },
        {
            type: 0,
            image: 'https://i.pinimg.com/originals/62/ae/fb/62aefb044922a5a847546e30b9036913.jpg',
            name: 'Class 3', 
            id: '3'
        },
        {
            type: 0,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlz6xw4VEcJZvzfbArrBC66fX-OyxHCz_zSQ&usqp=CAU',
            name: 'Class 4', 
            id: '4'
        },
        {
            type: 0,
            image: 'https://img6.thuthuatphanmem.vn/uploads/2022/02/12/background-chat-va-dep-nhat_100426880.jpg',
            name: 'Class 5', 
            id: '5'
        },
    ]

    const [items, setItem] = useState(()=>{
        const updatedItem = AllClass.filter(curItem => curItem.type === 0)  
        return updatedItem;  
    });

    const filterClass = (index) => {
        const updatedItem = AllClass.filter(curItem => {
            return curItem.type === index
        })

        setItem(updatedItem)
        setSelected(index)
    }
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
                            onClick={()=> navigate(`/class/${item.id}/newfeed`)}
                        >
                            <img src={item.image} alt='' />
                            <div className="content">   
                                <div>
                                    <p><h4>{item.name}</h4></p>
                                    <p>{item.id}</p>
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