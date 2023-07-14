import React from 'react';
import { useEffect, useState } from 'react';
import {Button, Form} from 'react-bootstrap';
import axios from 'axios';
import ErrorMessage from '../../ErrorMessage';
import Card from 'react-bootstrap/Card';



const Grades = (props) => {
    const [unit,setUnit] = useState(0);
    const [id,setId] = useState(0);
    const [grade, setGrade] = useState(0);
    const [student, setStudent] = useState(0)
    const [teacher, setTeacher] = useState("");
    const [comments, setComments] = useState("");
    const [grades, setGrades] = useState([]);
    const [search, setSearch] = useState({});
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('')
    const [children, setChildren] = useState([])
    const [childName, setChildname] = useState('');

    const getData = async () => {
        const { data } = await axios.get('/api/grades');
        setGrades(data);
    }

    const getChildren = async(email) => {
        const { data } = await axios.get(`api/students/email/${email}`)
        setChildren(data);
    }

    const handleSeeGrades = async(id,name) => {
        const { data } = await axios.get(`api/grades/student/${id}`);

        setChildname(name);
        setGrades(data);
        setError(false);
        setMessage('');
        props.updateContent('seeChildGrades');
    }

    const handleDelete = async(id) => {
        console.log(id);
        try {
            const {data} = await axios.delete(`api/grades/${id}`)
            setMessage('Grade deleted successfully');
            getData();
            props.updateContent('grades');
        } catch (error){
            setError(error.response.data.message);
            props.updateContent('grades');
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

            const {data} = await axios.put(`/api/grades/${id}`,{unit,grade,student,teacher,comments},config)
            setMessage('Grade updated successfully');
            setSearch({});
            setUnit(0);
            setGrade(0);
            setStudent(0);
            setTeacher('');
            setId(0);
            setComments('');
            getData();
            props.updateContent('grades');

        }catch (error) {
            setError(error.response.data.message);
            props.updateContent('grades')
        }
    }

    const handleEdit1 = async(id) =>{

        try{
            const { data } = await axios.get(`/api/grades/${id}`)

        setUnit(data.unit);
        setGrade(data.grade)
        setStudent(data.student);
        setTeacher(data.teacher);
        setComments(data.comments);
        setId(data._id);
        setError(false);
        setMessage('');
        props.updateContent('editGrades')
        
        //localStorage.setItem('searchEmail', JSON.stringify(data))
        } catch (error) {
            setError(error.response.data.message);
        }
    }

    const searchById = (id) => async (e) =>{
        e.preventDefault();
        setError(false);

        try{
        const { data } = await axios.get(`/api/grades/${id}`);
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
            setUnit(search.unit);
            setGrade(search.grade)
            setStudent(search.student);
            setTeacher(search.teacher);
            setComments(search.comments);
            setId(search._id);
            setError(false);
            setMessage('');
            props.updateContent('editGrades');
    }

    const handleCreate = () =>{
                setError(false);
                setMessage('');
        props.updateContent('createGrades');
    }

    const handleCreateGrade = async(e) =>{
        e.preventDefault();

        try{

            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }
            const _id = id;
            const {data} = await axios.post(`api/grades/create`,{ _id,unit,grade,student,teacher,comments },config);
            setMessage('Grade created successfully');
            getData();
            setUnit(0);
            setGrade(0);
            setStudent(0);
            setTeacher('');
            setComments('');
            setId(0);
            props.updateContent('grades');
        } catch (error){
            setError(error.response.data.message);
            props.updateContent('grades');
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
            if (props.role === "Parent"){
                const userinfo = JSON.parse(localStorage.getItem("userinfo"));
                const email = userinfo['email'];
                getChildren(email);
            }
            getData();            
        }, []);

    if (props.type === 'general'){
        return (
            <div className='content' >
                <h1>Grades</h1>
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
                                <th>Unit</th>
                                <th>Grade</th>
                                <th>Student ID</th>
                                <th>Teacher</th>
                                <th>Comments</th>
                            </tr>
                        { Object.keys(search).length === 0 &&
                            grades.map((grades) => (
                                <tr>
                                    <td>{grades.unit}</td>
                                    <td>{grades.grade}</td>
                                    <td>{grades.student}</td>
                                    <td>{grades.teacher}</td>
                                    <td>{grades.comments} <Button id={grades._id} onClick={(e)=> {handleDelete(e.target.id)}}>Delete</Button><Button id={grades._id} onClick = {(e) => {handleEdit1(e.target.id)}}>Edit</Button></td>
                                </tr>
                        ))}
                        { Object.keys(search).length > 1 &&
                            <tr>
                                <td>{search.unit}</td>
                                <td>{search.grade}</td>
                                <td>{search.student}</td>
                                <td>{search.teacher}</td>
                                <td>{search.comments} <Button id={search._id} onClick={(e)=> {handleDelete(e.target.id)}}>Delete</Button><Button id={search._id} onClick = {(e) => {handleEdit(e.target.id)}}>Edit</Button></td>
                            </tr>
                        }
                        </table>
                    </div>
            </div>
        )
    }else if (props.type === 'editGrades'){
        return (
            <div className='content' >
                <div className="contform">
                    <h1>Edit Grades</h1>
                        <Form className='editCreateform' onSubmit={handleUpdate}>
                            <Form.Group controlId='unit'>
                                <Form.Label>Unit</Form.Label>
                                <Form.Control type='number' value={unit} onChange={(e) => setUnit(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='grade'>
                                <Form.Label>Grade</Form.Label>
                                <Form.Control type="number" value={grade} onChange={(e) => setGrade(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='student'>
                                <Form.Label>Student ID</Form.Label>
                                <Form.Control type="number" value={student} onChange={(e) => setStudent(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='teacher'>
                                <Form.Label>Teacher Email Address</Form.Label>
                                <Form.Control type="email" value={teacher} onChange={(e) => setTeacher(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='comments'>
                                <Form.Label>Comments</Form.Label>
                                <Form.Control type="text" value={comments} onChange={(e) => setComments(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Button variant= 'danger' type="submit" className='button studentcreate' id={id}>Update</Button>
                        </Form>
                </div>
            </div>
        )
    } else if (props.type === 'createGrades'){
        return (
            <div className='content' >
                <div className="contform">
                    <h1>Create Grade</h1>
                        <Form Form className = 'editCreateform' onSubmit = {handleCreateGrade}>
                            <Form.Group controlId='unit'>
                                <Form.Label>Unit</Form.Label>
                                <Form.Control type='number' value={unit} onChange={(e) => setUnit(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='grade'>
                                <Form.Label>Grade</Form.Label>
                                <Form.Control type="number" value={grade} onChange={(e) => setGrade(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='student'>
                                <Form.Label>Student ID</Form.Label>
                                <Form.Control type="number" value={student} onChange={(e) => setStudent(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='teacher'>
                                <Form.Label>Teacher Email</Form.Label>
                                <Form.Control type="email" value={teacher} onChange={(e) => setTeacher(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='comments'>
                                <Form.Label>Comments</Form.Label>
                                <Form.Control type="text" value={comments} onChange={(e) => setComments(e.target.value)}></Form.Control>
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
    } else if (props.type === 'generalParent'){
        return(
            <div className='content'>
                <div className='cardContainer'>
                {children.map((child) => (
                    <Card>
                        <Card.Body>
                            <h1>{child.firstname}</h1>
                            <h4>{child.lastname}</h4>
                            <Button variant = 'danger' id = {child._id} name={child.firstname} onClick={(e) => handleSeeGrades(e.target.id,e.target.name)}>See Grades</Button>
                        </Card.Body>
                    </Card>
                ))}
                </div>
            </div>
        )
    } else if (props.type === 'seeChildGrades'){
        return(
            <div className='content'>
                <h1 className='titleGrade'>{childName}</h1>
            <div className='usersTable'>
                        <table>
                            <tr>
                                <th>Unit</th>
                                <th>Grade</th>
                                <th>Teacher</th>
                                <th>Comments</th>
                            </tr>
                            {grades.map((grades) => (
                                <tr>
                                    <td>{grades.unit}</td>
                                    <td>{grades.grade}</td>
                                    <td>{grades.teacher}</td>
                                    <td>{grades.comments}</td>
                                </tr>
                            ))}
                        </table>
            </div>
            </div>
        )
    }
}

export default Grades;