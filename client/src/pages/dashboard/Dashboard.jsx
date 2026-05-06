import StatsDash from "./components/StatsDash"
import { FaArrowTrendUp } from "react-icons/fa6";
import { MdOutlinePendingActions } from "react-icons/md";
import { MdGroups } from "react-icons/md";
import { FaListCheck } from "react-icons/fa6";



const Dashboard = () => {


  const user =  JSON.parse(localStorage.getItem("user"))

  // const userName = user.name

  return (
    <div >
      {/* Welcome top part */}
      <div className="mb-3">
        {/* <h1 className="text-2xl font-bold">Welcome back, {userName}  </h1> */}
        <p className="text-gray-500 "> voici ce qui se passe dans votre entreprise aujourd'hui.</p>
      </div>

      {/* Stats */}
      <div className="flex justify-between gap-4">
        <StatsDash mainColor="text-[#16a34a]"  secColor={'bg-[#f0fdf4]'}  icon = {<FaArrowTrendUp size={25} color="#16a34a" />} status={"+12.5%"} title={"TOTAL SALES"} mainNumber={"$142.530.00"} />
        <StatsDash mainColor="text-[#141b6b]"  secColor={'bg-[#eff6ff]'}  icon = {<MdOutlinePendingActions size={25} color="#141b6b" />} status={"Active"} title={"PENDING ORDERS"} mainNumber={"48"} />
        <StatsDash mainColor="text-[#9333ea]"  secColor={'bg-[#faf5ff]'}  icon = {<MdGroups size={25} color="#9333ea"  />} status={"+4 new"} title={"ACTIVE CUSTOMERS"} mainNumber={"1,284"} />
        <StatsDash mainColor="text-[#dc2626]"  secColor={'bg-[#fef2f2]'}  icon = {<FaListCheck size={25} color="#dc2626" />} status={"Urgent"} title={"LOW STOCK ALERTS"} mainNumber={"12 items"} />
      </div>


    </div>
  )
}

export default Dashboard