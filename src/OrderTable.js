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
          <Th>First Name</Th>
          <Th>Last Name</Th>
          <Th>Resume</Th>
          <Th style={{border: "none", background:"transparent", color:'black'}}>Edit</Th>
        </Tr>
      </Thead>
      <Tbody>
        {orders.map((order) => {
        const { id, fname, lname, resume } = order
        return  <Tr key={id}>
                <Td component="th" scope="row">{fname}</Td>
                <Td>{lname}</Td>
                <Td>{resume}</Td>
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