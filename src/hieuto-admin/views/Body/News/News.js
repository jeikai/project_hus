import React from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
import withRouter from '../../HOC/withRouter';
// import newImgs from '../../../../assets/newImgs';

class News extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            news: [],
        }
    }
    handleEdit = (new1) =>{
        this.props.navigate(`/EditNew/${new1.trueId}`);
    }

    getAllNews = async ()  =>{
        let news = await axios.get('https://test.modnro.xyz/database/data/handleNews.php');
        this.setState({
            news: news && news.data ? news.data : [],
        });
    }

    componentDidMount(){
        this.getAllNews();
    }

    handleDelete = async (new1)=>{
        let idToast = toast.loading("Please wait!");
        let response =  await axios.delete(`https://test.modnro.xyz/database/data/handleNews.php/${new1.trueId}`);
        this.getAllNews();

        if(response.data.status === 0) {
            toast.update(idToast, {render: response.data.message, type: "error", isLoading: false, autoClose: true, closeButton: true});
            
        }else if(response.data.status === 1) {
            toast.update(idToast, {render: response.data.message, type: "success", isLoading: false,autoClose: true, closeButton: true});
        }else{
            toast.update(idToast, {render: "Something went wrong!!!!", type: "error", isLoading: false, autoClose: true, closeButton: true});
        }
    }
    
    
    render(){
        let {news } = this.state;
        let isString = typeof news === 'string'
        return(
            <>
                 <div className="m-5">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="float-start">News</h5>
                                </div>
                                <div className="card-body">
                                <table className="table table-bordered table-striped" id="articles_table">
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Title</th>
                                            <th>Image</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {news && isString === false && news.map((New, index) =>{
                                            console.log(New.title);
                                            return(
                                                <tr key={New.Id}>
                                                    
                                                    <td>{New.Id}</td>
                                                    <td style={{wordBreak: "break-all"}}>{New.title}</td>
                                                    <td><img src = {'assets/newImgs/'+New.image} width="50px" height="50px" alt="..."/></td>
                                                    <td>
                                                        <button className="btn btn-primary edit_admin_btn"
                                                        onClick={() => this.handleEdit(New)}
                                                        >Edit</button>
                                                    </td>
                                                    <td>
                                                        <button type="button" className="btn btn-danger delete_admin_btn" value={New.Id}
                                                        onClick={() => this.handleDelete(New)}
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

export default withRouter(News);