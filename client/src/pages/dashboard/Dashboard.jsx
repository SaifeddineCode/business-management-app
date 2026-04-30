const Dashboard = () => {


  

  const userName =  JSON.parse(localStorage.getItem("user"))



  // if(!user){
  //   return <> loading user </>
  // }

  return (
    <div>Dashboard,Hello {userName.name}</div>
  )
}

export default Dashboard