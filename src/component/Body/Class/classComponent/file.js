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
                                        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png' />
                                    </div>
                                    <div>{doc.documentName}</div>
                                    {/* <p>{doc.statusDocuments}</p> */}
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