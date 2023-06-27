import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { Page_Status, Show_Modal, User_Data } from '../Redux/actionType';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const AddUser = () => {

    const dispatch = useDispatch()
    const show = useSelector((state) => state.user.showModal)
    const userData = useSelector((state) => state.user.userData)
    const singleData = useSelector((state) => state.user.singleData)
    const pageStatus = useSelector((state) => state.user.pageStatus)
    const updateCount = useSelector((state) => state.user.updateCount)

    const closeModal = () => {
        dispatch({ type: Show_Modal, payload: false })
    }

    const [validated, setValidated] = useState(false);
    const [value, setValue] = useState({ name: '', email: '', phone: '', city: '', zipcode: '', id: '' })

    useEffect(() => {
        if (singleData && pageStatus) {setValue({ name: singleData.name, email: singleData.email, phone: singleData.phone, city: singleData?.address?.city, zipcode: singleData?.address?.zipcode, id: singleData.id}); dispatch({ type: Page_Status, payload: true });}
        else resetHooks()
    }, [singleData, updateCount])

    const handleChange = (e) => {
        setValue(pre => { return { ...pre, [e.target.name]: e.target.value } })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const { name, email, phone, city, zipcode, id } = value
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            const newArray = [...userData]
            const res = { "id": userData.length + 1, "name": name, "email": email, "address": { "city": city, "zipcode": zipcode, }, "phone": phone, }
            newArray.push(res)
            dispatch({ type: User_Data, payload: newArray });
            closeModal(); resetHooks()
        }
        setValidated(true);
    };

    const updateUser = (event) => {
        // event.preventDefault();
        const { name, email, phone, city, zipcode, id } = value
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            const objIndex = userData.findIndex((obj => obj.id == id));
            const updatedObj = { ...userData[objIndex], "name": name, "email": email, "address": { "city": city, "zipcode": zipcode, }, "phone": phone,};
            var res = userData.map(obj => [updatedObj].find(o => o.id === obj.id) || obj);
            dispatch({ type: User_Data, payload: res });
            closeModal(); resetHooks()
        }
        setValidated(true);
    }

    const resetHooks = () => { setValue({ name: '', email: '', phone: '', city: '', zipcode: '' }); dispatch({ type: Page_Status, payload: false }) }

    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton onClick={() => { closeModal(); resetHooks() }}>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modal heading
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated}>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="4" controlId="validationCustom01">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Name"
                                name='name'
                                value={value.name}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control
                                required
                                type="Email"
                                placeholder="Email"
                                name='email'
                                value={value.email}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="4" >
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Phone"
                                maxLength={10}
                                name='phone'
                                value={value.phone}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="3" controlId="validationCustom03">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" placeholder="City" required name='city' value={value.city} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group as={Col} md="3" controlId="validationCustom05">
                            <Form.Label>Zip</Form.Label>
                            <Form.Control type="text" placeholder="Zip" required name='zipcode' value={value.zipcode} onChange={handleChange} />
                        </Form.Group>
                    </Row>
                    <Button type="button" onClick={(e) => { pageStatus ? updateUser(e) : handleSubmit(e)}}>{pageStatus?'Update':'Save'}</Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => { closeModal(); resetHooks() }}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddUser