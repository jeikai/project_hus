import React from 'react';
import axios from 'axios';

import './News.css';
import withRouter  from '../../../hieuto-admin/views/HOC/withRouter';

class News extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            news: [],
        }
    }

    getAllNew = async ()  =>{
        let news = await axios.get('https://test.modnro.xyz/database/data/handleNews.php');
        this.setState({
            news: news && news.data ? news.data : [],
        });
    }


    componentDidMount(){
        this.getAllNew();
    }

    detailNews =(New) =>{
        this.props.navigate(`/News/DetailNew/${New.trueId}`);
    }


    render(){
        let {news } = this.state;
        let isString = typeof news === 'string'
        return(
            <>
            <section> 
                <div className="new-container" >
                    
                    <div className="border-row-new-container">
                    <h4 className= "my-3 ms-5">All Rabiloo News Hear</h4>
                        {news && isString === false && news.map((New, index) =>{
                            return(   
                                <>                  
                                <div className="row-container row" key={New.Id}>

                                    <div className="col-md-3 m-2" height = "50px">
                                        <div className='inner'>
                                            <div className='card-effect'>
                                            <img src = {'assets/newImgs/'+New.image}
                                            onClick={() => this.detailNews(New)}
                                            height="100px" width="200px" className="img-resize"  alt="..."/>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="col-md-8 mt-3 ms-3">
                                        <p className="article-title"
                                        onClick={() => this.detailNews(New)}
                                        >{New.title}</p>
                                    </div> 
                                </div>
                                </>                                              
                                )
                            })
                        }
                    </div>
                </div>
            </section>
            </>
        )
    }

}

export default withRouter(News);