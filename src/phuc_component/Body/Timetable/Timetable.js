import { useState, useEffect } from 'react';
import Menu from '../Menu';
import './Timetable.css';
import '../Menu.css';
import axios from 'axios'; 
function Timetable() {
    const [login, setLogin] = useState({
        mail: localStorage.getItem('email'),
        name: localStorage.getItem('name'),
        id: localStorage.getItem('teacherId')
    })
    const [selected, setSelected] = useState(0);
    let day = [
        ['', '', '', '', '', '', '',],
        ['', '', '', '', '', '', '',],
        ['', '', '', '', '', '', '',],
        ['', '', '', '', '', '', '',],
        ['', '', '', '', '', '', '',],
        ['', '', '', '', '', '', '',],
        ['', '', '', '', '', '', '',],
        ['', '', '', '', '', '', '',],
        ['', '', '', '', '', '', '',],
        ['', '', '', '', '', '', '',],
        ['', '', '', '', '', '', '',],
    ];
    const data = [
    {
        start_time: '7:00',
        end_time: '8:00',
    },
    {
        start_time: '8:00',
        end_time: '9:00',
    },
    {
        start_time: '9:00',
        end_time: '10:00',
    },
    {
        start_time: '10:00',
        end_time: '11:00',
    },
    {
        start_time: '11:00',
        end_time: '12:00',
    },
    {
        start_time: '12:00',
        end_time: '13:00',
    },
    {
        start_time: '13:00',
        end_time: '14:00',
    },
    {
        start_time: '14:00',
        end_time: '15:00',
    },
    {
        start_time: '15:00',
        end_time: '16:00',
    },
    {
        start_time: '16:00',
        end_time: '17:00',
    },
    {
        start_time: '17:00',
        end_time: '18:00',
    },
    ];
    const [AllTime, setAllTime] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:8000/database/handleTimetable.php/${login.id}`,)
                .then(function(response){
                console.log(response.data);
                setAllTime(response.data);
            });    
    }, [])
    let date;
    let start, end;
    AllTime.map((item, index)=>{
        switch(item.DAY) {
            case "Thu 2":
                date = 0;
                break;
            case "Thu 3":
                date = 1;
                break;
            case "Thu 4":
                date = 2;
                break;
            case "Thu 5":
                date = 3;
                break;
            case "Thu 6":
                date = 4;
                break;
            case "Thu 7":
                date = 5;
                break;
            case "Chu nhat":
                date = 6;
                break;
            default:
                break;
        }
        switch(item.startLesson) {
            case "07:00:00":
                start = 0;
                break;
            case "08:00:00":
                start = 1;
                break;
            case "09:00:00":
                start = 2;
                break; 
            case "10:00:00":
                start = 3;
                break;
            case "11:00:00":
                start = 4;
                break;
            case "12:00:00":
                start = 5;
                break;
            case "13:00:00":
                start = 6;
                break;
            case "14:00:00":
                start = 7;
                break; 
            case "15:00:00":
                start = 8;
                break;
            case "16:00:00":
                start = 9;
                break;
            case "17:00:00":
                start = 10;
                break;
            default:
                break;
        }
        switch(item.endLesson) {
            case "08:00:00":
                end = 1;
                break;
            case "09:00:00":
                end = 2;
                break; 
            case "10:00:00":
                end = 3;
                break;
            case "11:00:00":
                end = 4;
                break;
            case "12:00:00":
                end = 5;
                break;
            case "13:00:00":
                end = 6;
                break;
            case "14:00:00":
                end = 7;
                break; 
            case "15:00:00":
                end = 8;
                break;
            case "16:00:00":
                end = 9;
                break;
            case "17:00:00":
                end = 10;
                break;
            case "18:00:00":
                end = 11;
                break;
            default:
                break;
        }
        for ( let pos = start; pos < end; pos++) {
            day[pos][date] = item.className + " - ID: " + item.classId;
        }
    })
    let i = 0;
    let j = 0;

  return (
    <section>
    <Menu/>
    <div className='body_teacher'>
    <table>
      <thead>
        <tr>
          <th>Giờ</th>
          <th>Thứ 2</th>
          <th>Thứ 3</th>
          <th>Thứ 4</th>
          <th>Thứ 5</th>
          <th>Thứ 6</th>
          <th>Thứ 7</th>
          <th>Chủ nhật</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index)=>{
            return ( 
        <tr>   
          <td>{item.start_time} - {item.end_time}</td>  
          <td>{day[i][j++]}</td>
          <td>{day[i][j++]}</td>
          <td>{day[i][j++]}</td>
          <td>{day[i][j++]}</td>
          <td>{day[i][j++]}</td>
          <td>{day[i][j++]}</td>
          <td>{day[i][j++]}</td>
          <td hidden>{i++}</td>
          <td hidden>{j = 0}</td>
        </tr>
            )
        })}
        
      </tbody>
    </table>
    </div>
    

    </section>
  );
}

export default Timetable;