import React from 'react'

function CreatePost() {
    return (
        <div className="card input-feild" style={{margin:'30px auto',maxWidth:'500px',padding:'20px',textAlign:'center'}}>
            <input type="text" placeholder="Title"/>
            <input type="text" placeholder="Body"/>
            <div className="file-field input-field">
            <div className="btn #64b5f6 blue darken-1">
                <span>Upload Image</span>
                <input type="file"/>
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text"/>
            </div>
            </div>
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1">Submit Post</button>
        </div>
    )
}

export default CreatePost
