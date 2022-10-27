import axios from "axios"
import { useState } from "react"
import { toast } from "react-toastify"

export default function ModalFindClas(props) {
    const [inputClass, setInputClass] = useState()
    let element = {
        id: inputClass
    }
    const [className, setClassName] = useState('') 
    const getFindClass = async () => {
        await axios.post(`https://test.modnro.xyz/database/data_1/handleFindClass.php`, element, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(function (response) {
                console.log(response.data[0])
                setClassName(response.data[0].className)
            })
    }

    const getJoinClass = async () => {
        let element = {
            studentId: localStorage.getItem('studentId'),
            classId: inputClass
        }
        await axios.post(`https://test.modnro.xyz/database/data_1/handleJoinClass.php`, element, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(function (response) {
                console.log(response.data)
                if(response.data === 'exists'){
                    toast.error('You already have class')
                }else if(response.data === 'error'){
                    toast.error('Can not join class')
                }else{
                    toast.success('Join success')
                    props.selectAllClass()
                    props.setActive(!props.active)
                }
            })
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(inputClass);
        getJoinClass()
    }

    return (
        <>
            <div className={props.active ? "myModal active9 modal show" : "myModal modal show"} id="addModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Find Class</h5>
                            <button onClick={() => props.setActive(!props.active)} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Find Class By Id</label>
                                    <input onChange={(e) => setInputClass(e.target.value) } type="text" name="Name" className="form-control" required/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Find Class By Id</label>
                                    <input value={className} readOnly disabled type="text" name="Name" className="form-control"/>
                                </div>
                                <div className="modal-footer">
                                <button type="button" className="btn btn-secondary"
                                onClick={getFindClass} data-bs-dismiss="modal">Tìm</button>
                                <button type="submit" name="add-admin-btn" className="btn btn-primary">JOIN</button>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}