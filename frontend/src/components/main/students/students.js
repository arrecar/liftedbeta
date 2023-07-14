import React from 'react';
import { useEffect, useState } from 'react';
import {Button, Form} from 'react-bootstrap';
import axios from 'axios';
import ErrorMessage from '../../ErrorMessage';


const Students = (props) => {
    const [firstname,setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [id,setId] = useState(0);
    const [parentEmail, setparentEmail] = useState("")
    const [parent2Email, setparent2Email] = useState("");
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState({});
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('')

    const getData = async () => {
        const { data } = await axios.get('/api/students');
        setStudents(data);
    }

    const handleDelete = async(id) => {
        console.log(id);
        try {
            const {data} = await axios.delete(`api/students/${id}`)
            setMessage('Student deleted successfully');
            getData();
            props.updateContent('students');
        } catch (error){
            setError(error.response.data.message);
            props.updateContent('students');
        }
    }

    const handleUpdate = async(e) => {
        e.preventDefault();
        
        try{
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }

            const {data} = await axios.put(`/api/students/${id}`,{firstname,lastname,parentEmail,parent2Email},config)
            setMessage('Student updated successfully');
            setSearch({});
            setparentEmail('');
            setFirstname('');
            setLastname('');
            setparent2Email('');
            setId(0);
            getData();
            props.updateContent('students');

        }catch (error) {
            setError(error.response.data.message);
            props.updateContent('students')
        }
    }

    const handleEdit1 = async(id) =>{

        try{
            const { data } = await axios.get(`/api/students/${id}`)

        setFirstname(data.firstname);
        setLastname(data.lastname)
        setparentEmail(data.parentEmail);
        setparent2Email(data.parent2Email);
        setId(data._id);
        setError(false);
        setMessage('');
        props.updateContent('editStudents')
        
        //localStorage.setItem('searchEmail', JSON.stringify(data))
        } catch (error) {
            setError(error.response.data.message);
        }
    }

    const searchById = (id) => async (e) =>{
        e.preventDefault();
        setError(false);

        try{
        const { data } = await axios.get(`/api/students/${id}`);
        console.log(data);
        setSearch(data);
        //localStorage.setItem('searchEmail', JSON.stringify(data))
        } catch (error) {
            setError(error.response.data.message);
        }
        //console.log(data)
        //console.log(search)
    }

    const handleEdit = () => {
            //searchByEmail(email);
            setFirstname(search.firstname);
            setLastname(search.lastname)
            setparentEmail(search.parentEmail);
            setparent2Email(search.parent2Email)
            setId(search._id);
            setError(false);
            setMessage('');
            props.updateContent('editStudents');
    }

    const handleCreate = () =>{
                setError(false);
                setMessage('');
        props.updateContent('createStudent');
    }

    const handleCreateStudent = async(e) =>{
        e.preventDefault();

        try{

            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }
            const _id = id;
            const {data} = await axios.post(`api/students/create`,{ _id,firstname,lastname,parentEmail,parent2Email },config);
            setMessage('Student created successfully');
            getData();
            setparentEmail('');
            setFirstname('');
            setLastname('');
            setparent2Email('');
            setId(0);
            props.updateContent('students');
        } catch (error){
            setError(error.response.data.message);
            props.updateContent('students');
        }
    }

const clearSearch = (e) =>{
    e.preventDefault();
    setSearch({});
    setId(0);
    setError(false);
    setMessage('');
    //localStorage.setItem('searchEmail','');
}

    useEffect(() => {
                
            getData();            
        }, []);

    if (props.type === 'general'){
        return (
            <div className='content' >
                <h1>Students</h1>
                    <div className="contform">
                        <Form className='contentform'>
                            <Form.Control type="number" value={id} placeholder="Id" onChange={(e) => setId(e.target.value)}/>
                            <Button variant= 'danger' type="submit" className='button' onClick={searchById(id)}>Search</Button>
                            <Button variant= 'danger' type="submit" className='button' onClick={clearSearch}>Clear</Button>
                        </Form>
                        <Button variant='danger' type="submit" className='button-users' onClick={handleCreate}>Create</Button>
                        {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
                        {message && <ErrorMessage variant='success'>{message}</ErrorMessage>}
                    </div>
                    <div className='usersTable'>
                        <table>
                            <tr>
                                <th>Name</th>
                                <th>Primary Parent Email</th>
                                <th>Second Parent Email</th>
                            </tr>
                        { Object.keys(search).length === 0 &&
                            students.map((students) => (
                                <tr>
                                    <td>{students.firstname} {students.lastname}</td>
                                    <td>{students.parentEmail}</td>
                                    <td>{students.parent2Email} <Button id={students._id} onClick={(e)=> {handleDelete(e.target.id)}}>Delete</Button><Button id={students._id} onClick = {(e) => {handleEdit1(e.target.id)}}>Edit</Button></td>
                                </tr>
                        ))}
                        { Object.keys(search).length > 1 &&
                            <tr>
                                <td>{search.firstname} {search.lastname}</td>
                                <td>{search.parentEmail}</td>
                                <td>{search.parent2Email} <Button id={search._id} onClick={(e)=> {handleDelete(e.target.id)}}>Delete</Button><Button id={search._id} onClick = {(e) => {handleEdit(e.target.id)}}>Edit</Button></td>
                            </tr>
                        }
                        </table>
                    </div>
            </div>
        )
    }else if (props.type === 'editStudents'){
        return (
            <div className='content' >
                <div className="contform">
                    <h1>Edit Student</h1>
                        <Form className='editCreateform' onSubmit={handleUpdate}>
                            <Form.Group controlId='firstname'>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type='text' value={firstname} onChange={(e) => setFirstname(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='lastname'>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" value={lastname} onChange={(e) => setLastname(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='parentEmail'>
                                <Form.Label>Primary Parent Email</Form.Label>
                                <Form.Control type="email" value={parentEmail} onChange={(e) => setparentEmail(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='parent2Email'>
                                <Form.Label>Second Parent Email</Form.Label>
                                <Form.Control type="email" value={parent2Email} onChange={(e) => setparent2Email(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Button variant= 'danger' type="submit" className='button' id={id}>Update</Button>
                        </Form>
                </div>
            </div>
        )
    } else if (props.type === 'createStudent'){
        return (
            <div className='content' >
                <div className="contform">
                    <h1>Create Student</h1>
                        <Form Form className = 'editCreateform' onSubmit = {handleCreateStudent}>
                            <Form.Group controlId='firstname'>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type='text' value={firstname} onChange={(e) => setFirstname(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='lastname'>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" value={lastname} onChange={(e) => setLastname(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='parentEmail'>
                                <Form.Label>Primary Parent Email</Form.Label>
                                <Form.Control type="email" value={parentEmail} onChange={(e) => setparentEmail(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='parent2Email'>
                                <Form.Label>Second Parent Email</Form.Label>
                                <Form.Control type="email" value={parent2Email} onChange={(e) => setparent2Email(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='_id'>
                                <Form.Label>Id</Form.Label>
                                <Form.Control type='number' value={id} onChange={(e) => setId(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Button variant= 'danger' type="submit" className='button studentcreate'>Create</Button>
                        </Form>
                </div>
            </div>
        )
    }
}

export default Students;