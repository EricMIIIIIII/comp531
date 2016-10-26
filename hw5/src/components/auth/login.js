import React from 'react'
import { connect } from 'react-redux'

import { localLogin } from './authActions'

const Login = ({dispatch}) => {
    let username, password
    return (
        <div className = "indexbody">
            <table className = "indextable">
            <tr>
                <td>
                <span>Account Name:</span>
                </td>
                <td>
                <input type="text" id="userName" placeholder = "Username" required
                ref={(node) => { username = node }}/>
                </td>
            </tr>

            <tr>
                <td>
                <span>Password:</span>
                </td>
                <td>
                <input type="password" id="loginpassword" placeholder="Password" required
                ref={(node) => { password = node }}/>
                </td>
            </tr>
            </table>  
            <button type="submit" id="login" class ="inputbtn" required
            onClick={() => { dispatch(localLogin(username.value, password.value)) }}>Login</button>
        </div>
    )
}

export default connect()(Login)

