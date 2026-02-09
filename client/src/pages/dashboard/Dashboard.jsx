import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const Dashboard = () => {


  const {user} = useSelector(state => state.auth)

  const userName =  JSON.parse(localStorage.getItem("user"))


  useEffect(()=>{
    console.log(user)
  },[user])

  // if(!user){
  //   return <> loading user </>
  // }

  return (
    <div>Dashboard,Hello {userName.name}</div>
  )
}

export default Dashboard