import React from 'react';
import { useEffect, useState } from 'react';
import {Button, Form} from 'react-bootstrap';
import axios from 'axios';





const Users = (props) => {
    const [email, setEmail] = useState("")
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState({});

const getData = async () => {
    const { data } = await axios.get('/api/users');

        setUsers(data);
    }

const searchByEmail = (email) => async (e) =>{

    e.preventDefault();
    const { data } = await axios.get(`/api/users/${email}`);
    setSearch(data);
    //localStorage.setItem('search',JSON.stringify(data))
    //console.log(data)
    console.log(search)
}

const clearSearch = (e) =>{
    e.preventDefault();
    setSearch({});
    setEmail('');
    console.log(search)
}


    useEffect(() => {
        getData();
    }, []);

    console.log(search)

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
                                    <td>{user.role} <Button>Edit</Button><Button>Delete</Button></td>
                                </tr>
                        ))}
                        { Object.keys(search).length > 1 &&
                            <tr>
                                <td>{search.firstname} {search.lastname}</td>
                                <td>{search.email}</td>
                                <td>{search.role} <Button>Edit</Button><Button>Delete</Button></td>
                            </tr>
                        }
                        </table>
                    </div>
            </div>
        )
    }else {
        return (
            <div>
                <h1 className='welcome'>Create Users</h1>
            </div>
        )
    }
}

export default Users;