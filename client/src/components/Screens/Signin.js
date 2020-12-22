import React, {useState,useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
import {UserContext} from '../../App'

function Signin() {
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory();
    const [pwd,setPassword] = useState("")
    const [email,setEmail] = useState("")

    const PostData = () => {
        if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "Enter valid email address",classes:"#d32f2f red darken-2"})
            return
        }
        fetch("/signin",{
            method:"post",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                email,
                pwd
            })
        }).then(res => res.json()).then(data =>{
            if(data.error){
                M.toast({html: data.error,classes:"#d32f2f red darken-2"})
            }else{
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                M.toast({html: "Signedin Successfully",classes:"#388e3c green darken-2"})
                history.push('/')
            }
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div className="mycard">
            <div className = "card auth-card input-field">
                <h2>Connect.us</h2>
                <input type = "text" placeholder = "Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type = "password" placeholder = "Password" value={pwd} onChange={(e) => setPassword(e.target.value)}/>
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={() =>PostData()}>Signin</button>
                <h6><Link to = "/signup">Don't have an account?</Link></h6>
            </div>
        </div>
    )
}

export default Signin
