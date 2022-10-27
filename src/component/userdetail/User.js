import axios from 'axios'
import './user.css'
import React, { useEffect, useState } from 'react';
import {toast} from 'react-toastify';
import Login from '../../login/Login';

class User extends React.Component {	

	constructor(props) {
        super(props);

        this.state = {
            id: localStorage.getItem('studentId'),
            studentName: "",
            email: "",
            old_image: "",
            studentCurrentPassword: "",
            birthDate: "",
			phoneNumber: "",
			file: "",
			fileName: "",
			studentPassword: "",
			studentNewPassword: "",
        }
    }

	getStudent = async ()  =>{
        let result = await axios.get(`https://test.modnro.xyz/database/data/handleUpdateStudent.php/${this.state.id}`);
        this.setState({
            studentName: result.data.studentName,
            email: result.data.email,
			old_image: result.data.studentImage,
			studentCurrentPassword: result.data.studentPassword,
			birthDate: result.data.birthDate,
			phoneNumber: result.data.phoneNumber,
        })
		console.log(result.data);
    }

	componentDidMount(){
        this.getStudent();
    }

	handleSubmit = async (event) => {
		event.preventDefault();
		let {id, studentName, email, old_image, file,
			 studentCurrentPassword, birthDate, phoneNumber,studentPassword,  studentNewPassword} =this.state;
		studentName = studentName.trim();
		email = email.trim();
		// phoneNumber = phoneNumber.trim();
		studentCurrentPassword = studentCurrentPassword.trim();
		studentPassword = studentPassword.trim();
		studentNewPassword = studentNewPassword.trim();


		if(studentPassword === '' || studentPassword === null){
			toast.error('Please enter your current password to update!');
			return;
		}
		if(studentPassword !== studentCurrentPassword){
			toast.error(`Your passowrd doesn't match!`);
			return;
		}
		if(studentName === '' || studentName === null || email === '' || email === null){
			toast.error('Your name or email must be filled');
			return;
		}

		let inputs = ({id, old_image, file, phoneNumber, birthDate, studentNewPassword, studentName, email});

		let idToast = toast.loading("Please wait!");
        let response =  await axios.post(`https://test.modnro.xyz/database/data/handleUpdateStudent.php/update`,
			inputs, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              });


        if(response.data.status === 0) {
            toast.update(idToast, {render: response.data.message, type: "error", isLoading: false, autoClose: true, closeButton: true});
            return;
            
        }else if(response.data.status === 1) {
			
				localStorage.setItem('img', file.name);
				
				this.props.setImg(true);
				this.setState({
					studentName: "",
					email: "",
					old_image: "",
					studentCurrentPassword: "",
					birthDate: "",
					phoneNumber: "",
					file: "",
					fileName: "",
					studentPassword: "",
					studentNewPassword: "",
				})


                this.getStudent();
                toast.update(idToast, {render: response.data.message, type: "success", isLoading: false,autoClose: true, closeButton: true});
        }else{
            toast.update(idToast, {render: "Something went wrong!!!!", type: "error", isLoading: false, autoClose: true, closeButton: true});
        }
			
	

		
	}

	handleOnChangeInput = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
		if(event.target.name === "file"){
			this.setState({
				[event.target.name]: event.target.files[0],
				fileName: event.target.value
			});
		}
	}

	render(){
		console.log(this.state);
		return (
			<section>
				<form onSubmit={(event)=>this.handleSubmit(event)}>
				<div className="container student-user-detail">
					<div className="row gutters">
						<div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
							<div className="card h-100">
								<div className="card-body">
									<div className="account-settings">
										<div className="user-profile">
											<div className="user-avatar">
											<h4 className="my-5" style={{color: "#5b6efd"}}>Your current Img is:</h4>
												<img src={this.state.old_image === undefined || this.state.old_image.trim() === "" 
												? "/assets/studentImgs/defaultStudentImg.jpg": "/assets/studentImgs/" + this.state.old_image} 
												alt="..." />
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
							<div className="card h-100">
								<div className="card-body">
									<div className="row gutters">
										<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
											<h6 className="mb-2 text-primary">Personal Details</h6>
										</div>
										<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
											<div className="form-group">
												<label htmlFor="studentName">Full Name</label>
												<input  
												onChange={(event) => this.handleOnChangeInput(event)}
												name="studentName"
												value={this.state.studentName  ?? " "}
												type="text" className="form-control" placeholder="Enter full name" />
											</div>
										</div>
										<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
											<div className="form-group">
												<label htmlFor="email">Email</label>
												<input 
												onChange={(event) => this.handleOnChangeInput(event)}
												name="email"
												value={this.state.email  ?? " "}
												type="email" className="form-control" placeholder="Enter email ID" />
											</div>
										</div>
										<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
											<div className="form-group">
												<label htmlFor="phone">Phone</label>
												<input 
												onChange={(event) => this.handleOnChangeInput(event)}
												name="phoneNumber"
												value={this.state.phoneNumber  ?? " "}
												type="text" className="form-control" placeholder="Enter phone number" />
											</div>
										</div>
										<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
											<div className="form-group">
												<label htmlFor="website">Image</label>
												<input type="file"
												 className="form-control" name="file"
												 value={this.state.fileName  ?? ""}
												 onChange={(event) => this.handleOnChangeInput(event)}
												 placeholder="Website url" />
											</div>
										</div>
										<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
											<div className="form-group">
												<label htmlFor="website">DOB</label>
												<input type="DATE"
												name="birthDate"
												value={this.state.birthDate ?? undefined}
												onChange={(event) => this.handleOnChangeInput(event)}
												className="form-control"  placeholder="dob" />
											</div>
										</div>
										<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
											<div className="form-group">
												<label htmlFor="website">Old Password</label>
												<input type="password" className="form-control"
												name="studentPassword"
												value={this.state.studentPassword  ?? ""}
												autoComplete="off"
												onChange={(event) => this.handleOnChangeInput(event)}
												placeholder="Old password" />
											</div>
										</div>
										<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
											<div className="form-group">
												<label htmlFor="website">New Password</label>
												<input type="password" className="form-control"
												name="studentNewPassword"
												value={this.state.studentNewPassword ?? ""}
												autoComplete="off"
												onChange={(event) => this.handleOnChangeInput(event)}
												
												placeholder="New Password" />
											</div>
										</div>
									</div>
	
									<div className="row gutters">
										<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
											<div className="text-right mt-3 float-end">
												<button type="submit" id="submit" name="submit" className="btn btn-primary">Update</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				</form>
			</section>
		)
	}

	
}

export default User;