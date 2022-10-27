import { useState, useEffect } from 'react'
import axios from 'axios';
export default function NumberStudent(props) {
    const id = props.id;
    const [AllStudent, setAllStudent] = useState([]);
    useEffect(() => {
            axios.get(`https://test.modnro.xyz/database/handleStudent.php/${id}`)
                 .then(function(response){
                    console.log(response.data);
                    setAllStudent(response.data);
                });    
    }, []);
    return (
        <div>

                <p>{AllStudent}</p>

        </div>
    )
}