import React from 'react';
import axios from 'axios';
import withRouter from '../../HOC/withRouter';
import {toast} from 'react-toastify';

class AddUser extends React.Component {

    state = {
       input: {}
    }

    handleOnChange =(event)=>{
        this.setState({
           input:  ({...this.state.input, [event.target.name]: event.target.value}),
        });
    }

    // componentDidUpdate = (event)=>{
    //     console.log(this.state.input);
    // };

    handleSubmit = async (event)=>{
        event.preventDefault();
        let {input} = this.state;
        Object.keys(input).forEach(k => input[k] = input[k].trim());
        let {name, phone, email, password, status, cfpassword} = input;
        let input_undefined_null = (name === undefined || phone === undefined || email === undefined || 
                password === undefined || status === undefined || cfpassword === undefined) ||
                (name === "" || phone === "" || email === "" || 
                password === "" ||cfpassword === "")
    
        
        if(input_undefined_null ){
            toast.error("Please enter all fields");
            return;
        }
        else if(cfpassword !== password ){
            toast.error("Confirm password are different to password!");
            return;
        }

        let idToast = toast.loading("Please wait!");
        let response =  await axios.post(`http://localhost:8000/database/data/handleStudent.php`, input);
        if(response.data.status === 0) {
            toast.update(idToast, {render: response.data.message, type: "error", isLoading: false, autoClose: true, closeButton: true});
            return;
            
        }else if(response.data.status === 1) {
            // this.props.navigate("/AddUsers");
            this.setState({
                input:  {}
             });
             toast.update(idToast, {render: response.data.message, type: "success", isLoading: false,autoClose: true, closeButton: true});
        }else{
            toast.update(idToast, {render: "Something went wrong!!!", type: "error", isLoading: false, autoClose: true, closeButton: true});
        }
    }

    render(){
        let {name, phone, email, password, status, cfpassword} = this.state.input;

        return(
            <>
                <div className='m-5 my-container2'>
                    <div className='row'>
                        <div className='col-12'>
                            <div className='card'>
                                <div className='card-header'>
                                    <h5>Add Users</h5>
                                </div>
                                <form onSubmit={(e)=>{this.handleSubmit(e)}}>
                                <div className='card-body'>
                                    <div className='row mb-3'>
                                        <div className='col-md-12 w-50'>
                                            <label htmlFor="" className="mb-2">Name</label>
                                            <input type="text" required name="name" 
                                            className="form-control" 
                                            placeholder="Enter user name"
                                            value={name? name : ''}
                                            onChange={(event) => this.handleOnChange(event)}
                                            />
                                        </div>
                                        <div className='col-md-12  w-50'>
                                        <label htmlFor="" className="mb-2">Phone</label>
                                            <input type="tel" required name="phone" 
                                            value={phone? phone : ''}
                                            onChange={(event) => this.handleOnChange(event)}
                                            className="form-control" placeholder="Enter user phone"/>
                                        </div>
                                    </div>
                                    <div className='row mb-3'>
                                        <div className='col-md-12 w-50'>
                                        <label htmlFor="" className="mb-2">Email</label>
                                            <input type="email" required name="email" 
                                            value={email? email : ''}
                                            onChange={(event) => this.handleOnChange(event)}
                                            className="form-control" placeholder="Enter user email"/>
                                        </div>
                                        <div className='col-md-12  w-50'>
                                        <label htmlFor="" className="mb-2" >Password</label>
                                            <input type="password" required name="password" autoComplete="off"
                                            value={password? password : ''}
                                            onChange={(event) => this.handleOnChange(event)}
                                            className="form-control" placeholder="Enter user password"/>
                                        </div>
                                    </div>
                                    <div className='row mb-3'>
                                        <div className='col-md-12  w-50'>
                                            <label htmlFor="" className="mb-2">Role As</label>
                                            <select name="status" id="" required className="form-select form-select-md w-2 "
                                            value={status ? status : ''}
                                            onChange={(event) => this.handleOnChange(event)} >
                                                <option  defaultValue hidden
                                                value=''>----Select category----</option>
                                                <option value="students">Student</option>
                                                <option value="teachers">Teacher</option>
                                            </select>
                                        </div>
                                        <div className='col-md-12  w-50'>
                                        <label htmlFor="" className="mb-2">Confirm Password</label>
                                            <input type="password" required name="cfpassword" autoComplete="off"
                                            value={cfpassword? cfpassword : ''}
                                            onChange={(event) => this.handleOnChange(event)}
                                            className="form-control" placeholder="Enter confirm password"/>
                                        </div>
                                    </div>
                                    
                                        <button  type="submit" className="btn btn-primary float-end mb-3"
                                           
                                        name="add_users_btn">Submit</button>
                                        
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

export default withRouter(AddUser);