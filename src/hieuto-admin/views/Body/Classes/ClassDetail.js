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
        }
    }
    componentDidMount(){
        let id = this.props.params.id;
        let className = this.props.params.className;
        this.setState({classId: id});
        this.setState({className: className});
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

    goBack(){
        this.props.navigate('/Classes');
    }

    render() {
        let {modalStudent, modalTeacher, classId, className} = this.state;

        return(
            <>
            {modalStudent ? <AddStudentToClass handleReloadEdit={this.handleReloadEdit} classId={classId} active={modalStudent} hide={this.handleStudent} /> : ""}
            {modalTeacher ? <AddTeacherToClass handleReloadEdit={this.handleReloadEdit} classId={classId} active={modalTeacher} hide={this.handleTeacher} /> : ""}
                <div className="m-5">
                    <div className="row">
                        <div className='col-12'>
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="float-start">Classe {className} Detail</h5>
                                    <button type="button" onClick={()=>this.goBack()} className="btn btn-primary mx-2 float-end" name="add_class_btn" >Back</button>
                                    <button type="button" onClick={()=>this.handleStudent()} className="btn btn-primary mx-2 float-end" name="add_class_btn" >Add Student</button>
                                    <button type="button" onClick={()=>this.handleTeacher()} className="btn btn-primary mx-2 float-end" name="add_class_btn" >Add Teacher</button>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={(event) => this.handleSubmit(event)}>
                                    <div className="row">
                                            {/* <div className="col-md-6">
                                                <label htmlFor="" className="mb-2" >Class Name</label>
                                                <input type="text" required name="name"
                                                value={this.state.name}
                                                onChange={(event) => this.handleChangeName(event)} className="form-control" placeholder="Enter class name"/>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="" className="mb-2">Upload Class's Image</label>
                                                <input type="file" name="image" className="form-control"
                                                value={this.state.fileName}
                                                onChange={(event) => this.handleChangeFile(event)}
                                                />
                                            </div>
                                            <div className="col-md-12 mt-3">
                                                <button type="submit" className="btn btn-primary float-end" name="add_class_btn">Save</button>
                                            </div> */}
                                    </div>
                                    </form>
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