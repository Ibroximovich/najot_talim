import { LoadingImg } from "../assets/images"


const LazyLoading = () => {
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <img className="loading-img" src={LoadingImg} alt="logo" width={100} height={100} />
    </div>
  )
}

export default LazyLoading
