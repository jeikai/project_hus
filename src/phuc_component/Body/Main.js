import './Main.css'
import { Link } from 'react-router-dom';
import { useState } from 'react';
function Main() {
    const [login, setLogin] = useState({
        mail: localStorage.getItem('email'),
        name: localStorage.getItem('name'),
        id: localStorage.getItem('teacherId')
    })
    return (
        <>
        <div className='body_main'>
            <h2 className='welcome neonText'>WELCOME</h2>
        </div>
        </>
    )
}

export default Main;