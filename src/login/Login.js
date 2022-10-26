import axios from "axios";
import React, { useState } from "react";
 import * as Components from './Components';
 import { useNavigate } from "react-router-dom";
import './styles.css';
import { toast } from "react-toastify";
import { logDOM } from "@testing-library/react";
 function Login() {
     const navigate = useNavigate()
     const [signIn, toggle] = React.useState(true);
     const [user, setUser] = React.useState({
        email: '',
        password: ''
     });
     const setParams = (e) => {
        if(e.target.name === 'email') {
            setUser({...user, email: e.target.value });
        }
        if(e.target.name === 'password') {
            setUser({...user, password: e.target.value });
        }
     }
     
     const submitFormLogin = async (e) => {
        e.preventDefault()
        // console.log(user);
        // http://demoprohus.epizy.com/database/login.php
        await axios.post(`http://localhost:8000/database/login.php`, user,{
            // await axios.post(`https://demoprohus.epizy.com/database/login.php`, user,{
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(function(response){
            console.log(response.data[0]);
            if(response.data !== 0){
                localStorage.setItem('name', response.data[0].studentName)
                localStorage.setItem('email', user.email)
                localStorage.setItem('studentId', response.data[0].studentId)
                localStorage.setItem('img', response.data[0].studentImage)
                localStorage.setItem('role', 0)
                // window.location.replace("https://phucdepzai.vercel.app/");
                // http://localhost:3000/
                window.location.replace("http://localhost:3000");
            }
        })
    }
    const [register, setRegister] = useState({
        name: '',
        email: '',
        password: '',
        cpassword: '',
    })

    const changeInfor = (e) => {
        setRegister({...register, [e.target.name]: e.target.value})
    }
    const validate = () => {
        if(register.email.trim() === '' || register.password.trim() === '' || register.name.trim() === ''){
            toast.error('Please enter full name, email or password')
            return false
        }
        if(register.name.trim() > 20 && register.name.trim() < 3){
            toast.error('Name must be between 3 and 20 characters')
            return false
        }

        if(register.password.trim() !== register.cpassword.trim()){
            toast.error('Password invalid')
            return false
        }
        return true
    }
    const submitFormRegist = (e) => {
        // console.log(user);
        e.preventDefault()
        let flag = validate()
        if(flag){
            // http://demoprohus.epizy.com/database/AllClass.php
            // http://localhost:3000/
        axios.post(`http://localhost:8000/database/register.php`, register,{
            headers: {
              'Content-Type':'multipart/form-data'
            }
          })
          .then(function(response){
            console.log(response.data[0]);
            if(response.data !== 0){
                localStorage.setItem('name', response.data[0].studentName)
                localStorage.setItem('email', user.email)
                localStorage.setItem('studentId', response.data[0].studentId)
                localStorage.setItem('img', response.data[0].studentImage)
                localStorage.setItem('role', 0)
                // swal("Good job!", "You clicked the button!", "success");
                toast.success("resgister success");
                setTimeout(() => {
                    window.location.replace("http://localhost:3000/");
                    // phucdepzai.vercel.app
                    // window.location.replace("https://phucdepzai.vercel.app/");
                },1000)
                // <Navigate to="/dashboard" replace={true} />
            }else{
                toast.error("Can not register")
            }
        })
    }
    }
      return(
        <div className="login-body">
          <Components.Container >
              <Components.SignUpContainer signinIn={signIn}>
                  <Components.Form onSubmit={submitFormRegist}>
                      <Components.Title>Create Account</Components.Title>
                      <Components.Input type='text' name="name" placeholder='Name' required onChange={changeInfor} />
                      <Components.Input type='email' name="email" placeholder='Email' required onChange={changeInfor} />
                      <Components.Input type='password' name="password" placeholder='Password' required onChange={changeInfor} />
                      <Components.Input type='password' name="cpassword" placeholder='Password' required onChange={changeInfor} />
                      <Components.Button>Sign Up</Components.Button>
                  </Components.Form>
              </Components.SignUpContainer>

              <Components.SignInContainer signinIn={signIn}>
                   <Components.Form onSubmit={submitFormLogin}>
                       <Components.Title>Sign in</Components.Title>
                       <Components.Input type='email' name="email" placeholder='mail' onChange={setParams} />
                       <Components.Input type='password' name="password" placeholder='Password' onChange={setParams} />
                       <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
                       <Components.Button >Sigin In</Components.Button>
                   </Components.Form>
              </Components.SignInContainer>

              <Components.OverlayContainer signinIn={signIn}>
                  <Components.Overlay signinIn={signIn}>

                  <Components.LeftOverlayPanel signinIn={signIn}>
                      <Components.Title>Welcome Back!</Components.Title>
                      <Components.Paragraph>
                          To keep connected with us please login with your personal info
                      </Components.Paragraph>
                      <Components.GhostButton onClick={() => toggle(true)}>
                          Sign In
                      </Components.GhostButton>
                      </Components.LeftOverlayPanel>

                      <Components.RightOverlayPanel signinIn={signIn}>
                        <Components.Title>Hello, Friend!</Components.Title>
                        <Components.Paragraph>
                            Enter Your personal details and start journey with us
                        </Components.Paragraph>
                            <Components.GhostButton onClick={() => toggle(false)}>
                                Sigin Up
                            </Components.GhostButton> 
                      </Components.RightOverlayPanel>
  
                  </Components.Overlay>
              </Components.OverlayContainer>

          </Components.Container>
          </div>
      )
 }

 export default Login