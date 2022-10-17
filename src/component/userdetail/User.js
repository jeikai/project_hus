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
			<div className="container">
				<div className="row gutters">
					<div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
						<div className="card h-100">
							<div className="card-body">
								<div className="account-settings">
									<div className="user-profile">
										<div className="user-avatar">
											<img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Maxwell Admin" />
										</div>
										<h5 classNameName="user-name">{student.studentName}</h5>
										<h6 className="user-email">{student.email}</h6>
									</div>
									<div className="about">
										<h5>About</h5>
										<p>I'm Yuki. Full Stack Designer I enjoy creating user-centric, delightful and human experiences.</p>
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
											<label for="fullName">Full Name</label>
											<input value={student.studentName} type="text" className="form-control" name="fullName" placeholder="Enter full name" />
										</div>
									</div>
									<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
										<div className="form-group">
											<label for="eMail">Email</label>
											<input value={student.email} type="email" className="form-control" name="eMail" placeholder="Enter email ID" />
										</div>
									</div>
									<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
										<div className="form-group">
											<label for="phone">Phone</label>
											<input value={student.phoneNumber} type="text" className="form-control" name="phone" placeholder="Enter phone number" />
										</div>
									</div>
									<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
										<div className="form-group">
											<label for="website">Image</label>
											<input type="file" className="form-control" name="website" placeholder="Website url" />
										</div>
									</div>
									<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
										<div className="form-group">
											<label for="website">DOB</label>
											<input value={student.birthDate} type="DATE" className="form-control" name="website" placeholder="dob" />
										</div>
									</div>
									<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
										<div className="form-group">
											<label for="website">Old Password</label>
											<input type="password" className="form-control" name="website" placeholder="Old password" />
										</div>
									</div>
									<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
										<div className="form-group">
											<label for="website">New Password</label>
											<input type="password" className="form-control" name="website" placeholder="New Password" />
										</div>
									</div>
								</div>

								<div className="row gutters">
									<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
										<div className="text-right mt-3 float-end">
											<button type="button" id="submit" name="submit" className="btn btn-secondary mx-3">Cancel</button>
											<button type="button" id="submit" name="submit" className="btn btn-primary">Update</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}