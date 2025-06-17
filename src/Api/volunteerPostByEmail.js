

export const volunteerPostByEmail=(email,accessToken)=>{
    
    return fetch(`https://good-neighbor-server.vercel.app/volunteers/user?email=${email}`,{
        headers:{
            authorization:`Bearer ${accessToken}`
        }
    }).then(res=>res.json())
}
