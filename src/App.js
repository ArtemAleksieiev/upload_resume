import React, { useState } from 'react';
import ReactFileReader from "react-file-reader";
import Axios from 'axios';
import Main from './Main.js';
import './App.css';

const App = () => {
  const [progress, setProgress] = useState('getUpload');
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleFiles = async (e) => {
    setProgress('uploading');
    console.log('Upload clicked');
    for (const file in e.base64) { 
    try {          
          // Get the presigned URL
          const response = await Axios({
          method: 'GET',
          url: process.env.REACT_APP_API_ENDPOINT
          });
          console.log('ResponseURL: ', response.data.uploadURL)
          let binary = atob(e.base64[file].split(',')[1])
          let array = []
          for (var i = 0; i < binary.length; i++) {
              array.push(binary.charCodeAt(i))
          }
          console.log(array)
          let blobData = new Blob([new Uint8Array(array)], {type: 'application/pdf'})
          
          console.log('Uploading to: ', response.data.uploadURL)
          const result = await fetch(response.data.uploadURL, {
            method: 'PUT',
            body: blobData
          })
          console.log('Result: ', result)
        } catch (error) {
          console.log('error in upload', error);
          setErrorMessage(error.message);
          setProgress('uploadError');
        }
        setProgress('uploaded');
    }
  }

  const content = () => {
    switch (progress) {
        case 'getUpload':
            return (
              <>
                <div>
                  <div>Please upload a resume</div>
                  <ReactFileReader fileTypes={[".pdf",".doc"]} base64={true} multipleFiles={true} handleFiles={(e)=>handleFiles(e)}>
                    <button className='btn'>Upload</button>
                  </ReactFileReader>
                </div>
              </>
            );
        case 'uploading':
            return <h2>Uploading....</h2>
        case 'uploaded':
            return ( 
              <h2>Uploaded</h2>
            );
        case 'uploadError':
            return (
                <>
                    <div>Error message = {errorMessage}</div>
                    <div>please upload a resume</div>
                </>
            );
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Resume Upload Website</h1>
        {content()}
        <Main />
      </header>
    </div>
  );
}

export default App;
