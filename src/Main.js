import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TableResume from './TableResume';
import Record from './Record';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    container: { margin: theme.spacing(2) }
}));

const api = axios.create({
    baseURL: process.env.REACT_APP_baseURL
})
const Main = () => {

    return (
        <>
        <Router>
            <Switch>
                <Route component={TableResume} exact path="/" />
                <Route path="/:id" component={Record} /> 
            </Switch>
        </Router>
        </>
        );
    }

export default Main;