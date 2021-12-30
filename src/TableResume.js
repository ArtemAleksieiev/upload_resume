import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactFileReader from "react-file-reader";
import axios from 'axios';
import Axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';



const usePaperStyles = makeStyles(theme => ({
    root: { margin: theme.spacing(2) },
    cell: { padding: '4px' }
}));

export default function TableResume() {
    
    const api = axios.create({
    baseURL: process.env.REACT_APP_baseURL
})

    const [records, setRecords] = useState([]);

    useEffect(() => {
        api.get('/').then(res => {
            console.log(res);
            setRecords(res.data.Items);
        });
    },[]);

    const classes = usePaperStyles();
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
          let app_type = 'application/pdf'
          //if (e.base64[file].split(';')[0] == 'data:application/msword') {
          //              console.log('MICROSOFT WORD');
          //              let app_type = 'application/msword';
          //} 
          let binary = atob(e.base64[file].split(',')[1])
          let array = []
          for (var i = 0; i < binary.length; i++) {
              array.push(binary.charCodeAt(i))
          }
          console.log(array)
          let blobData = new Blob([new Uint8Array(array)], {type: app_type})
          
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
        <Paper className={classes.root}>
      <Table>
        <colgroup>
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
            <col width="20%" />
            <col width="35%" />
            <col width="10%" />
            <col width="5%" />
        </colgroup>
        <TableHead>
          <TableRow>
            <TableCell className={classes.cell}>First Name</TableCell>
            <TableCell className={classes.cell}>Last Name</TableCell>
            <TableCell className={classes.cell} align="left">Phone</TableCell>
            <TableCell className={classes.cell} align="left">Email</TableCell>
            <TableCell className={classes.cell} align="center">Skills</TableCell>
            <TableCell className={classes.cell} align="center">Resume</TableCell>
            <TableCell className={classes.cell} align="center">Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((record) => {
            const { id, fname, lname, phone, email, skills, resume } = record;
            console.log(skills);
            const skillSet = skills.toLocaleString()
            return (
              <TableRow key={id}>
                <TableCell className={classes.cell} component="td" scope="row">
                  {fname}
                </TableCell>
                <TableCell className={classes.cell}>{lname}</TableCell>
                <TableCell className={classes.cell} align="left">{phone}</TableCell>
                <TableCell className={classes.cell} align="left">{email}</TableCell>
                <TableCell className={classes.cell} align="left">{skillSet.replaceAll(',', ', ') }</TableCell>
                <TableCell className={classes.cell} align="left"><a className='link' href={resume} target="_blank">Resume</a></TableCell>
                <TableCell style={{border: "none"}}>
                    <Link to={{
                          pathname: `/${id}`,
                          state: { records: records }
                        }}>
                          <button type="button" className="btn-outline-primary btn-sm float-center">
                            <FontAwesomeIcon icon={ faEdit } />
                          </button>
                    </Link>
                
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
      </header>
    </div>

    
  );
}