import React from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';

class AddTimeTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            classId: this.props.classId,
            input: {},
        }
    }
    handleOnChange =(event)=>{
        this.setState({
           input:  ({...this.state.input, [event.target.name]: event.target.value}),
        });
    }
    

    handleSubmit = async (event) =>{
        event.preventDefault();
        let {input, classId} = this.state;
        if(input.startLesson > input.endLesson){
            toast.error("Start lesson must start before end lesson")
            return;
        }
        input = ({...input, classId})

        let idToast = toast.loading("Please wait!");
        let response =  await axios.post(`https://test.modnro.xyz/database/data/handleTimeTable.php`, input, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });                           
        if(response.data.status === 0) {
            toast.update(idToast, {render: response.data.message, type: "error", isLoading: false, autoClose: true, closeButton: true});
            return;
            
        }else if(response.data.status === 1) {
            this.setState({
                    input: '',
                });
                toast.update(idToast, {render: response.data.message, type: "success", isLoading: false,autoClose: true, closeButton: true});
                this.props.handleReloadEdit();
        }else{
            toast.update(idToast, {render: "Something went wrong!!!", type: "error", isLoading: false, autoClose: true, closeButton: true});

        }

    }



    render(){
        // console.log(user);
        const day = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"]
        return (
            <>
                <div  className={this.props.active ? "myModal active9 modal show" : "myModal modal show"} id="addModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Add Timetable</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"
                        onClick={this.props.hide}
                        aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={(e)=>{this.handleSubmit(e)}} >
                            <div className="mb-4">
                            <label htmlFor="" className="mb-2" >Start Lesson: </label>
                                <input type="time" name="startLesson" required className="form-control"
                                onChange={(event) => this.handleOnChange(event)}/>
                            </div>
                            <div className="mb-4">
                            <label htmlFor="" className="mb-2" >End Lesson: </label>
                                <input type="time" name="endLesson" required className="form-control"
                                onChange={(event) => this.handleOnChange(event)}/>
                            </div>
                            <div className="mb-4">
                            <label htmlFor="" className="mb-2" >Thứ: </label>
                                <select name="DAY" id="" required className="form-select form-select-md w-2 "
                                    onChange={(event) => this.handleOnChange(event)} >
                                        <option  defaultValue hidden
                                            value=''>----Select category----</option>
                                            {
                                                day.map((item, index)=>{
                                                    return(
                                                        <option key={index} value={item}>{item}</option>
                                                    )
                                                })
                                            }
                                </select>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary"
                                onClick={this.props.hide} 
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

export default AddTimeTable;