import { useState } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import HomeWork from "./classComponent/homeWork";
import Member from "./classComponent/member";
import NewsFeed from "./classComponent/newfeed"
import Schedule from "./classComponent/schedule"
import File from "./classComponent/file";


export default function InClass() {
    const navigate = useNavigate();
    const itemInClass = [
        {
            icon: <i class='bx bx-news'></i>,
            title: 'Bảng tin',
            link:'class/newfeed'
        },
        {
            icon: <i class='bx bx-customize'></i>,
            title: 'Lịch học',
            link: '/class/3/schedule',
        },
        {
            icon: <i class='bx bx-user' ></i>,
            title: 'Thành viên',
            link: '/member',
        },
        {
            icon: <i class='bx bx-notepad' ></i>,
            title: 'Bài tập',
            link: 'homework',
        },
        {
            icon: <i class='bx bx-note' ></i>,
            title: 'Tài liệu',
            link: 'file'
        },
        {
            icon: <i class='bx bx-log-out' ></i>,
            title: 'Rời khỏi lớp',
            link: '',
        },
    ]

    const [selected, setSelected] = useState(0)
    const handleClick = (index, link) => {
        navigate(link)
        setSelected(index)
    }
    return(
        <section id="inClass">
            <div className="navbarClass">
                <div>
                    <p>Class Name</p>
                    <p>Ma lop: </p>
                    <div className="dot"></div>
                    <p>Giao vien</p>
                    <div className="imageContent">
                        <div><img src="https://i.pinimg.com/originals/62/ae/fb/62aefb044922a5a847546e30b9036913.jpg" /></div>
                        <p>Ten Giao Vien</p>
                    </div>
                    <p>Danh muc</p>
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
                </div>
            </div>
            <div className="contentClass">
                {/* <Routes>
                    <Route path="/newfeed" element={<NewsFeed />}/>
                    <Route path='/class/:id/schedule' element={<Schedule />}/>
                </Routes>                 */}
                {/* <NewsFeed></NewsFeed> */}
                {/* <Schedule></Schedule> */}
                {/* <Member></Member> */}
                {/* <HomeWork></HomeWork> */}
                <File></File>
            </div>
        </section>
    )
}