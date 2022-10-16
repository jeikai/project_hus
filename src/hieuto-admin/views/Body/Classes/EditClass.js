import React from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';

class EditClass extends React.Component {

    state = {
        trueId: '',
        file: '',
        fileName: '',
        old_image: '',
        name: '',
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
        console.log(this.state);
    }

     componentDidMount(){
        let {trueId, className, classImage} = this.props.Class;
        this.setState({
            trueId: trueId,
            old_image: classImage,
            name: className,
         });
     }

     handleSubmit = async (event) => {
        event.preventDefault();
        let {name, file, old_image, trueId} = this.state;
        let input_undefined_null = (name === undefined) ||(name.trim() === "");
        if(input_undefined_null){
            toast.error("Please enter all fields");
        }
        let input = ({ "name": name.trim(), file, trueId, old_image});
        let idToast = toast.loading("Please wait!");
        let response =  await axios.post(`http://localhost:8000/data/handleClasses.php/update`,
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
                    trueId: '',
                    file: '',
                    fileName: '',
                    old_image: '',
                    name: '',
                });
                toast.update(idToast, {render: response.data.message, type: "success", isLoading: false,autoClose: true, closeButton: true});
                this.props.handleReloadEdit();
        }else{
            toast.update(idToast, {render: "Something went wrong!!!!", type: "error", isLoading: false, autoClose: true, closeButton: true});
        }

     }

   
    render(){
        // console.log(user);
        return (
            <>
                <div  className={this.props.active ? "myModal active9 modal show" : "myModal modal show"} id="addModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Edit Class</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"
                        onClick={this.props.hide}
                        aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={(e)=>{this.handleSubmit(e)}} >
                            <div className="mb-4">
                            <label htmlFor="" className="mb-2" >Class Name</label>
                                <input type="text" required name="name"
                                value={ this.state.name}
                                onChange={(event) => this.handleChangeName(event)}
                                className="form-control" placeholder="Enter class name"/>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="" className="mb-2">Upload Class's Image</label>
                                <input type="file" name="image" className="form-control"
                                value={this.state.fileName}
                                onChange={(event) => this.handleChangeFile(event)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label float-start me-3">Current Image: </label>
                                <img src = {this.state.old_image === "" ? "/assets/classImgs/defaultClassImg.jpg" :  '/assets/classImgs/' + this.state.old_image} height="150px" alt="..."/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary"
                                onClick={this.props.hide} onChange={(event)=>this.handeleOnChange(event)}
                                data-bs-dismiss="modal">Close</button>
                                <button type="submit" name="add-admin-btn" className="btn btn-primary">Submit</button>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }

}




export default EditClass;