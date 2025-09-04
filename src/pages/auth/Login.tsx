

// export default Login
import { FormLogin } from "../../modules"
import LoadingImg from "../../assets/images/loadingImg.svg"
 // CSS alohida

const Login = () => {
  return (
    <div className="relative w-full h-[100vh] flex justify-center items-center overflow-hidden ">
      
      <div className="background">
        <img src={LoadingImg} alt="loading" className="image" />
        <img src={LoadingImg} alt="loading" className="image" />
        <img src={LoadingImg} alt="loading" className="image" />
        <img src={LoadingImg} alt="loading" className="image" />
        <img src={LoadingImg} alt="loading" className="image" />
        <img src={LoadingImg} alt="loading" className="image" />
      </div>

      <div className="z-10 w-[360px]">
        <FormLogin />
      </div>
    </div>
  )
}

export default Login
