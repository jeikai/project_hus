import React from 'react';
import withRouter from '../../HOC/withRouter';
import axios from 'axios';
import {toast} from 'react-toastify';
import AddTeacherToClass from './AddTeacherToClass'
import AddStudentToClass from './AddStudentToClass'

class ClassDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalTeacher: false,
            modalStudent: false,
            classId: '',
            className: '',
            users: [],
        }
    }

    componentDidMount(){
        let id = this.props.params.id;
        let className = this.props.params.className;
        this.setState({classId: id});
        this.setState({className: className});
        this.getAllUserInClass(id);
    }

    getAllUserInClass = async (id)  =>{
        let users = await axios.get(`http://localhost:8000/database/data/handleDetailClasses.php/${id}`);
        this.setState({
            users: users && users.data ? users.data : [],
        });
    }

    handleTeacher = () =>{
        this.setState({
            modalTeacher: !this.state.modalTeacher,
        });
    }
    handleStudent = () =>{
        this.setState({
            modalStudent: !this.state.modalStudent,
        });
    }

    handleReloadEdit = () =>{
        this.handleTeacher();
        this.getAllUserInClass(this.state.classId);
    }

    handleReloadEdit1 = () =>{
        this.handleStudent();
        this.getAllUserInClass(this.state.classId);
    }

    goBack(){
        this.props.navigate('/Classes');
    }

    handleDelete = async (user) =>{
        let {classId} = this.state;
        let idToast = toast.loading("Please wait!");
        let response =  await axios.delete(`http://localhost:8000/database/data/handleDetailClasses.php/${user.Role}/${user.trueId}/${classId}`);
        this.getAllUserInClass(classId);

        if(response.data.status === 0) {
            toast.update(idToast, {render: response.data.message, type: "error", isLoading: false, autoClose: true, closeButton: true});
            
        }else if(response.data.status === 1) {
            toast.update(idToast, {render: response.data.message, type: "success", isLoading: false,autoClose: true, closeButton: true});
        }else{
            toast.update(idToast, {render: "Something went wrong!!!", type: "error", isLoading: false, autoClose: true, closeButton: true});
        }
    }

    render() {
        let {modalStudent, modalTeacher, classId, className, users} = this.state;
        let isString = typeof users === 'string'
        return(
            <>
            {modalStudent ? <AddStudentToClass handleReloadEdit={this.handleReloadEdit1} classId={classId} active={modalStudent} hide={this.handleStudent} /> : ""}
            {modalTeacher ? <AddTeacherToClass handleReloadEdit={this.handleReloadEdit} classId={classId} active={modalTeacher} hide={this.handleTeacher} /> : ""}
                <div className="m-5">
                    <div className="row">
                        <div className='col-12'>
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="float-start">Class {className} Detail</h5>
                                    <button type="button" onClick={()=>this.goBack()} className="btn btn-primary mx-2 float-end" name="add_class_btn" >Back</button>
                                    <button type="button" onClick={()=>this.handleStudent()} className="btn btn-primary mx-2 float-end" name="add_class_btn" >Add Student</button>
                                    <button type="button" onClick={()=>this.handleTeacher()} className="btn btn-primary mx-2 float-end" name="add_class_btn" >Add Teacher</button>
                                </div>
                                <div className="card-body">
                                <table className="table table-bordered table-striped" id="articles_table">
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Name</th>
                                            <th>Phone</th>
                                            <th>Email</th>
                                            <th>Class Name</th>
                                            <th>Role</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users && isString === false && users.map((user, index) =>{
                                            return(
                                                <tr key={user.Id}>
                                                    
                                                    <td>{user.Id}</td>
                                                    <td>{user.Name}</td>
                                                    <td>{user.Phone}</td>
                                                    <td>{user.Email}</td>
                                                    <td>{user.ClassName}</td>
                                                    <td>{user.Role}</td>
                                                    <td>
                                                        <button type="button" className="btn btn-danger delete_admin_btn" value={user.Id}
                                                        onClick={() => this.handleDelete(user)}
                                                        >Delete</button>
                                                    </td>
                                                </tr>
                                            )
                                            })
                                        }
                                    </tbody>
                                </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}   

export default withRouter(ClassDetail);