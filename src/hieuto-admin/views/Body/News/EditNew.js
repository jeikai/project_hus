import React from 'react';
import withRouter from '../../HOC/withRouter';
import axios from 'axios';
import { Editor } from "react-draft-wysiwyg";
import {EditorState, convertToRaw , ContentState} from 'draft-js'
import draftToHTML from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import {toast} from 'react-toastify';


class EditNew extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: '',
            name: '',
            file: '',
            old_image: '',
            fileName: '',
            description: '',
            editorState: EditorState.createEmpty(),
        }
    }

    onEditorStateChange = (editorState) => {
        this.setState({
          editorState,
          description: draftToHTML(convertToRaw(editorState.getCurrentContent()))
        });
        
      };

    componentDidMount(){
        let id = this.props.params.id;
        this.setState({id: id});
        this.getAllNew(id);
    }

    getAllNew = async (id)  =>{
        let result = await axios.get(`http://localhost:8000/database/data/handleNews.php/${id}`);
        const contentBlock = htmlToDraft(result.data.description);
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        this.setState({
            name: result.data.title,
            old_image: result.data.image,
            editorState: EditorState.createWithContent(contentState),
            description: result.data.description,
        })
    }

    handleChangeName = (event) => {
        this.setState({
            name: event.target.value,
        });
    }

    handleChangeFile = (event) =>{
        this.setState({
            file: event.target.files[0],
            fileName: event.target.value,
        });
    }
    goBack(){
        this.props.navigate('/News');
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        let {name, file, description, id, old_image} = this.state;
        let input_undefined_null = (name === undefined  || description === undefined) ||
                (name.trim() === "" || description.trim() === "" );
        if(input_undefined_null){
            toast.error("Please enter all fields");
            return;
        }
        let input = ({ "name": name.trim(), file, description, id, old_image});

        let idToast = toast.loading("Please wait!");
        let response =  await axios.post(`http://localhost:8000/database/data/handleNews.php/update`,
             input, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              });


        if(response.data.status === 0) {
            toast.update(idToast, {render: response.data.message, type: "error", isLoading: false, autoClose: true, closeButton: true});
            return;
            
        }else if(response.data.status === 1) {
                this.getAllNew(id);
                toast.update(idToast, {render: response.data.message, type: "success", isLoading: false,autoClose: true, closeButton: true});
        }else{
            toast.update(idToast, {render: "Something went wrong!!!!", type: "error", isLoading: false, autoClose: true, closeButton: true});
        }

    }

    render(){
        const { editorState, name, old_image, fileName } = this.state;
        return(
            <>
            <div className="m-5" >
                    <div className="row">
                        <div className='col-12'>
                            <div className="card">
                                <div className="card-header">
                                    <h5 className='float-start'>Edit New</h5>
                                    <button type="button" onClick={()=>this.goBack()} className="btn btn-primary float-end" name="add_class_btn" >Back</button>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={(event) => this.handleSubmit(event)}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label htmlFor="" className="mb-2">Title</label>
                                            <input type="text" required name="name"  className="form-control" placeholder="Enter class name"
                                                value={name ?? ""}
                                                onChange={(event) => this.handleChangeName(event)}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="" className="mb-2">Upload New Image</label>
                                            <input type="file" name="image" className="form-control"
                                             value={fileName ?? " "}
                                            onChange={(event) => this.handleChangeFile(event)}
                                            />
                                        </div>
                                        <div className="col-md-12 mt-3" >
                                           <div className="float-start me-3">New's current image is: </div>  <img src = {'/assets/newImgs/'+ old_image} height="150px" alt="..."/>
                                        </div>
                                        <div className="col-md-12 mt-3" >
                                            <label htmlFor=""  className="mb-2">Description</label>
                                            <div className="col-md-12" >
                                            
                                            <Editor
                                                
                                                editorStyle={{ border: "0.5px solid  #C0C0C0", height: "280px", overflowY: "auto" ,resize: "vertical"}}
                                                editorState={editorState}
                                                toolbarClassName="toolbarClassName"
                                                wrapperClassName="wrapperClassName"
                                                editorClassName="editorClassName"
                                                onEditorStateChange={this.onEditorStateChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-12 mt-3">
                                            
                                            <button type="submit" className="btn btn-primary float-end" name="add_class_btn" >Save</button>
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

export default withRouter(EditNew);