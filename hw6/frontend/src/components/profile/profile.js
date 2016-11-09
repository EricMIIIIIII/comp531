import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import ProfileForm from './profileForm'
import Avatar from './avatar'



const Profile = () => {
    return(
    <div>
        <div className="pagetitle">
            <center>
            <h1><strong>Profile Page</strong></h1>
            </center>
        </div>
        <div id="profilefunction" className = "border">
            <Avatar/>
        </div>

        <div>    
            <ProfileForm/>
        </div>
    </div>
)}
export default Profile

