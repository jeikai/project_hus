// import React, { useState } from "react";
// // import { Document, Page } from "react-pdf";
// import { Document, Page } from "react-pdf/dist/esm/entry.webpack5";

// export default function ViewFile() {
//   const [numPages, setNumPages] = useState(null);

//   function onDocumentLoadSuccess({ numPages }) {
//     setNumPages(numPages);
//   }

//   // const { pdf } = props;

//   return (
//     <Document
//       file= {require('./../../../../data/application/pdf/doc_1.pdf')}
//       options={{ workerSrc: "/pdf.worker.js" }}
//       onLoadSuccess={onDocumentLoadSuccess}
//     >
//       {Array.from(new Array(numPages), (el, index) => (
//         <Page key={`page_${index + 1}`} pageNumber={index + 1} />
//       ))}
//     </Document>
//   );
// }


import React, { useState } from "react";
// import { Document, Page } from "react-pdf";
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
      <div>
        <p>
          Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
        </p>
        <button type="button" disabled={pageNumber <= 1} onClick={previousPage}>
          Previous
        </button>
        <button
          type="button"
          disabled={pageNumber >= numPages}
          onClick={nextPage}
        >
          Next
        </button>
      </div>
    </>
  );
}