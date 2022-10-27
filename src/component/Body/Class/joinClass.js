export default function JoinClass(props) {
    const handleSubmit = () => {
        console.log();
    }
    return (
<>
            <div className={props.activeJoin ? "myModal active9 modal show" : "myModal modal show"} id="addModal" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Find Class</h5>
                            <button onClick={() => props.setActiveJoin(!props.activeJoin)} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Class Id</label>
                                    <input value={()=> props.classValue.classId === undefined ? '' : props.classValue.classId} type="text" name="Name" className="form-control" disabled readOnly required/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Class Name</label>
                                    <input value={localStorage.getItem('className')} type="text" name="Name" className="form-control" disabled readOnly required/>
                                </div>
                                <div className="modal-footer">
                                <button type="button" className="btn btn-secondary"
                                onClick={() => props.setActiveJoin(!props.activeJoin)} data-bs-dismiss="modal">Close</button>
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