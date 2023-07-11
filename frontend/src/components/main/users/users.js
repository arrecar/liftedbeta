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
    const [message, setMessage] = useState('')

    const getData = async () => {
        const { data } = await axios.get('/api/users');
        setUsers(data);
    }

    const handleDelete = async(id) => {
        console.log(id);
        try {
            const {data} = await axios.delete(`api/users/${id}`)
            setMessage('User deleted successfully');
            getData();
            props.updateContent('users');
        } catch (error){
            setError(error.response.data.message);
            props.updateContent('users');
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

            const {data} = await axios.put(`/api/users/${id}`,{firstname,lastname,email,password,role},config)
            setMessage('User updated successfully');
            setSearch({});
            setEmail('');
            getData();
            props.updateContent('users');

        }catch (error) {
            setError(error.response.data.message);
            props.updateContent('users')
        }
    }

    const handleEdit1 = async(email) =>{

        try{
            const { data } = await axios.get(`/api/users/${email}`)

        setFirstname(data.firstname);
        setLastname(data.lastname)
        setEmail(data.email);
        setRole(data.role);
        if (role === 'Administrator') {
            setOption1('Teacher');
            setOption2('Parent');
        } else if (role === 'Teacher') {
            setOption1('Administrator');
            setOption2('Parent')
        } else if (role === 'Parent') {
            setOption1('Administrator');
            setOption2('Teacher');
        }
        setPassword(data.password);
        setId(data._id);
        setError(false);
        setMessage('');
        props.updateContent('editUsers')
        
        //localStorage.setItem('searchEmail', JSON.stringify(data))
        } catch (error) {
            setError(error.response.data.message);
        }
    }

    const searchByEmail = (email) => async (e) =>{
        e.preventDefault();
        setError(false);
        console.log(email);

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

    const handleEdit = () => {
            //searchByEmail(email);
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
            setError(false);
            setMessage('');
            props.updateContent('editUsers');
    }

    const handleCreate = () =>{
                setError(false);
                setMessage('');
        props.updateContent('createUser');
    }

    const handleCreateUser = async(e) =>{
        e.preventDefault();

        try{

            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }
            const _id = id;
            const {data} = await axios.post(`api/users/create`,{ _id,firstname,lastname,email,role,password },config);
            setMessage('User created successfully');
            getData();
            props.updateContent('users');
        } catch (error){
            setError(error.response.data.message);
            props.updateContent('users');
        }
    }

const clearSearch = (e) =>{
    e.preventDefault();
    setSearch({});
    setEmail('');
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
                <h1>Users</h1>
                    <div className="contform">
                        <Form className='contentform'>
                            <Form.Control type="email" value={email} placeholder="example@example.com" onChange={(e) => setEmail(e.target.value)}/>
                            <Button variant= 'danger' type="submit" className='button' onClick={searchByEmail(email)}>Search</Button>
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
                                <th>Email</th>
                                <th>Role</th>
                            </tr>
                        { Object.keys(search).length === 0 &&
                            users.map((user) => (
                                <tr>
                                    <td>{user.firstname} {user.lastname}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role} <Button id={user._id} onClick={(e)=> {handleDelete(e.target.id)}}>Delete</Button><Button id={user.email} onClick = {(e) => {handleEdit1(e.target.id)}}>Edit</Button></td>
                                </tr>
                        ))}
                        { Object.keys(search).length > 1 &&
                            <tr>
                                <td>{search.firstname} {search.lastname}</td>
                                <td>{search.email}</td>
                                <td>{search.role} <Button id={search._id} onClick={(e)=> {handleDelete(e.target.id)}}>Delete</Button><Button id={search.email} onClick = {(e) => {handleEdit(e.target.id)}}>Edit</Button></td>
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
                    <h1>Edit User</h1>
                        <Form className='editCreateform' onSubmit={handleUpdate}>
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
                            <Form.Group controlId='password'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type='password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='role'>
                                <Form.Label>Role</Form.Label>
                                <Form.Select value = {role} onChange = {(e) => setRole(e.target.value)}>
                                    <option>{role}</option>
                                    <option>{option1}</option>
                                    <option>{option2}</option>
                                </Form.Select>
                            </Form.Group>

                            <Button variant= 'danger' type="submit" className='button' id={id}>Update</Button>
                        </Form>
                </div>
            </div>
        )
    } else if (props.type === 'createUser'){
        return (
            <div className='content' >
                <div className="contform">
                    <h1>Create User</h1>
                        <Form Form className = 'editCreateform' onSubmit = {handleCreateUser}>
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
                            <Form.Group controlId='password'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type='password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='role'>
                                <Form.Label>Role</Form.Label>
                                <Form.Select value = {role} onChange = {(e) => setRole(e.target.value)}>
                                    <option>Administrator</option>
                                    <option>Teacher</option>
                                    <option>Parent</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group controlId='_id'>
                                <Form.Label>Id</Form.Label>
                                <Form.Control type='number' value={id} onChange={(e) => setId(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Button variant= 'danger' type="submit" className='button'>Create</Button>
                        </Form>
                </div>
            </div>
        )
    }
}

export default Users;