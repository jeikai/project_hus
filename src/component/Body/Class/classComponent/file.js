import { useState } from 'react'
import DropDown from './../../../DropDown'
import './homeWork.css'
import './file.css'
import ViewFile from './viewFile';
export default function File(props) {
    const documents = props.documents;

    const [isActive, setIsActive] = useState(true);
    const [viewPdf, setViewPdf] = useState('');    
    return(
        <>
        <div id="homework">
            <div className="heading">Tài liệu</div>
            <div>
                <div className='find-homework'>
                    <div>
                        <form>
                            <input type='text' placeholder="Tìm kiếm ..."/>
                            <i className='bx bx-search'></i>
                        </form>
                    </div>
                    <div><DropDown></DropDown></div>
                </div>

                {isActive && (
                <div className='list-homework'>
                    <div className='item-homework'
                    onClick={() => setIsActive(false)}
                    >
                        {documents.map((doc, index) => {
                            return(
                                <div key={index}
                                onClick={() => setViewPdf(doc.documentFile)}
                                >
                                    <div>
                                        <img src='https://i.pinimg.com/originals/62/ae/fb/62aefb044922a5a847546e30b9036913.jpg' />
                                    </div>
                                    <p>{doc.documentName}</p>
                                    <p>{doc.statusDocuments}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
                )}

            </div>
        </div>
        {!isActive && (
            <div className='all-page-container'>
                <ViewFile isActive = {isActive} setIsActive={setIsActive} viewPdf={viewPdf}/>
            </div>
        )}
        </>
    )
}