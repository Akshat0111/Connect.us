import React, {useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'


function Profile() {
    const [mypics,setMypics] = useState([])
    const {state,dispatch} = useContext(UserContext)

    useEffect(() => {
        fetch('/allposts',{
            headers:{
                "Authorization":"Bearer " + localStorage.getItem("jwt")
            }
        }).then(res=>res.json()).then(result => {
            //console.log(result)
            setMypics(result.posts)
        })
    },[])
    return (
        <div style={{maxWidth:'550px',margin:'0px auto'}}>
            <div style={{display:'flex',justifyContent:'space-around',margin:'18px 0px',borderBottom:'1px solid grey'}}>
                <div>
                    <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                    src="https://images.unsplash.com/photo-1508674861872-a51e06c50c9b?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8Y29kZXxlbnwwfDJ8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                    alt="loading"/>
                </div>
                <div>
                    <h4>{state.name}</h4>
                    <div style={{display:'flex',justifyContent:"space-between",width:'108%'}}>
                        <h6>40 Posts</h6>
                        <h6>80 Followers</h6>
                        <h6>70 Following</h6>
                    </div>
                </div>
            </div>

            <div className="gallery">
                {
                    mypics.map(item => {
                        return(
                            <img key = {item._id} className="item" src={item.photo} alt= {item.title} />
                        )
                    })
                }
                
            </div>

        </div>
    )
}

export default Profile
