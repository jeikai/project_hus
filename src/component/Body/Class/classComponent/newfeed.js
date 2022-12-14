import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom'
import './newsfeed.css'
import swal from 'sweetalert';
import {toast} from 'react-toastify';

export default function NewsFeed(props) {
    const id = useParams().id;
    // console.log(id);
    const newsfeed = props.newsfeed
    const reloadPosts = props.reloadPosts
    const [comment, setComments] = useState([])
    const AllComments = () => {
        axios.get(`https://test.modnro.xyz/database/comment.php`)
            .then(function(response){
                setComments(response.data);
            });
    }
    useEffect(() => {
        AllComments()
    }, [])

    const fileInputRef=useRef();
    
    const [path, setPath] = useState('');


    const [post, setPost] = useState({
        content: '',
        file: '',
        classId: id,
        studentName: localStorage.getItem('name'),
    })
    const handleChange = (e) =>{
        console.log(e.target.files[0]);
      setPost({...post, [e.target.name]: e.target.files[0]});
      setPath(URL.createObjectURL(e.target.files[0]))
      let element = document.getElementsByClassName('post-image')
      element[0].style.display = "block"
      console.log('hehe');
    }

    const submitForm = async (e) => {
        e.preventDefault()
        console.log(post.file);
        console.log(post.content);
        if(post.content.trim() === '' && post.file === '') {
            toast.error('Please select a file or content')
            return
        }
        await axios.post(`https://test.modnro.xyz/database/insert_post.php`, post,{
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(function(response){
            console.log(response.data);
            if(response.data === 0){
                toast.success('Post was successfully')
                setPost({...post,content: '',file: [], classId: id})
                let element = document.getElementsByClassName('post-image')
                element[0].style.display = "none"
                reloadPosts()
            }
        })
    }
    // const color = 'blue'
    var randomColor = require('randomcolor'); // import the script
    // var color; // a hex code for an attractive color
    const [input, setInput] = useState('')
    const handleSubmit = async (id) =>{ 
        let element = {
            id: id,
            input: input,
            name: localStorage.getItem('name')
        }

        // console.log(element)
        await axios.post(`https://test.modnro.xyz/database/insert_comment.php`, element ,{
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(function(response){
            // setPost(response.data)
            console.log(response.data);
            if(response.data === 0){
                // toast.success('Co'
                // swal("Good job!", "You clicked the button!", "success");
                setPost({content: '', file: '', classId: id})
                setInput('')
                AllComments()
                // setInput('')
            }
        })
    }

    const [assignment, setAssignment] = useState()
    const getNewsForTeacher = async () => {
        await axios.get(`https://test.modnro.xyz/database/assignmentStudent.php/${id}`)
            .then(function(response){
                console.log(response.data)
                setAssignment(response.data)
            });
    }
    useEffect( ()=>{
         getNewsForTeacher()
        // return 0
    }, [])

    return(
        <div id="newsfeed">
            <div className='contentNewsFeed'>
                <div className='heading'>B???ng tin</div>
                <div className='wrap'>
                    <div className='inputInfo'>
                        <div>
                            <img src='https://i.pinimg.com/originals/62/ae/fb/62aefb044922a5a847546e30b9036913.jpg' />
                        </div>
                        <div>
                            <textarea value={post.content} style={{ resize: 'none', width: '100%', height: '50px'}} placeholder='Nh???p n???i dung v?? th???o lu???n v???i l???p h???c' name='content' onChange={(e)=>setPost({...post, [e.target.name]: e.target.value})}></textarea>
                            <div style={{ width: '100%', height: '100%', marginTop: '4rem' }}>
                                <img className='post-image' style={{ width: '50%', height: '50%', borderRadius: '0rem', display: 'none'}} src={path} alt="" />
                            </div>
                        </div>
                    </div>
                    <div></div>
                    <div>
                        <input onChange={handleChange} onClick={e => (e.target.value = null)} name='file' ref={fileInputRef} type='file' hidden/>
                        <input onClick={()=>fileInputRef.current.click()} type='button' value='Ch???n t???p'/>
                        <input onClick={submitForm} type='submit' value='????ng tin'/>
                    </div>
                    {newsfeed.map((item, index) =>{
                        return(
                        <>  
                        <div className='divi' key={index + '1'}></div>
                        <div className='content' key={index}>
                            <div className='content-heading'>
                                <div>
                                    <div>
                                        <img src='https://i.pinimg.com/originals/62/ae/fb/62aefb044922a5a847546e30b9036913.jpg' />
                                    </div>
                                    <div>
                                        <p>{item.postName}</p>
                                        <span>{item.postTime}</span>
                                    </div>
                                </div>
                                <div><i className='bx bx-dots-vertical-rounded'></i></div>
                            </div>
                            <div className='content-img'>
                                <div>
                                    <p className='content-text'>{item.postContent}</p>
                                    
                                    {item.postImage ? <img style={{ width: '50%', height: '50%', borderRadius: '0rem'}}  src={'/assets/newsfeed/' + item.postImage}/> : <br/> }
                                </div>
                                <div>
                                    <i className='bx bx-message-rounded-minus'></i>
                                    <span>
                                        {(comment.filter(comment => comment.postId === item.postId)).length}
                                        {" "} b??nh lu???n
                                    </span>
                                </div>
                            </div>
                            
                            <div className='content-input'>
                                <form onSubmit={e => {
                                    e.preventDefault()
                                    handleSubmit(item.postId)
                                }}>
                                    <div>
                                        <img src='https://i.pinimg.com/originals/62/ae/fb/62aefb044922a5a847546e30b9036913.jpg' />
                                    </div>
                                    <div>
                                        <input required type='text' placeholder='Vi???t b??nh lu???n ...' value={input} onChange={(e) => setInput(e.target.value)} />
                                    </div>
                                </form>
                                {(comment.filter(comment => comment.postId === item.postId)).map((item,index) => {
                                    return(
                                    <div key={index}>
                                        <ul>
                                            <li>
                                                <div>
                                                    <img src='https://i.pinimg.com/originals/62/ae/fb/62aefb044922a5a847546e30b9036913.jpg' />
                                                </div>
                                                <div>
                                                    <span><b>{item.commentName} : </b></span>
                                                    <span>{item.commentContent}</span>
                                                </div>
                                                <div><i className='bx bx-dots-horizontal-rounded'></i></div>
                                            </li>
                                        </ul>
                                    </div>
                                )})}
                            </div>
                        </div></>
                    )})}

                </div>
            </div>
            <div className='infoNewsFeed' style={{ overflowY: 'auto' }}>
                <div className='heading'>Th??ng b??o t??? gi??o vi??n</div>
                {assignment !== undefined && assignment.map((item, index) =>{
                    return(
                        <div className='content-teacher' 
                        style={{ borderLeft: `10px solid ${randomColor()}`}}
                        key={index}
                        >
                            <p><b>{item.title}</b></p>
                            <p>{item.content}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}