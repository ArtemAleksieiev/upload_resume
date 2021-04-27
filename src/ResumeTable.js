import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
//import { BiEdit } from 'react-icons/bi';

const ResumeTable = ({records}) => {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>First Name</Th>
          <Th>Last Name</Th>
          <Th>Phone</Th>
          <Th>Email</Th>
          <Th>Skills</Th>
          <Th>Resume</Th>
          <Th>Edit</Th>
        </Tr>
      </Thead>
      <Tbody>
        {records.map((record) => {
        const { id, fname, lname, phone, email, skills, resume } = record
        return  <Tr key={id}>
                <Td component="th" scope="row">{fname}</Td>
                <Td>{lname}</Td>
                <Td>{phone}</Td>
                <Td>{email}</Td>
                <Td>{skills.map(item => <p>{item}</p>)}</Td>
                
                <Td><a className='link' href={resume} target="_blank">{resume}</a></Td>
                <Td>
                  <Link to={`/${id}`}>
                    <button type="button" className="btn-outline-primary btn-sm float-center">
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

export default ResumeTable;