import React from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
import EditClass from './EditClass';
import withRouter from '../../HOC/withRouter';
// import altImg from '/assets/defaultClassImg';

class Classes extends React.Component {
    state = {
        classes: [],
        modal: false,
        Class: '',
    }

    handleEdit = (Class) =>{
        this.setState({
            modal: !this.state.modal,
            Class: Class,
        });
    }
    handleClassDetail = (Class) =>{
        this.props.navigate(`/ClassDetail/`+Class.trueId + `/` + Class.className);
    }

    getAllClasses = async () =>{
        let classes = await axios.get('http://localhost:8000/database/data/handleClasses.php');
        this.setState({
            classes: classes && classes.data ? classes.data : [],
        });
    }
    componentDidMount(){
        this.getAllClasses();
    }
    handleDelete = async (Class) =>{
        let idToast = toast.loading("Please wait!");
        let response =  await axios.delete(`http://localhost:8000/database/data/handleClasses.php/${Class.trueId}`);
        this.getAllClasses();

        if(response.data.status === 0) {
            toast.update(idToast, {render: response.data.message, type: "error", isLoading: false, autoClose: true, closeButton: true});
            
        }else if(response.data.status === 1) {
            toast.update(idToast, {render: response.data.message, type: "success", isLoading: false,autoClose: true, closeButton: true});
        }else{
            toast.update(idToast, {render: "Something went wrong!!!!", type: "error", isLoading: false, autoClose: true, closeButton: true});
        }
    }

    handleReloadEdit = () =>{
        this.handleEdit();
        this.getAllClasses();
    }

    render(){
        let {classes, modal, Class} = this.state;
        let isString = typeof classes === 'string'
        return(
            <>
            {modal ? <EditClass handleReloadEdit={this.handleReloadEdit} Class={Class} active={modal} hide={this.handleEdit} /> : ""}
                <div className="m-5">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="float-start">Classes</h5>
                                </div>
                                <div className="card-body">
                                <table className="table table-bordered table-striped" id="articles_table">
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Name</th>
                                            <th>Image</th>
                                            <th style={{width: "140px"}}>Add Detail Class</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {classes && isString === false && classes.map((Class, index) =>{
                                            return(
                                                <tr key={Class.trueId}>
                                                    
                                                    <td>{Class.Id}</td>
                                                    <td>{Class.className}</td>
                                                    <td><img src = {Class.classImage === "" ? "/assets/classImgs/defaultClassImg.jpg" :  '/assets/classImgs/' + Class.classImage} width="50px" height="50px" alt="..."/></td>
                                                    <td>
                                                        <button className="btn btn-warning"
                                                        onClick={() => this.handleClassDetail(Class)}
                                                        >Add</button>
                                                    </td>
                                                    <td>
                                                        <button className="btn btn-primary edit_admin_btn"
                                                        onClick={() => this.handleEdit(Class)}
                                                        >Edit</button>
                                                    </td>
                                                    <td>
                                                        <button type="button" className="btn btn-danger delete_admin_btn" value={Class.Id}
                                                        onClick={() => this.handleDelete(Class)}
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

export default withRouter(Classes);