import React from 'react';
import axios from 'axios';
import './News.css';
import withRouter  from '../../../hieuto-admin/views/HOC/withRouter';

class DetailNew extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: '',
            title: '',
            content: '',
        }
    }

    getNew = async (id)  =>{
        let result = await axios.get(`http://localhost:8000/database/data/handleNews.php/${id}`);
        this.setState({
            title: result.data.title,
            content: result.data.description,
        })

    }

    componentDidMount(){
        let id = this.props.params.id;
        this.setState({id: id});
        this.getNew(id);
    }

    render(){
        let {title, content} = this.state;
        console.log(content);
        return(
            <>
                <section> 
                    <div className="new-container">
                        <div className="container mt-4">
                            <div className="new-user-title mb-3">{title}</div>
                                <div className="new-user-content" dangerouslySetInnerHTML = {{__html: content}}>
                                </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }

}

export default withRouter(DetailNew);