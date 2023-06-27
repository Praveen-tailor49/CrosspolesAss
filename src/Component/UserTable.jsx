import React, { useEffect, useState } from 'react'
import { Table, Container, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { get_User } from '../Redux/action/User';
import AddUser from './AddUser';
import { Page_Status, Show_Modal, Update_Count, User_Data, User_Single_Data } from '../Redux/actionType';

const UserTable = () => {

    const dispatch = useDispatch()
    const userData = useSelector((state) => state.user.userData)
    const updateCount = useSelector((state) => state.user.updateCount)

    useEffect(() => {
        if (userData.length === 0) dispatch(get_User())
    }, [])

    const openModal = (row) => {
        dispatch({ type: Show_Modal, payload: true })
        dispatch({ type: User_Single_Data, payload: row }); dispatch({ type: Page_Status, payload: true }); dispatch({ type: Update_Count, payload: updateCount+1 })
    }

    const deleteUser = (id) => {
        const objIndex = userData.findIndex((obj => obj.id == id));
        delete userData[objIndex];
        const data = userData.filter(function (element) {
            return element !== undefined;
        });
        dispatch({ type: User_Data, payload: data });
    }

    return (
        <>
            <Container >
                <Table striped bordered hover variant="warning" style={{ marginTop: '30px' }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>City</th>
                            <th>Zip Code</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userData?.map((val, key) => (
                                <tr key={key}>
                                    <td>{val.id}</td>
                                    <td>{val.name}</td>
                                    <td>{val.email}</td>
                                    <td> {val.phone} </td>
                                    <td> {val.address.city} </td>
                                    <td> {val.address.zipcode} </td>
                                    <td>
                                        <Button variant="primary" onClick={() => openModal(val)}>Edit</Button>
                                        <Button variant="danger" style={{ marginLeft: '10px' }} onClick={() => deleteUser(val.id)} >Delete</Button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </Container>
            <AddUser />
        </>
    )
}

export default UserTable