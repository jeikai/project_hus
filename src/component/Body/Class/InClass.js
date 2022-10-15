import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from 'axios';
import HomeWork from "./classComponent/homeWork";
import Member from "./classComponent/member";
import NewsFeed from "./classComponent/newfeed"
import Schedule from "./classComponent/schedule"
import File from "./classComponent/file";


export default function InClass() {
    const id = useParams().id;
    const navigate = useNavigate();
    const itemInClass = [
        {
            icon: <i className='bx bx-news'></i>,
            title: 'Bảng tin',
            link: `/class/${id}/newfeed`,
        },
        {
            icon: <i className='bx bx-customize'></i>,
            title: 'Lịch học',
            link: `/class/${id}/schedule`,
        },
        {
            icon: <i className='bx bx-user' ></i>,
            title: 'Thành viên',
            link: '/member',
        },
        {
            icon: <i className='bx bx-notepad' ></i>,
            title: 'Bài tập',
            link: 'homework',
        },
        {
            icon: <i className='bx bx-note' ></i>,
            title: 'Tài liệu',
            link: 'file'
        },
        {
            icon: <i className='bx bx-log-out' ></i>,
            title: 'Rời khỏi lớp',
            link: '',
        },
    ]

    const [selected, setSelected] = useState(0)
    
    const handleClick = (index, link) => {
        setSelected(index)
    }


    const [students, setStudents] = useState([]);
    useEffect(() => {
            axios.get(`http://localhost:8000/database/member.php/${id}`)
                .then(function(response){
                    console.log(response.data);
                    setStudents(response.data);
                });    
    }, [])
    
    const [teachers, setTeachers] = useState([]);
    useEffect(() => {
            axios.get(`http://localhost:8000/database/teacher.php/${id}`)
                .then(function(response){
                    console.log(response.data);
                    setTeachers(response.data);
                });    
    }, [])

    const [documents, setDocuments] = useState([]);
    useEffect(() => {
            axios.get(`http://localhost:8000/database/document.php/${id}`)
                .then(function(response){
                    console.log(response.data);
                    setDocuments(response.data);
                });    
    }, [])

    const [newsfeed, setNewsFeed] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:8000/database/post.php/${id}`)
            .then(function(response){
                console.log(response.data);
                setNewsFeed(response.data);
            });    
}, [])

    const reloadPosts = () => {
        axios.get(`http://localhost:8000/database/post.php/${id}`)
            .then(function(response){
                console.log(response.data);
                setNewsFeed(response.data);
            });    
    }
    // console.log(newsfeed);

    
    return(
        <section id="inClass">
            <div className="navbarClass">
                <div>
                    <p>Class Name</p>
                    <p>Ma lop: {id}</p>
                    <div className="dot"></div>
                    <p>Giao vien</p>
                    <div className="imageContent">
                        <div><img src="https://i.pinimg.com/originals/62/ae/fb/62aefb044922a5a847546e30b9036913.jpg" /></div>
                        <p>{teachers.teacherName}</p>
                    </div>
                    <p>Danh muc</p>
                    {/* <BrowserRouter> */}
                    {/* <Routes> */}
                    <div className="list">
                        {itemInClass.map((item, index) =>{
                            return(
                                <div className={selected === index ? 'item activeItem' : 'item'} key={index}
                                    onClick={()=> handleClick(index, item.link)}
                                >
                                    <div className="icon">{item.icon}</div>
                                    <div className="title">{item.title}</div>
                                </div>
                            )
                        })}
                    </div>
                    {/* </Routes> */}
                    {/* </BrowserRouter> */}
                </div>
            </div>
            <div className="contentClass">
                {selected === 0 ? <NewsFeed newsfeed={newsfeed} reloadPosts={reloadPosts} /> : 
                    selected === 1 ? <Schedule /> :selected === 2 ? <Member students={students}/> : selected === 3 ? <HomeWork /> : <File documents={documents}/>} 
            </div>
        </section>
    )
}