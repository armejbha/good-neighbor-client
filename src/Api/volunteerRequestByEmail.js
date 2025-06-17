

export const volunteerRequestByEmail=(email,accessToken)=>{
    return fetch(`https://good-neighbor-server.vercel.app/volunteerRequests?email=${email}`,
        {
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
          }
    ).then(res=>res.json())
}
