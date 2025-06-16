

export const volunteerPostByEmail=(email,accessToken)=>{
    
    return fetch(`http://localhost:3000/volunteers/user?email=${email}`,{
        headers:{
            authorization:`Bearer ${accessToken}`
        }
    }).then(res=>res.json())
}
