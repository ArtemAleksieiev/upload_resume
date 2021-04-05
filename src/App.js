import React, { useState } from 'react';
import ReactFileReader from "react-file-reader";
import Axios from 'axios';
import Main from './Main.js';
import './App.css';

const App = () => {
  const [progress, setProgress] = useState('getUpload');
  const [errorMessage, setErrorMessage] = useState('');
  const [resumeLink, setResumeLink] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const API_ENDPOINT = 'https://b38z6ro243.execute-api.us-east-2.amazonaws.com/uploads'

  const handleFiles = async (e) => {
    console.log(e.base64)
    setProgress('uploading');
    try {
          console.log('Upload clicked');
          // Get the presigned URL
          const response = await Axios({
          method: 'GET',
          url: API_ENDPOINT
          });
          console.log('ResponseURL: ', response.data.uploadURL)
          let binary = atob(e.base64[0].split(',')[1])
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
          console.log(response.data.uploadURL.split('?')[0])
          setResumeLink(response.data.uploadURL.split('?')[0]);
          setProgress('uploaded');
          Axios.post(API_ENDPOINT, { key1: fname, key2: lname, key3: resumeLink })
          

        } catch (error) {
            console.log('error in upload', error);
            setErrorMessage(error.message);
            setProgress('uploadError');
        }
    
  }

  const content = () => {
    switch (progress) {
        case 'getUpload':
            return (
              <>
                <div>
                  <div>please upload a resume</div>
                          <div className="container">
        <label htmlFor="fname">First Name : </label>
        <input
            type="text"
            name="fname"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
        />
        <label htmlFor="lname">Last Name : </label>
        <input
            type="text"
            name="lname"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
        />
        
            </div>
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
              <>
                <h2>Uploaded</h2>
                <h6>You can access resume by clicking this link:</h6>
                <a className='link' href={resumeLink}>{resumeLink}</a>
              </>
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
