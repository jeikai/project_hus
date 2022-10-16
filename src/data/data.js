import axios from "axios";

const data = [
    {
        icon: <i className='bx bxs-customize'></i>,
        heading: "Lớp học hôm nay",
        array: [],
    },

    {
        icon: <i className='bx bx-notepad' ></i>,
        heading: "Bài tập chưa làm",
        array: ["Tên bài tập", "Lớp", "Status"],
    },

    {
        icon: <i className='bx bx-receipt'></i>,
        heading: "Tài liệu chưa đọc",
        array: ["Tên tài liệu", "Lớp", "Ngày đăng"],
    },

    {
        icon: <i className='bx bx-video' ></i>,
        heading: "Bài giảng chưa xem",
        array: ["Tên bài giảng", "Lớp", "Ngày đăng"],
    },
    {
        icon: <i className='bx bx-objects-vertical-bottom'></i>,
        heading: "Thành tích",
        array: ["Tên lớp", "Giáo viên", "ĐTB"],
    }
]
export default data;