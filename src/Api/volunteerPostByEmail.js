

export const volunteerPostByEmail=(email)=>{
    console.log(email);
    return fetch(`http://localhost:3000/volunteers?email=${email}`).then(res=>res.json())
}
