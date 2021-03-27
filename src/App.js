import React, { useState } from 'react';
import ImageUploader from 'react-images-upload';
import Axios from 'axios';
import './App.css';

const UploadComponent = props => (
    <form>
    <ImageUploader
        key="image-uploader"
        withIcon={true}
        singleImage={true}
        withPreview={true}
        label="Maximum size file: 5MB"
        buttonText="Choose an image"
        onChange={props.onImage}
        imgExtension={['.jpg', '.png', '.jpeg']}
        maxFileSize={5242880}
    ></ImageUploader>
  </form>
);

const App = () => {
  const [progress, setProgress] = useState('getUpload');
  const [errorMessage, setErrorMessage] = useState('');
  //const [url, setImageURL] = useState(undefined);
  const API_ENDPOINT = 'https://t39hcfjfn5.execute-api.us-east-2.amazonaws.com/uploads'

  const onImage = async (failedImages, successImages) => {
    setProgress('uploading');
    
    try {
            console.log('successImages', successImages[0]);
            
            console.log('Upload clicked');
            // Get the presigned URL
            const response = await Axios({
              method: 'GET',
              url: API_ENDPOINT
            });
            console.log('ResponseURL: ', response.data.uploadURL)
            let binary = atob(successImages[0].split(',')[1])
            
            let array = []
            for (var i = 0; i < binary.length; i++) {
                array.push(binary.charCodeAt(i))
            }
            console.log(array)
            let blobData = new Blob([new Uint8Array(array)], {type: 'image/jpeg'})
            
            console.log('Uploading to: ', response.data.uploadURL)
            const result = await fetch(response.data.uploadURL, {
              method: 'PUT',
              body: blobData
            })
            console.log('Result: ', result)
            console.log(response.data.uploadURL.split('?')[0])
            setProgress('uploaded');
        } catch (error) {
            console.log('error in upload', error);
            setErrorMessage(error.message);
            setProgress('uploadError');
        }
    };


  const content = () => {
    switch (progress) {
        case 'getUpload':
            return <UploadComponent onImage={onImage} />;
        case 'uploading':
            return <h2>Uploading....</h2>;
        case 'uploaded':
            return <h2>Uploaded</h2>;
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
        <h1>Image Upload Website</h1>
        {content()}
      </header>
    </div>
  );
}

export default App;
