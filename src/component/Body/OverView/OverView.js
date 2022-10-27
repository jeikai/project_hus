import './OverView.css'
import { useEffect, useState } from "react";
import data from "../../../data/data";
import axios from 'axios';

function OverView() {

    const [selected, setSelected] = useState(0)
    const [homeWork, setHomeWork] = useState()
    const [todayClass, setTodayClass] = useState()
    const [document, setDocument] = useState()
    const [point, setPoint] = useState()
    const day = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"]
    let currentDay = new Date().getDay()
    const studentId = localStorage.getItem('studentId')

    const getHomeWork = async () => {
        await axios.get(`https://test.modnro.xyz/database/data_1/overViewHomeWork.php/${studentId}`)
            .then(function(response){
                // console.log(response.data);
                setHomeWork(response.data);
            });   
    }

    const getTodayClass = async () => {
        await axios.get(`https://test.modnro.xyz/database/data_1/overViewTodayClass.php/${studentId}`)
            .then(function(response){
                // console.log(response.data);
                setTodayClass(response.data);
            });   
    }

    const getDocument = async () => {
        await axios.get(`https://test.modnro.xyz/database/data_1/overViewDocument.php/${studentId}`)
            .then(function(response){
                // console.log(response.data);
                setDocument(response.data);
            });   
    }
    
    const getPoint = async () => {
        await axios.get(`https://test.modnro.xyz/database/data_1/overViewPoint.php/${studentId}`)
            .then(function(response){
                console.log(response.data);
                setPoint(response.data);
            });   
    }

    useEffect(() => {
        getHomeWork()
        getTodayClass()
        getDocument()
        getPoint()
    }, [])
    return (
        <section>
            <div className='menu'>
                {data.map((item, index) => {
                    return (
                        <a href={'#' + index} key={index} style={{ textDecoration: 'none' }}>
                            <div className={selected === index ? 'menuItem active' : 'menuItem'}

                                onClick={() => setSelected(index)}
                            >

                                <div>{item.icon}</div>
                                <span>{item.heading}</span>
                            </div>
                        </a>

                    )
                })}
            </div>

            <div className='body'>
                <div className='container' id='0'>
                    <h4>Lớp học hôm nay</h4>
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th className='w-50'>Tên lớp</th>
                                <th className='w-25'>Mở Lớp</th>
                                <th>Đóng Lớp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {todayClass !== undefined && todayClass.filter(item => item.DAY === day[currentDay]).map((item, index)=>{
                                return(
                                    <tr key={index}>
                                        <td>{item.className}</td>
                                        <td>{item.startLesson}</td>
                                        <td>{item.endLesson}</td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                </div>


                <div className='container' id='1'>
                    <h4>Bài tập chưa làm</h4>
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th className='w-50'>Tên bài tập</th>
                                <th className='w-25'>Lớp</th>
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {homeWork !== undefined && homeWork.map((item, index) =>{
                                return(
                                    <tr key={index}>
                                        <td>{item.ExerciseName}</td>
                                        <td>{item.className}</td>
                                        <td>Chưa làm</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>


                <div className='container' id='2'>
                    <h4>Tài liệu của bạn</h4>
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th className='w-50'>Tên tài liệu</th>
                                <th className='w-25'>Lớp</th>
                                <th>Ngày đăng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {document !== undefined && document.map((item, index) =>{
                                return(
                                    <tr key={index}>
                                        <td>{item.documentName}</td>
                                        <td>{item.className}</td>
                                        <td>{item.documentTime}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                <div className='container' id='3'>
                    <h4>Thành tích</h4>
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th className='w-50'>Tên Lớp</th>
                                <th className='w-25'>Giáo viên</th>
                                <th>ĐTB</th>
                            </tr>
                        </thead>
                        <tbody>

                            {point !== undefined && point.map((item, index) => {
                                return(
                                    <tr key={index}>
                                        <td>{item.className}</td>
                                        <td>{item.teacherName}</td>
                                        <td>{item.averageMark}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>


            </div>
        </section>
    )
}

export default OverView;