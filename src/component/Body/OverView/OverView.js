import './OverView.css'
import { useState } from "react";
import data from "../../../data/data";

function OverView () {

    const [selected, setSelected] = useState(0);
    return(
        <section>   
                <div className='menu'>
                    {data.map((item, index)=>{
                        return(
                            <a href={'#' + index} key={index}>
                            <div className = {selected === index ? 'menuItem active' : 'menuItem'} 
    
                                onClick = {() => setSelected(index)}
                            >   
                            
                                <div>{item.icon}</div>
                                <span>{item.heading}</span>
                            </div>
                            </a>

                        )
                    })}
                </div>

                <div className='body'>
                    {data.map((item, index) => {
                        return(
                            <div className='container' 
                                id={index}
                                key={index}
                            >
                                <h4>{item.heading}</h4>
                                <div className='box'>
                                    <div>{item.array[0]}</div>
                                    <div>{item.array[1]}</div>
                                    <div>{item.array[2]}</div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>
    )
}

export default OverView;