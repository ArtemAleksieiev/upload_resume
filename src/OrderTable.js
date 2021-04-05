import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
//import { BiEdit } from 'react-icons/bi';

const OrderTable = ({orders}) => {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Adress</Th>
          <Th>Customer</Th>
          <Th>Description</Th>
          <Th>Phone</Th>
          <Th>Status</Th>
          <Th style={{border: "none", background:"transparent", color:'black'}}>Edit</Th>
        </Tr>
      </Thead>
      <Tbody>
        {orders.map((order) => {
        const { id, customer, adress, description, phone, status } = order
        return  <Tr key={id}>
                <Td component="th" scope="row">{customer}</Td>
                <Td>{adress}</Td>
                <Td>{description}</Td>
                <Td>{phone}</Td>
                <Td>{status}</Td>
                <Td style={{border: "none"}}>
                  <Link to={`/${id}`}>
                    <button type="button" className="btn btn-outline-primary btn-sm float-center">
                      <p>Edit</p>
                    </button>
                  </Link>
                </Td>
                </Tr>
        })}
        </Tbody>
    </Table>
  );
}

export default OrderTable;