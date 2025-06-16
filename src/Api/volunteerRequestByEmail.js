

export const volunteerRequestByEmail=(email)=>{
    return fetch(`http://localhost:3000/volunteerRequests?email=${email}`).then(res=>res.json())
}
