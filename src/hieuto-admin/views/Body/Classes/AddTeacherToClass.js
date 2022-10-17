import React from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';

class AddTeacherToClass extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            classId: this.props.classId,
            Emails: '',
        }
    }

    handleChangeEmail = (event)=>{
        this.setState({Emails: event.target.value});
    }

    handleSubmit = async (event) =>{
        event.preventDefault();
        let {Emails, classId} = this.state;
        let email = Emails.split(/\n| /);;
        let emails = ({"emails":email})
        let idToast = toast.loading("Please wait!");
        let response =  await axios.post(`http://localhost:8000/database/data/handleDetailClasses.php/${classId}/teacher`, emails, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });                           
        if(response.data.status === 0) {
            toast.update(idToast, {render: response.data.message, type: "error", isLoading: false, autoClose: true, closeButton: true});
            return;
            
        }else if(response.data.status === 1) {
            // this.props.navigate("/AddUsers");
            this.setState({
                    Emails: '',
                });
                toast.update(idToast, {render: response.data.message, type: "success", isLoading: false,autoClose: true, closeButton: true});
        }else{
            toast.update(idToast, {render: "Something went wrong!!!", type: "error", isLoading: false, autoClose: true, closeButton: true});

        }

    }

    render(){
        // console.log(user);
        return (
            <>
                <div  className={this.props.active ? "myModal active9 modal show" : "myModal modal show"} id="addModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Add Teacher</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"
                        onClick={this.props.hide}
                        aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={(e) => this.handleSubmit(e)} >
                            <div className="mb-4">
                            <label htmlFor="" className="mb-2" >Teacher Email: </label>
                            <textarea rows="5" required type="text" name="description"
                                value={this.state.Emails}
                                onChange={(event) => this.handleChangeEmail(event)}
                                className="form-control col-lg-8" 
                                placeholder="Example: abc@gmail.com xyz@gmail.com 
Or: abc@gmail.com 
xyz@gmail.com" />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary"
                                onClick={this.props.hide} onChange={(event)=>this.handeleOnChange(event)}
                                data-bs-dismiss="modal">Close</button>
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
}

export default AddTeacherToClass;