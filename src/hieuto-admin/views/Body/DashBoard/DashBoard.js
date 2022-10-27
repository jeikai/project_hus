import React from 'react';
import axios from 'axios';

class DashBoard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: '',
        }
    }

    componentDidMount(){
        this.getAllDataFromDashBoard();
        console.log(this.state.data);
    }

    getAllDataFromDashBoard = async (id)  =>{
        let data = await axios.get(`http://localhost:8000/database/data/handleDashBoard.php`,{
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
        this.setState({
            data: data && data.data ? data.data : [],
        });
    }

    render(){
        let {data} = this.state;
        return(
            <>
                <div className='m-5'>
                    <h3>Hello Admin!</h3>
                    <div className="row mt-4">
                        <div className="col-md-3 col-sm-6 col-6  my-2 ">
                            <div className="card mb-2 h-100">
                                <div className="card-header">
                                    <h5><i className='bx bx-user'></i> Total users</h5>
                                </div>
                                <div className="card-body">
                                    <div className="text-end pt-1 me-3">
                                        <h4 className="mb-0">
                                            {data.numUser}
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 col-6  my-2 ">
                            <div className="card mb-2 h-100">
                                <div className="card-header">
                                    <h5><i className='bx bx-book'></i> Total class</h5>
                                </div>
                                <div className="card-body">
                                    <div className="text-end pt-1 me-3">
                                        <h4 className="mb-0">
                                        {data.numClass}
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 col-6  my-2 ">
                            <div className="card mb-2 h-100">
                                <div className="card-header">
                                    <h5><i className='bx bx-news'></i> Total news</h5>
                                </div>
                                <div className="card-body">
                                    <div className="text-end pt-1 me-3">
                                        <h4 className="mb-0">
                                        {data.numNews}
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </>
        )
    }
}

export default DashBoard;