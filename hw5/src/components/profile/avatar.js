import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { uploadImage } from './profileActions'

class Avatar extends Component {

    componentDidUpdate(oldprops) {
        if (oldprops.img != this.props.img) {
            this.preview = undefined
            this.file = undefined
            this.forceUpdate()
        }
    }

    render() { return (
            <div>
                <center>
                <img width="100%" src={this.props.img}/>
                <input type="file" accept="image/*"/>
                <button id = "updateImagebtn">Update Profile Imgae</button>
                </center>
            </div>

    )}
}

export default connect(
    (state) => {
        return {
            img: state.profile.avatar
        }
    }
)(Avatar)
