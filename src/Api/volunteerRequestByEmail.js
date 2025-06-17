

export const volunteerRequestByEmail=(email,accessToken)=>{
    return fetch(`http://localhost:3000/volunteerRequests?email=${email}`,
        {
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
          }
    ).then(res=>res.json())
}
