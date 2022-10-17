import React from "react";
import './styles.css';
import axios from "axios";
import {toast} from 'react-toastify';

class TeacherLogin extends React.Component {
    state = {
        input: {}
     }
 
     handleOnChange =(event)=>{
         this.setState({
            input:  ({...this.state.input, [event.target.name]: event.target.value}),
         });
     }
     handleSubmit =async (event)=>{
        event.preventDefault();
        let {input} = this.state;
        Object.keys(input).forEach(k => input[k] = input[k].trim());
        let input_undefined_null = (input.email === undefined || input.password === undefined ) ||
            (input.email === "" || input.password === "");
        
        if(input_undefined_null ){
            toast.error("Please enter all fields");
            return;
        }
        let response = await axios.post(`http://localhost:8000/database/data/handleTeacherLogin.php`, input,{
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })

            
        if(response.data !== 0 && typeof response.data !== 'string') {

            this.setState({
                input:  {}
             });
             localStorage.setItem('name', response.data.teacherName)
             localStorage.setItem('email', response.data.email)
             localStorage.setItem('studentId', response.data.teacherId)
             if(response.data.email === "rabiloo1@gmail.com" && response.data.teacherPassword === "rabiloo" ){
                localStorage.setItem('role', 2)
             }else{
                localStorage.setItem('role', 1)
             }
             window.location.replace("http://localhost:3000/");


        }else if(response.data === 0){
            console.log(response.data);
            toast.error("Wrong email or password");
            return;
        }
        else{
            toast.error("Something went wrong!!");
        }

     }

    render() {
        return (
            <>
            <div className="TeacherLoginBg">
                <div className="container ">
                    <div className="row justify-content-center mt-5">
                        <div className="col-md-6">
                            <div className="card shadow-lg ">
                                <div className="card-body">
                                    <form onSubmit={(event) => this.handleSubmit(event)}>
                                        <div className="mt-5 TeacherLoginBorderImg ">
                                            <img className="TeacherLoginImg" src="https://rabiloo.com/images/about/Union_logo.svg" alt="..."/>
                                        </div>
                                        <div className="my-2 TeacherWellcomeText">
                                            Wellcome Back Teacher  
                                        </div>
                                        <div className="mb-3 mx-auto w-75">
                                            <label className="form-label">Email address</label>
                                            <input type="email" name="email" className="form-control"
                                            value={this.state.input.email ?? ""}
                                            onChange={(event) => this.handleOnChange(event)}
                                            placeholder="Enter your email"/>
                                        </div>
                                        <div className="mb-4 mx-auto w-75">
                                            <label className="form-label">Password</label>
                                            <input type="password" name="password" className="form-control"
                                            onChange={(event) => this.handleOnChange(event)}
                                            value={this.state.input.password ?? ""}
                                            autoComplete = "none"
                                            placeholder="Enter password"/>
                                        </div>
                                        <div className="row w-75 mx-auto mb-5">
                                            <button type="submit" name="login_btn" className="btn btn-primary">Login</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
        </>
        )
    }
}

export default TeacherLogin;