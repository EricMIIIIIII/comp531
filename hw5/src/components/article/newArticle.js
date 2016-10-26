import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { uploadArticle } from './articleActions'

class NewArticle extends Component {

    render() { return (
        <div>
            <br/>
            <textarea id = "textplace" class="newPostBody"
              cols="80" rows="10" placeholder="Add a new article"
              value={ this.message }
              onChange={(e) => {
                this.message = e.target.value
                this.forceUpdate();
            }}>
            </textarea>


            <div >
                Add a picture
                <input type="file" id="articleImage" accept="image/*" onChange={(e) => this.handleImageChange(e)}/>
            </div>

            { !this.file && !this.message ? '' :
                <div>
                <button>Post</button>
                <button onClick = {() => {textplace.value = ''}}>Clear</button>
                </div>
            }

        </div>
    )}
}

export default connect()(NewArticle)

