import React, { useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import ChipInput from 'material-ui-chip-input';


const useStyles = makeStyles(theme => ({
    container: { margin: theme.spacing(2)},
    root: { flexGrow: 1 },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: 'white',
        border: 'none'
    },
    chipInput: { minWidth: 300 }
}));
const api = axios.create({
    baseURL: process.env.REACT_APP_baseURL
})
export default function Record() {
    const classes = useStyles();
    const location = useLocation()
    const { records } = location.state

    const {id} = useParams();
    const current = records.find((rec) => rec.id ===id);
    const [fname, setFname] = useState(current.fname);
    const [lname, setLname] = useState(current.lname);
    const [phone, setPhone] = useState(current.phone);
    const [email, setEmail] = useState(current.email);
    const [skills, setSkills] = useState(current.skills);
    const [saved, setSaved] = useState();

    const onAdd = chip => {
    setSkills([...skills, chip]);
    };
    const onDelete = (chip, index) => {
    setSkills(skills.slice(0, index).concat(skills.slice(index + 1)));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(fname);
        if (fname && phone) {
            api.post(
                '/', {
                    id: id,
                    key1: fname,
                    key2: lname,
                    key3: phone,
                    key4: email,
                    key5: skills
                }
                ).then (response => {  
                    console.log('Saved!'); 
                    setSaved(1)
                });
        } else {
            console.log('empty values');
        };
        
    };

    return (
        saved ?
        <Redirect push to="/"/> : 
        <div className={classes.root}>
        <div className="container">
        <form onSubmit={handleSubmit}>
        <label htmlFor="fname">First Name:
        <input
            type="text"
            name="fname"
            placeholder={current.fname}
            value={fname}
            step={1}
            onChange={(e) => setFname(e.target.value)}
        />
        </label>
        <label htmlFor="lname">Last Name:
        <input
            type="text"
            name="lname"
            placeholder={current.lname}
            value={lname}
            onChange={(e) => setLname(e.target.value)}
        /></label>
        <label htmlFor="pnone">Phone:
        <input
            type="text"
            name="phone"
            placeholder={current.phone}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
        /></label>
        <label htmlFor="email">Email:
        <input
            type="text"
            name="email"
            placeholder={current.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        /></label>  
        <label htmlFor="email">Skills:
        <Grid item xs={12}>
        <Paper className={classes.paper}>
        <ChipInput
            className={classes.chipInput}
            helperText="Type skill, hit enter to type another"
            value={skills}
            onAdd={onAdd}
            onDelete={onDelete}
        />
        </Paper>
        </Grid>
        </label>
        <button type="submit" className="submitButton">Submit</button>
        </form>
        </div>
        </div>
        );
}