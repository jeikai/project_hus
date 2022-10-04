import './member.css'
export default function Member() {
    return(
        <div id="member">
            <div className="heading">
                <p>Thành viên lớp học (1)</p>
            </div>
            <div className="find-member">
                    <form>
                        <button><i class='bx bx-search'></i></button>
                        <input type='text' placeholder="Nhập và ấn enter để tìm kiếm"/>
                    </form>
                <button>Thêm học sinh</button>
            </div>
            <div className='list-member'>
                <table>
                    <thead>
                        <tr>
                            <th>Họ và tên</th>
                            <th>Trường</th>
                            <th>Lớp</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div>
                                    <img src='https://i.pinimg.com/originals/62/ae/fb/62aefb044922a5a847546e30b9036913.jpg' />
                                </div>
                                <p>Đặng Cường</p>
                            </td>
                            <td>THPT LQD</td>
                            <td>12</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}