import { useState } from 'react'
import DropDown from './../../../DropDown'
import './homeWork.css'
export default function HomeWork() {
    const [isActive, setIsActive] = useState(false);
    return(
        <div id="homework">
            <div className="heading">Bài tập</div>
            <div>
                <div className='find-homework'>
                    <div>
                        <form>
                            <input type='text' placeholder="Tìm kiếm ..."/>
                            <i class='bx bx-search'></i>
                        </form>
                    </div>
                    <div><DropDown></DropDown></div>
                </div>
                <div className='list-homework'
                    onClick={() => setIsActive(!isActive)}
                >
                    <div className='item-homework'>
                        <div>
                            <div>
                                <img src='https://i.pinimg.com/originals/62/ae/fb/62aefb044922a5a847546e30b9036913.jpg' />
                            </div>
                            <p>Teen bai</p>
                            <p>Status</p>
                        </div>
                    </div>
                    {isActive && (
                        <div className='detail-homework'>
                            <div>Status</div>
                            <div>
                                <p></p>
                                <div className='detail'>
                                    <span>Ngay tao</span>
                                    <span> 12/3</span>
                                </div>
                                <div className='detail'>
                                    <span>Bat dau</span>
                                    <span> 12/3</span>
                                </div>
                                <div className='detail'>
                                    <span>Han chot</span>
                                    <span> 12/3</span>
                                </div>
                                <div className='detail'>
                                    <span>Thoi gian</span>
                                    <span> 12/3</span>
                                </div>
                            </div>
                            <button>Vao lam bai</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}