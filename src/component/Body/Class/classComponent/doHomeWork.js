import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react'
import ViewFile from "./viewFile";
import './doHomeWork.css'
import { toast } from "react-toastify";
import userEvent from "@testing-library/user-event";
export default function DoHomeWork() {
    const id = useParams().id
    const navigate = useNavigate()
    const classId = localStorage.getItem('classId');
    const [inputFile, setInputFile] = useState()

    const [isActive, setIsActive] = useState(undefined)
    const [viewPdf, setViewPdf] = useState(
        () => localStorage.getItem('file')
    )
    const [doneHomeWork, setDoneHomeWork] = useState()

    const getResultHomeWork = async () => {
        await axios.get(`http://localhost:8000/database/data_1/handleDoneHomeWork.php/${id}/${localStorage.getItem('studentId')}`)
            .then(function (response) {
                console.log(response.data);
                setDoneHomeWork(response.data);
            });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // getResultHomeWork()
        if (doneHomeWork.length === 1 && inputFile !== undefined) {
            let element = {
                "exerciseId": id,
                "studentId": localStorage.getItem("studentId"),
                "file": inputFile,
                "oldFile": doneHomeWork[0].fileUpload
            }
            await axios.post(`http://localhost:8000/database/data_1/handleDoneHomeWork.php`, element, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(function (response) {
                    console.log(response.data)
                    // setViewPdf(response.data)
                    toast.success('Updated successfully')
                    setTimeout(() => {
                        // navigate(`/class/${classId}`)
                    }, 1000)
                })
            return
        }
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
            .then(function (response) {
                console.log(response.data)
                // setViewPdf(response.data)
                toast.success('Upload successfully')
                setTimeout(() => {
                    navigate(`/class/${classId}`)
                }, 1000)
            })
    }


    useEffect(() => {
        getResultHomeWork()
    }, [])

    console.log(doneHomeWork);
    return (
        <section id="doHomeWork">
            <div className="viewFilePdf">
                <ViewFile setIsActive={setIsActive} viewPdf={viewPdf} />
            </div>
            <div className="upFilePdf">
                <form onSubmit={handleSubmit}>
                    <div>
                        <input type="file" name="file" className="form-control" onChange={(e) => setInputFile(e.target.files[0])} />
                    </div>
                    <div>
                        <button type="submit">Upload</button>
                    </div>
                </form>
            </div>
        </section>
    )
}