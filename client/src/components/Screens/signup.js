import React, {useState}  from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'


function Signup() {
    const history = useHistory();
    const [name,setName] = useState("")
    const [pwd,setPassword] = useState("")
    const [email,setEmail] = useState("")

    const PostData = () => {
        if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "Enter valid email address",classes:"#d32f2f red darken-2"})
            return
        }
        fetch("/signup",{
            method:"post",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                name,
                email,
                pwd
            })
        }).then(res => res.json()).then(data =>{
            if(data.error){
                M.toast({html: data.error,classes:"#d32f2f red darken-2"})
            }else{
                M.toast({html: data.message,classes:"#388e3c green darken-2"})
                history.push('/signin')
            }
        }).catch(err => {
            console.log(err);
        })
    }
    
    return (
        <div className="mycard">
            <div className = "card auth-card input-field">
                <h2>Connect.us</h2>
                <input type = "text" placeholder = "Name" value={name} onChange={(e) => setName(e.target.value)}/>
                <input type = "text" placeholder = "Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type = "password" placeholder = "Password" value={pwd} onChange={(e) => setPassword(e.target.value)}/>
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={() =>PostData()}>Signup</button>
                <h6><Link to = "/signin">Already have an account?</Link></h6>
            </div>
        </div>
    )
}

export default Signup
