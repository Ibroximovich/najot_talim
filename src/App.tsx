
import { useCookies } from "react-cookie"
import { DashboartRoats, LoginRoats } from "./routes"


function App() {
  
  const [cookies] = useCookies(["accessToken"])
 

 return cookies.accessToken ? <DashboartRoats/> : <LoginRoats/>
}

export default App
