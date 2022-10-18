import React from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
import './News.css';

class AddStudentToClass extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            news: [],
        }
    }

    getAllNew = async ()  =>{
        let news = await axios.get('http://localhost:8000/database/data/handleNews.php');
        this.setState({
            news: news && news.data ? news.data : [],
        });
        console.log(news.data);
    }


    componentDidMount(){
        this.getAllNew();
    }


    render(){
        return(
            <>
            <section> 
                <div className="new-container" >
                    <div className="border-row-new-container">
                        <div className="row-container row" >
                                <div className="col-md-3 text-center my-auto" >Hello</div>
                                <div className="col-md-7 my-auto" >Hello</div>
                        </div>
                        
                    </div>
                </div>
            </section>
            </>
        )
    }

}

export default AddStudentToClass;