import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, Link, useParams } from 'react-router-dom';
import ResumeTable from './ResumeTable';


const api = axios.create({
    baseURL: 'https://b38z6ro243.execute-api.us-east-2.amazonaws.com'
})

const Main = () => {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        api.get('/').then(res => {
            console.log(res);
            setRecords(res.data.Items);
        });
    },[]);
/*
    const handleSubmit = (e) => {
        e.preventDefault();
        if (customer && phone) {
            const newOrder = { customer, adress, description, phone, status:'created', id:'123'};
            
            api.post(
                '/', {
                    key1: customer,
                    key2: adress,
                    key3: description,
                    key4: phone,
                }
                ).then (response => {
                    console.log('Saved');
                    setOrders((orders)=>{
                        return [...orders, newOrder];
                    });
                    setCustomer('');
                    setAdress('');
                    setDescription('');
                    setPhone('');
                });
        } else {
            console.log('empty values');
        };
    };
    const Order = () => {
        const {id} = useParams();
        const current = orders.find((ord) => ord.id ===id);
        return (
            <div className="container">
        <form onSubmit={handleSubmit}>
        <label htmlFor="customer">Customer : </label>
        <input
            type="text"
            name="customer"
            placeholder={current.customer}
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
        />
        <label htmlFor="adress">Adress : </label>
        <input
            type="text"
            name="adress"
            placeholder={current.adress}
            value={adress}
            onChange={(e) => setAdress(e.target.value)}
        />
        <label htmlFor="description">Description : </label>
        <input
            type="text"
            name="description"
            placeholder={current.description}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="phone">Phone : </label>
        <input
            type="text"
            name="phone"
            placeholder={current.phone}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
        />  
        <button type="submit">Send</button>
        </form>
        </div>
        );
    };
    const Create = () => {
        return (
        <>
        <div className="container">
        <h1>Create Order</h1>
        <form onSubmit={handleSubmit}>
        <label htmlFor="customer">Customer : </label>
        <input
            type="text"
            name="customer"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
        />
        <label htmlFor="adress">Adress : </label>
        <input
            type="text"
            name="adress"
            value={adress}
            onChange={(e) => setAdress(e.target.value)}
        />
        <label htmlFor="description">Description : </label>
        <input
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="phone">Phone : </label>
        <input
            type="text"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
        />  
        <button type="submit">Send</button>
        </form>
            </div>
            </>
    );
};
*/
return (
        <>
        <Router>
            <Switch>
            <Route exact path="/">
                <ResumeTable records={records} />
                <Link to="/create" className="create-btn">create new record</Link>
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