import { useParams } from 'react-router-dom'
import './newsfeed.css'
export default function NewsFeed() {
    const id = useParams();
    // console.log(id);
    return(
        <div id="newsfeed">
            <div className='contentNewsFeed'>
                <div className='heading'>Bảng tin</div>
                <div className='wrap'>
                    <div className='inputInfo'>
                        <div>
                            <img src='https://i.pinimg.com/originals/62/ae/fb/62aefb044922a5a847546e30b9036913.jpg' />
                        </div>
                        <div>
                            <textarea placeholder='Nhập nội dung và thảo luận với lớp học'></textarea>
                        </div>
                    </div>
                    <div></div>
                    <div>
                        <input type='button' value='Chọn tệp'/>
                        <input type='button' value='Đăng tin'/>
                    </div>
                    
                    <div className='divi'></div>
                    <div className='content'>
                        <div className='content-heading'>
                            <div>
                                <div>
                                    <img src='https://i.pinimg.com/originals/62/ae/fb/62aefb044922a5a847546e30b9036913.jpg' />
                                </div>
                                <div>
                                    <p>Họ và tên</p>
                                    <span>Thời gian</span>
                                </div>
                            </div>
                            <div><i class='bx bx-dots-vertical-rounded'></i></div>
                        </div>
                        <div className='content-img'>
                            <div>
                                <p className='content-text'>123456</p>
                                <img src='https://i.pinimg.com/originals/62/ae/fb/62aefb044922a5a847546e30b9036913.jpg' />
                            </div>
                            <div>
                               <i class='bx bx-message-rounded-minus'></i>
                               <span>0 bình luận</span>
                            </div>
                        </div>
                        <div className='content-input'>
                            <form>
                                <div>
                                    <img src='https://i.pinimg.com/originals/62/ae/fb/62aefb044922a5a847546e30b9036913.jpg' />
                                </div>
                                <div>
                                    <input type='text' placeholder='Viết bình luận ...'/>
                                </div>
                            </form>
                            <div>
                                <ul>
                                    <li>
                                        <div>
                                            <img src='https://i.pinimg.com/originals/62/ae/fb/62aefb044922a5a847546e30b9036913.jpg' />
                                        </div>
                                        <div>
                                            <p>Dang van cuong sdfd12315487984531132132465487897</p>
                                            <span>title</span>
                                        </div>
                                        <div><i class='bx bx-dots-horizontal-rounded' ></i></div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='infoNewsFeed'>
                <div className='heading'>Thông báo từ giáo viên</div>
                <div></div>
            </div>
        </div>
    )
}