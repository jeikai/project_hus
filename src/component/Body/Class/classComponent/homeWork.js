import axios from 'axios';
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import DropDown from './../../../DropDown'
import './homeWork.css'
export default function HomeWork() {
    const [isActive, setIsActive] = useState(false);
    const navigate = useNavigate();

    const id = useParams().id
    // console.log(id)
    const [homeWorks, setHomeWorks] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:8000/database/homework.php/${id}/${localStorage.getItem('studentId')}`)
            .then(function (response) {
                console.log(response.data);
                setHomeWorks(response.data);
            });
    }, [])

    const doHomeWork = (homeWorkId, file) => {
        localStorage.setItem('classId', id);
        localStorage.setItem('file', file);
        // console.log(homeWorkId);
        navigate(`/doHomeWork/${homeWorkId}`);
    }
    const [selected, setSelected] = useState(0)
    return (
        <div id="homework">
            <div className="heading">Bài tập</div>
            <div>
                <div className='find-homework'>
                    <div>
                        <form>
                            <input type='text' placeholder="Tìm kiếm ..." />
                            <i className='bx bx-search'></i>
                        </form>
                    </div>
                    <div><DropDown></DropDown></div>
                </div>
                <div className='list-homework'
                    onClick={() => setIsActive(!isActive)}
                >
                    {homeWorks.map((item, index) => {
                        return (
                            <div className='item-homework' key={index}
                                onClick={() => setSelected(index)}
                            >
                                <div>
                                    <div>
                                        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png' />
                                    </div>
                                    <div style={{ minWidth: '10rem' }}>{item.ExerciseName}</div>
                                    {/* <p>{item.statusExercise}</p> */}
                                    <div style={{ marginLeft: '30rem' }}>{(
                                        new Date(item.startingDay).getTime() - new Date().getTime()) > 0 ? <span style={{ color: 'yellow' }}>Chưa đến ngày làm</span> :
                                        new Date(item.deadline).getTime() - new Date().getTime() > 0 && item.fileUpload === null ? <span style={{ color: 'red' }}>Chưa làm</span> :
                                            new Date(item.deadline).getTime() - new Date().getTime() < 0 && item.fileUpload === null ? <span style={{ color: 'red' }}>Qúa thời hạn làm bài</span> : <span style={{ color: 'green' }}>Đã hoàn thành</span>}
                                    </div>
                                </div>
                                {isActive && selected === index && (
                                    <div className='detail-homework'>
                                        <table className="table table-bordered table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Status</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Bắt đầu</td>
                                                    <td>{item.startingDay}</td>
                                                </tr>
                                                <tr>
                                                    <td>Hạn chót</td>
                                                    <td>{item.deadline}</td>
                                                </tr>
                                                {
                                                    new Date(item.startingDay).getTime() - new Date().getTime() < 0 &&
                                                    new Date(item.deadline).getTime() - new Date().getTime() > 0 &&
                                                    <tr>
                                                        <td colSpan="2"><button onClick={() => doHomeWork(item.ExerciseId, item.ExerciseFile)}>Vào làm bài</button></td>
                                                        {/* <td>{item.statusExercise}</td> */}
                                                    </tr>
                                                    // : ''
                                                }

                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}