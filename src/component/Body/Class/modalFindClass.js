import { useState } from "react"

export default function ModalFindClas(props) {

    const [inputClass, setInputClass] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault()
        props.setActive(!props.active)
        props.setActiveJoin(!props.activeJoin)
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
                                    <input type="text" name="Name" className="form-control" required/>
                                </div>
                                <div className="modal-footer">
                                <button type="button" className="btn btn-secondary"
                                onClick={() => props.setActive(!props.active)} data-bs-dismiss="modal">Close</button>
                                <button type="submit" name="add-admin-btn" className="btn btn-primary">Submit</button>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}