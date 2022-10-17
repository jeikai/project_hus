import React, { useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack5";
export default function ViewFile(props) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1); //setting 1 to show fisrt page
  
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  // const { viewPdf } = props;
  // let reader = new FileReader();
  // reader.readAsDataURL();
  // console.log(viewPdf); 
  const viewPdf = props.viewPdf;
  const setIsActive = props.setIsActive;
  return (
    <>
      <Document
      // file= {require(`${viewPdf}`)}
      file= {require(`./../../../../data/application/pdf/${viewPdf}`)}
        options={{ workerSrc: "/pdf.worker.js" }}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <div style={{ position: 'relative', marginLeft: '30rem' }}>
        <p style={{ padding: '0 0 1rem 3rem' }}>
          Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
        </p>
        <button style={{textAlign: 'center', width: '5rem' ,marginRight: '2rem', height: '2rem', border: '1px solid black', backgroundColor: 'var(--main-color)', borderRadius: '0.5rem', color: 'white' }} type="button" disabled={pageNumber <= 1} onClick={previousPage}>
          Previous
        </button>
        <button
          style={{textAlign: 'center', width: '5rem', marginRight: '2rem', height: '2rem', border: '1px solid black', backgroundColor: 'var(--main-color)', borderRadius: '0.5rem', color: 'white' }}
          type="button"
          disabled={pageNumber >= numPages}
          onClick={nextPage}
        >
          Next
        </button>
        {props.isActive !== undefined && 
          <div style={{ position: 'absolute', right: '250px', top: '-800px' }}><i style={{  fontSize: '2rem' }} onClick={() => setIsActive(true)} className='bx bx-x-circle' ></i></div>
        }
      </div>
    </>
  );
}