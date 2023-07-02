import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT} from "../constants/userConstants";
import axios from 'axios';
import {Navigate, useNavigate} from 'react-router-dom';


const login = (email, password) => async (dispatch) => {
    const navigate = useNavigate();
    try {
        const config = {
            headers: {
            "Content-type":"application/json"
            }
        }

        const {data} = await axios.post('/api/users/login', {email,password},config);
        
        dispatch({type: USER_LOGIN_SUCCESS, payload: data});

        localStorage.setItem("authenticated",true);
        localStorage.setItem('userinfo',JSON.stringify(data));
        navigate('/mainpage');

        //setLoading(false);
        } catch (error) {
            dispatch({
                type: USER_LOGIN_FAIL,
                payload:
                    error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
            });
        //setError(error.response.data.message);
        }
};

export default login;