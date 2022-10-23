import axios from "axios";
import React from "react";
 import * as Components from './Components';
 import { useNavigate } from "react-router-dom";
import './styles.css';
import { toast } from "react-toastify";
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
        await axios.post(`http://localhost:8000/database/login.php`, user,{
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
                window.location.replace("http://localhost:3000/");
            }
        })
    }

    const submitFormRegist = (e) => {
        e.preventDefault()
        // console.log(user);
        axios.post(`http://localhost:8000/database/register.php`, user,{
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
                },1000)
                // <Navigate to="/dashboard" replace={true} />
            }else{
                toast.error("Email is invalid")
            }
        })
    }
      return(
        <div className="login-body">
          <Components.Container >
              <Components.SignUpContainer signinIn={signIn}>
                  <Components.Form onSubmit={submitFormRegist}>
                      <Components.Title>Create Account</Components.Title>
                      <Components.Input type='text' placeholder='Name' required />
                      <Components.Input type='email' placeholder='Email' required />
                      <Components.Input type='password' placeholder='Password' required />
                      <Components.Input type='password' placeholder='Password' required />
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