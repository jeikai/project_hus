import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react'
import ViewFile from "./viewFile";
import './doHomeWork.css'
import { toast } from "react-toastify";
export default function DoHomeWork(){
    const id = useParams().id
    const navigate = useNavigate()
    const classId = localStorage.getItem('classId');
    console.log(classId);

    const [isActive, setIsActive] = useState(undefined)
    // const [data, setData] = useState(null)
    const [viewPdf, setViewPdf] = useState(
        () => localStorage.getItem('file')
    )
    console.log(viewPdf);
    // useEffect(() => {
    //         axios.get(`http://localhost:8000/database/doHomeWork.php/${id}`,)
    //             .then(function(response){
    //                 console.log(response.data[0].ExerciseFile)
    //                 setViewPdf(response.data[0].ExerciseFile)
    //             });    
    // }, [])
    // console.log(viewPdf);
    // setViewPdf()
    const [inputFile, setInputFile] = useState()
    const handleSubmit = async (e) => {
        e.preventDefault();
        // const form = e.target;
        // const formData = new FormData(form);
        // console.log(inputFile)
        let element = {
            "exerciseId": id,
            "studentId": localStorage.getItem("studentId"),
            "file": inputFile
        }
        await axios.post(`http://localhost:8000/database/doHomeWork.php`, element, {
            headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
              .then(function(response){
                    console.log(response.data)
                    // setViewPdf(response.data)
                    toast.success('Upload successfully')
                    setTimeout(()=> {
                        // navigate(`/class/${classId}`)
                        // window.history.back()
                        // window.location.href = `class/${classId}`
                        window.history.back()
                    }, 10000)
                    
                    }) 
                    // navigate(`/News`)
    }
    return (
        <section id="doHomeWork">
            <div className="viewFilePdf">
                <ViewFile setIsActive={setIsActive} viewPdf={viewPdf} />
            </div>
            <div className="upFilePdf">
                <form onSubmit={handleSubmit}>
                    <div>
                        <input type="file" name="file" className="form-control" onChange={(e)=> setInputFile(e.target.files[0])} />
                    </div>
                    <div>
                        <button type="submit">Upload</button>
                    </div>
                </form>
            </div>
        </section>
    )
}