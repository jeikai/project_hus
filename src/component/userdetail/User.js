import axios from 'axios'
import { useEffect, useState } from 'react'
import './user.css'

export default function User() {
	const id = localStorage.getItem('studentId')
	const [student, setStudent] = useState({
		studentName: '',
        email: '',
        studentPassword: '',
		birthDate: '',
		phoneNumber:'',
		studentImage: '',
	})	
	useEffect(() => {
		axios.get(`http://localhost:8000/database/user.php/${id}`)
			.then(function(response){
				console.log(response.data);
				setStudent({...student,
					studentName: response.data[0].studentName,
					email: response.data[0].email,
					studentPassword: '',
					birthDate: response.data[0].birthDate,
					phoneNumber: response.data[0].phoneNumber,
					studentImage: response.data[0].studentImage
				});
			});    
}, [])



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
											<img src={student.studentImage === "" || student.studentImage === undefined ? "https://bootdey.com/img/Content/avatar/avatar7.png" : 
											"/assets/studentImgs/"+ student.studentImage
											} alt="..." />
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
											<label htmlFor="fullName">Full Name</label>
											<input value={student.studentName} 
											onChange={(event) => setStudent({...student, studentName: event.target.value})}
											type="text" className="form-control" name="fullName" placeholder="Enter full name" />
										</div>
									</div>
									<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
										<div className="form-group">
											<label htmlFor="eMail">Email</label>
											<input value={student.email}
											onChange={(event) => setStudent({...student, email: event.target.value})}
											type="email" className="form-control" name="eMail" placeholder="Enter email ID" />
										</div>
									</div>
									<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
										<div className="form-group">
											<label htmlFor="phone">Phone</label>
											<input value={student.phoneNumber}
											onChange={(event) => setStudent({...student, phoneNumber: event.target.value})}
											type="text" className="form-control" name="phone" placeholder="Enter phone number" />
										</div>
									</div>
									<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
										<div className="form-group">
											<label htmlFor="website">Image</label>
											<input type="file"
											 className="form-control" name="website" placeholder="Website url" />
										</div>
									</div>
									<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
										<div className="form-group">
											<label htmlFor="website">DOB</label>
											<input value={student.birthDate} type="DATE"
											onChange={(event) => setStudent({...student, img: event.target.files[0]})}
											className="form-control" name="website" placeholder="dob" />
										</div>
									</div>
									<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
										<div className="form-group">
											<label htmlFor="website">Old Password</label>
											<input type="password" className="form-control"
											onChange={(event) => setStudent({...student, OldPassword: event.target.value})}
											name="website" placeholder="Old password" />
										</div>
									</div>
									<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
										<div className="form-group">
											<label htmlFor="website">New Password</label>
											<input type="password" className="form-control"
											onChange={(event) => setStudent({...student, NewPassword: event.target.value})}
											name="website" placeholder="New Password" />
										</div>
									</div>
								</div>

								<div className="row gutters">
									<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
										<div className="text-right mt-3 float-end">
											<button type="button" id="submit" name="submit" className="btn btn-primary">Update</button>
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