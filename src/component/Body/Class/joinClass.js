import axios from "axios";
import { toast } from "react-toastify";

export default function JoinClass(props) {
    const class_1 = props.findClass
    console.log(class_1);
    const handleSubmitJoin = async (e) => {
        e.preventDefault()
        let element = {
            studentId: localStorage.getItem('studentId'),
            classId: class_1.classId
        }

        await axios.post(`http://localhost:8000/database/data_1/handleCheckClass.php`, element ,{
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(function(response){
            console.log(response.data)
            if(response.data === 'success'){
                toast.success('Join successful')
                props.setActiveJoin(!props.activeJoin)
                props.reRenderClass()
            }else if(response.data === 'error'){
                toast.error('You are already in this class.')
            }
        })
    }
    return (
        <div className={props.activeJoin ? "myModal active9 modal show" : "myModal modal show"} id="addModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Class</h5>
                        <button onClick={() => props.setActiveJoin(!props.activeJoin)} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmitJoin}>
                            <div className="mb-3">
                                <label className="form-label">Class Id</label>
                                <input value={class_1.classId} type="text" name="Name" className="form-control" readOnly disabled required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Class Name</label>
                                <input value={class_1.className} type="text" name="Name" className="form-control" readOnly disabled required />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary"
                                    onClick={() => props.setActiveJoin(!props.activeJoin)} data-bs-dismiss="modal">Close</button>
                                <button type="submit" name="add-admin-btn" className="btn btn-primary">Join Class</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}