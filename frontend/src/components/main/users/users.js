import React from 'react';
import { useEffect, useState } from 'react';
import {Button, Form} from 'react-bootstrap';
import axios from 'axios';
import ErrorMessage from '../../ErrorMessage';







const Users = (props) => {
    const [firstname,setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [role,setRole] = useState('');
    const [option1, setOption1] = useState('');
    const [option2, setOption2] = useState('')
    const [password,setPassword] = useState('');
    const [id,setId] = useState(0);
    const [email, setEmail] = useState("")
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState({});
    const [error, setError] = useState(false);

    const getData = async () => {
        const { data } = await axios.get('/api/users');
        setUsers(data);
    }

    const searchByEmail = (email) => async (e) =>{
        e.preventDefault();
        setError(false);

        try{
        const { data } = await axios.get(`/api/users/${email}`);
        console.log(data);
        setSearch(data);
        //localStorage.setItem('searchEmail', JSON.stringify(data))
        } catch (error) {
            setError(error.response.data.message);
        }
        //console.log(data)
        //console.log(search)
    }

    const handleEdit = (email) =>{
            console.log(email)
            searchByEmail(email);
            setFirstname(search.firstname);
            setLastname(search.lastname)
            setEmail(search.email);
            setRole(search.role);
            if (role === 'Administrator'){
                setOption1('Teacher');
                setOption2('Parent');
            } else if (role === 'Teacher'){
                setOption1('Administrator');
                setOption2('Parent')
            } else if (role === 'Parent'){
                setOption1('Administrator');
                setOption2('Teacher');
            }
            setPassword(search.password);
            setId(search._id);
            props.updateContent('editUsers')
    }

const clearSearch = (e) =>{
    e.preventDefault();
    setSearch({});
    setEmail('');
    setError(false);
    //localStorage.setItem('searchEmail','');
}

    useEffect(() => {
                
            getData();            
        }, []);

    if (props.type === 'general'){
        return (
            <div className='content' >
                    <div className="contform">
                        <Form className='contentform'>
                            <Form.Control type="email" value={email} placeholder="example@example.com" onChange={(e) => setEmail(e.target.value)}/>
                            <Button variant= 'danger' type="submit" className='button' onClick={searchByEmail(email)}>Search</Button>
                            <Button variant= 'danger' type="submit" className='button' onClick={clearSearch}>Clear</Button>
                        </Form>
                        <Button variant='danger' type="submit" className='button-users'>Create</Button>
                        {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
                        {console.log(error)}
                    </div>
                    <div className='usersTable'>
                        <table>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                            </tr>
                        { Object.keys(search).length === 0 &&
                            users.map((user) => (
                                <tr>
                                    <td>{user.firstname} {user.lastname}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role} <Button>Delete</Button><Button>Edit</Button></td>
                                </tr>
                        ))}
                        { Object.keys(search).length > 1 &&
                            <tr>
                                <td>{search.firstname} {search.lastname}</td>
                                <td>{search.email}</td>
                                <td>{search.role} <Button>Delete</Button><Button id={search.email} onClick = {(e) => {handleEdit(e.target.id)}}>Edit</Button></td>
                            </tr>
                        }
                        </table>
                    </div>
            </div>
        )
    }else if (props.type === 'editUsers'){
        return (
            <div className='content' >
                <div className="contform">
                        <Form className='contentform'>
                            <Form.Group controlId='firstname'>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type='text' value={firstname} onChange={(e) => setFirstname(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='lastname'>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" value={lastname} onChange={(e) => setLastname(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='email'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='role'>
                                <Form.Label>Role</Form.Label>
                                <Form.Select>
                                    <option>{role}</option>
                                    <option>{option1}</option>
                                    <option>{option2}</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group controlId='password'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type='password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Button variant= 'danger' type="submit" className='button' id={id}>Update</Button>
                        </Form>
                </div>
            </div>
        )
    }
}

export default Users;