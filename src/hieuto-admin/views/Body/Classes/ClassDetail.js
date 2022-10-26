import React from 'react';
import withRouter from '../../HOC/withRouter';
import axios from 'axios';
import {toast} from 'react-toastify';
import AddTeacherToClass from './AddTeacherToClass'
import AddStudentToClass from './AddStudentToClass'
import AddTimeTable from './AddTimeTable'
import EditTimeTable from './EditTimeTable'

class ClassDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalTeacher: false,
            modalStudent: false,
            modalAddTimeTable: false,
            modalEditTimeTable: false,
            timeTable: '',
            classId: '',
            pendings: '',
            className: '',
            users: [],
            date: '',
        }
    }

    componentDidMount(){
        let id = this.props.params.id;
        let className = this.props.params.className;
        this.setState({classId: id});
        this.setState({className: className});
        this.getAllUserInClass(id);
        this.getAllTimeTableInClass(id);
        this.getAllPendingUserInClass(id);
    }

    getAllPendingUserInClass = async (id)  =>{
        let pendings = await axios.get(`http://localhost:8000/database/data/handlePendingUsers.php?id=${id}`,{
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
        this.setState({
            pendings: pendings && pendings.data ? pendings.data : [],
        });
    }

    getAllUserInClass = async (id)  =>{
        let users = await axios.get(`http://localhost:8000/database/data/handleDetailClasses.php/${id}`);
        this.setState({
            users: users && users.data ? users.data : [],
        });
    }

    getAllTimeTableInClass = async (id)  =>{
        let timeTable = await axios.get(`http://localhost:8000/database/data/handleTimeTable.php?id=${id}`,{
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
        this.setState({
            timeTable: timeTable && timeTable.data ? timeTable.data : [],
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
    handleAddTimeTable = () =>{
        this.setState({
            modalAddTimeTable: !this.state.modalAddTimeTable,
        });
    }

    handleEditTimeTable = (date) =>{
        this.setState({
            date: date,
            modalEditTimeTable: !this.state.modalEditTimeTable,
        });
    }

    handleEditPending = async (user) =>{
        let {classId} = this.state;
        let idToast = toast.loading("Please wait!");
        let response =  await axios.post(`http://localhost:8000/database/data/handlePendingUsers.php?id=${user.studentId}&classId=${classId}`);
        this.getAllUserInClass(classId);
        this.getAllPendingUserInClass(classId);

        if(response.data.status === 0) {
            toast.update(idToast, {render: response.data.message, type: "error", isLoading: false, autoClose: true, closeButton: true});
            
        }else if(response.data.status === 1) {
            toast.update(idToast, {render: response.data.message, type: "success", isLoading: false,autoClose: true, closeButton: true});
        }else{
            toast.update(idToast, {render: "Something went wrong!!!", type: "error", isLoading: false, autoClose: true, closeButton: true});
        }
    }

    handleReloadEditTeacher = () =>{
        this.handleTeacher();
        this.getAllUserInClass(this.state.classId);
    }

    handleReloadEditStudent = () =>{
        this.handleStudent();
        this.getAllUserInClass(this.state.classId);
    }

    handleReloadAddTimeTable = () =>{
        this.handleAddTimeTable();
        this.getAllTimeTableInClass(this.state.classId);
    }

    handleReloadEditTimeTable = () =>{
        this.handleEditTimeTable();
        this.getAllTimeTableInClass(this.state.classId);
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

    handleDeletePending = async (user) =>{
        let {classId} = this.state;
        let idToast = toast.loading("Please wait!");
        let response =  await axios.delete(`http://localhost:8000/database/data/handlePendingUsers.php?id=${user.studentId}&classId=${classId}`);
        this.getAllPendingUserInClass(classId);

        if(response.data.status === 0) {
            toast.update(idToast, {render: response.data.message, type: "error", isLoading: false, autoClose: true, closeButton: true});
            
        }else if(response.data.status === 1) {
            toast.update(idToast, {render: response.data.message, type: "success", isLoading: false,autoClose: true, closeButton: true});
        }else{
            toast.update(idToast, {render: "Something went wrong!!!", type: "error", isLoading: false, autoClose: true, closeButton: true});
        }
    }

    handleDeleteTimeTable = async (date) =>{
        let {classId} = this.state;

        let idToast = toast.loading("Please wait!");
        let response =  await axios.delete(`http://localhost:8000/database/data/handleTimeTable.php?id=${date.timetableId}&delete=true`);
        this.getAllTimeTableInClass(classId);

        if(response.data.status === 0) {
            toast.update(idToast, {render: response.data.message, type: "error", isLoading: false, autoClose: true, closeButton: true});
            
        }else if(response.data.status === 1) {
            toast.update(idToast, {render: response.data.message, type: "success", isLoading: false,autoClose: true, closeButton: true});
        }else{
            toast.update(idToast, {render: "Something went wrong!!!", type: "error", isLoading: false, autoClose: true, closeButton: true});
        }
    }

    render() {
        let {modalEditTimeTable ,modalStudent, modalTeacher, modalAddTimeTable,  classId, className, users, timeTable, date, pendings} = this.state;
        let isString = typeof users === 'string'
        let isString2 = typeof timeTable === 'string'
        return(
            <>
            {modalEditTimeTable ? <EditTimeTable handleReloadEdit={this.handleReloadEditTimeTable} setDate={date} classId={classId} active={modalEditTimeTable} hide={this.handleEditTimeTable} date={this.state.date} /> : ""}
            {modalAddTimeTable ? <AddTimeTable handleReloadEdit={this.handleReloadAddTimeTable} classId={classId} active={modalAddTimeTable} hide={this.handleAddTimeTable} /> : ""}
            {modalStudent ? <AddStudentToClass handleReloadEdit={this.handleReloadEditStudent} classId={classId} active={modalStudent} hide={this.handleStudent} /> : ""}
            {modalTeacher ? <AddTeacherToClass handleReloadEdit={this.handleReloadEditTeacher} classId={classId} active={modalTeacher} hide={this.handleTeacher} /> : ""}
                <div className="m-5">
                    <div className="row">
                        <div className='col-12'>
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="float-start">Class {className} Detail</h5>
                                    <button type="button" onClick={()=>this.goBack()} className="btn btn-primary mx-2 float-end" name="add_class_btn" >Back</button>
                                    <button type="button" onClick={()=>this.handleStudent()} className="btn btn-primary mx-2 float-end" name="add_class_btn" >Add Student</button>
                                    <button type="button" onClick={()=>this.handleTeacher()} className="btn btn-primary mx-2 float-end" name="add_class_btn" >Add Teacher</button>
                                    <button type="button" onClick={()=>this.handleAddTimeTable()} className="btn btn-primary mx-2 float-end" name="add_class_btn" >Add Schedule</button>
                                </div>
                                <div className="card-body">
                                <h5 className="float-start mt-2">Class's Schedual</h5>
                                <table className="table table-bordered table-striped" id="articles_table">
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Class Id</th>
                                            <th>Start Lesson</th>
                                            <th>End Lesson</th>
                                            <th>Day</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {timeTable && isString2 === false && timeTable.map((date,index)=>{
                                            return(
                                                <tr key={index}>
                                                    <td>{date.timetableId}</td>
                                                    <td>{date.classId}-{className}</td>
                                                    <td>{date.startLesson}</td>
                                                    <td>{date.endLesson}</td>
                                                    <td>{date.DAY}</td>
                                                    <td>
                                                        <button type="button" className="btn btn-primary edit_admin_btn" value={date.Id}
                                                        onClick={() => this.handleEditTimeTable(date)}>Edit</button>
                                                    </td>
                                                    <td>
                                                        <button type="button" className="btn btn-danger delete_admin_btn" value={date.Id}
                                                        onClick={() => this.handleDeleteTimeTable(date)}>Delete</button>
                                                    </td>
                                                </tr>
                                            )
                                            })
                                        }
                                    </tbody>
                                </table>

                                {/* Pending hear */}
                                {pendings != '' && isString === false &&
                                    <>
                                        <hr className="mt-4 mb-4"></hr>
                                    <h5 className="float-start">Add Pending Student</h5>
                                    <table className="table table-bordered table-striped" id="articles_table">
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Name</th>
                                                <th>Phone</th>
                                                <th>Email</th>
                                                <th>Class Name</th>
                                                <th>Add</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {pendings && isString === false && pendings.map((user, index) =>{
                                                return(
                                                    <tr key={user.resultId}> 
                                                        <td>{user.studentId}</td>
                                                        <td>{user.studentName}</td>
                                                        <td>{user.phoneNumber}</td>
                                                        <td>{user.email}</td>
                                                        <td>{className}</td>
                                                        <td>
                                                            <button type="button" className="btn btn-warning delete_admin_btn" value={user.Id}
                                                            onClick={() => this.handleEditPending(user)}>Add</button>
                                                        </td>
                                                        <td>
                                                            <button type="button" className="btn btn-danger delete_admin_btn" value={user.Id}
                                                            onClick={() => this.handleDeletePending(user)}>Delete</button>
                                                        </td>
                                                    </tr>
                                                )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                    </>
                                }
                                

                                {/* Class user hear */}
                                <hr className="mt-4 mb-4"></hr>
                                <h5 className="float-start">Class's users</h5>
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
                                                        onClick={() => this.handleDelete(user)}>Delete</button>
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