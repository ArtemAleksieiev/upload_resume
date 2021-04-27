import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import ResumeTable from './ResumeTable';


const api = axios.create({
   // baseURL: process.env.REACT_APP_baseURL
   baseURL: 'https://b38z6ro243.execute-api.us-east-2.amazonaws.com'
})
console.log(process.env.REACT_APP_baseURL)
const Main = () => {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        api.get('/').then(res => {
            console.log(res);
            setRecords(res.data.Items);
        });
    },[]);
return (
        <>
        <Router>
            <Switch>
            <Route exact path="/">
                <ResumeTable records={records} />
                {/*<Link to="/create" className="create-btn">create new record</Link>*/}
            </Route>
            {/*
                <Route path="/:id" children={<Order/>}>
            </Route>
                <Route path="/create">
                    <Create />
                </Route>
            */}
            </Switch>
        </Router>
        </>
    );
}

export default Main;