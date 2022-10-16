import React from 'react';
import {toast} from 'react-toastify';
import axios from 'axios';

class AddClass extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            file: '',
            fileName: '',
        }
    }

    handleChangeFile = (event) =>{
        this.setState({
            file: event.target.files[0],
            fileName: event.target.value,
        });
    }
    handleChangeName = (event) => {
        this.setState({
            name: event.target.value,
        });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        let {name, file} = this.state;
        let input_undefined_null = (name === undefined ) ||(name.trim() === "");
        if(input_undefined_null){
            toast.error("Please enter all fields");
            return;
        }
        let input = ({ "name": name.trim(), file});
        let idToast = toast.loading("Please wait!");
        let response =  await axios.post(`http://localhost:8000/data/handleClasses.php`,
             input, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              });
              if(response.data.status === 0) {
                toast.update(idToast, {render: response.data.message, type: "error", isLoading: false, autoClose: true, closeButton: true});
                return;
                
            }else if(response.data.status === 1) {
                this.setState({
                        name: '',
                        file: '',
                        fileName: '',
                    });
                toast.update(idToast, {render: response.data.message, type: "success", isLoading: false,autoClose: true, closeButton: true});
            }else{
                toast.update(idToast, {render: "Something went wrong!!!", type: "error", isLoading: false, autoClose: true, closeButton: true});
        }
    }



    render(){



        return(
            <>
                <div className="m-5">
                    <div className="row">
                        <div className='col-12'>
                            <div className="card">
                                <div className="card-header">
                                    <h5>Add Classes</h5>
                                </div>
                                <div className="card-body">
                                <form onSubmit={(event) => this.handleSubmit(event)}>
                                    <div className="row">
                                            <div className="col-md-6">
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
                                            </div>
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

export default AddClass;