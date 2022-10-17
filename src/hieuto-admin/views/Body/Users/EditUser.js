import React from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
import './AddUser.css';

class EditUser extends React.Component {

    state = {
        input: {}
     }
 
     handeleOnChange =(event)=>{
         this.setState({
            input:  ({...this.state.input, [event.target.name]: event.target.value})
         });
     }

     componentDidMount(){
        this.setState({
            input:  ({...this.props.user, cfPassword: this.props.user.Password})
         });
     }

     handleSubmit = async (event) => {
        event.preventDefault();
        let {input} = this.state;
        Object.keys(input).forEach(k => input[k] = input[k].toString().trim());
        let {Name, Phone, Email, Password, cfPassword, trueId} = input;
        let input_undefined_null = (Name === undefined || Phone === undefined || Email === undefined || 
            Password === undefined || cfPassword === undefined) ||
                (Name === "" || Phone === "" || Email === "" || 
                Password === "" ||cfPassword === "")
    
        
        if(input_undefined_null ){
            toast.error("Please enter all fields");
            return;
        }
        else if(cfPassword !== Password ){
            toast.error("Confirm password are different to password!");
            return;
        }

        let idToast = toast.loading("Please wait!");
        let response =  await axios.put(`http://localhost:8000/database/data/handleStudent.php/${trueId}`, input);
        if(response.data.status === 0) {
            toast.update(idToast, {render: response.data.message, type: "error", isLoading: false, autoClose: true, closeButton: true});
            return;
            
        }else if(response.data.status === 1) {
            // this.props.navigate("/AddUsers");
            this.setState({
                input:  {}
             });
             this.props.handleReloadEdit();
             toast.update(idToast, {render: response.data.message, type: "success", isLoading: false,autoClose: true, closeButton: true});
        }else{
            toast.update(idToast, {render: "Something went wrong!!!", type: "error", isLoading: false, autoClose: true, closeButton: true});
        }


     }

   
    render(){
        let {input} = this.state;

        return (
            <>
                <div  className={this.props.active ? "myModal active9 modal show" : "myModal modal show"} id="addModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Edit {input.Role ? input.Role : "" }</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"
                        onClick={this.props.hide}
                        aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={(e)=>{this.handleSubmit(e)}} >
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input type="text" name="Name" className="form-control" required
                                value={input.Name ? input.Name : ""}
                                 onChange={(event)=>this.handeleOnChange(event)}
                                placeholder={"Enter " +input.Role + " name"}/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Phone</label>
                                <input type="tel" name="Phone" className="form-control" required
                                value={input.Phone ? input.Phone : ""} onChange={(event)=>this.handeleOnChange(event)}
                                placeholder="Enter admin phone number"/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email address</label>
                                <input type="email" name="Email" className="form-control" required
                                value={input.Email ? input.Email : ""} onChange={(event)=>this.handeleOnChange(event)}
                                placeholder="Enter admin email"/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input type="password" name="Password" className="form-control" autoComplete="off" required
                                value={input.Password ? input.Password: ""} onChange={(event)=>this.handeleOnChange(event)}
                                placeholder="Enter password"/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Confirm Password</label>
                                <input type="password" name="cfPassword" className="form-control" autoComplete="off" required
                                value={input.cfPassword ? input.cfPassword : ""} onChange={(event)=>this.handeleOnChange(event)}
                                placeholder="Confirm password"/>
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




export default EditUser;