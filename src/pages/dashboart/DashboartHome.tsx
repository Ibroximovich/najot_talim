import { useEffect } from "react"
import { PATH } from "../../components"


const DashboartHome = () => {
  useEffect(()=>{
    location.pathname =PATH.stacks
  },[])
  return ""
}
export default DashboartHome;
