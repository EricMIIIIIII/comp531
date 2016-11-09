import moment from 'moment'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { editArticle } from './articleActions'

class Comment extends Component {

    constructor(props) {
        super(props)        
        this.disabled = true
    }

    render() {
        const date = moment(new Date(this.props.date))
        return (
            <div >
                <h4>
                    <img id="commentfollowerImage" src={ this.props.avatar }/><br/>
                    {this.props.author} commented
                    on {date.format('MM-DD-YYYY')} at {date.format('HH:mm:ss')}
                </h4>
                <p>{this.props.text}</p>
            </div>
    )}
}

Comment.propTypes = {
    commentId: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    avatar: PropTypes.string,
}

export default connect()(Comment)


