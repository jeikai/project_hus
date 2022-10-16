import React from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
import EditUser from './EditUser';

class Users extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {},
            users: [],
            modal: false,
        }
    }

    getAllUser = async ()  =>{
        let users = await axios.get('http://localhost:8000/data/handleStudent.php');
        this.setState({
            users: users && users.data ? users.data : [],
        });
    }

    componentDidMount(){
        this.getAllUser();
    }

    handleDelete = async (user)=>{
        let response =  await axios.delete(`http://localhost:8000/data/handleStudent.php/${user.Role}/${user.trueId}`);
        this.getAllUser();

        if(response.data.status === 0) {
            toast.error(response.data.message);
            
        }else if(response.data.status === 1) {
             toast.success(response.data.message);
        }else{
            toast.error("Someting went wrong!");
        }
    }

    handleEdit = (user) =>{
        this.setState({
            modal: !this.state.modal,
            user: user,
        });
    }

    handleReloadEdit = () =>{
        this.handleEdit();
        this.getAllUser();
    }
    

    render(){
        let {users, modal, user} = this.state;
        let isString = typeof users === 'string'

        return(
            <>
                
                {modal ? <EditUser handleReloadEdit={this.handleReloadEdit} user={user} active={modal} hide={this.handleEdit} /> : ""}
                <div className="m-5">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="float-start">Users</h5>
                                </div>
                                <div className="card-body">
                                <table className="table table-bordered table-striped" id="articles_table">
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Name</th>
                                            <th>Phone</th>
                                            <th>Email</th>
                                            <th>Password</th>
                                            <th>Role</th>
                                            <th>Edit</th>
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
                                                    <td>{user.Password}</td>
                                                    <td>{user.Role}</td>
                                                    <td>
                                                        <button className="btn btn-primary edit_admin_btn"
                                                        onClick={() => this.handleEdit(user)}
                                                        >Edit</button>
                                                    </td>
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

export default Users;