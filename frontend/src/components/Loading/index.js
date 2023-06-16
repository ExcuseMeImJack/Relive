import SyncLoader from "react-spinners/SyncLoader"

const Loading = ({type}) => {
  return (
    <div className={type ? "loading-" + type : "loading-bar"}>
      <SyncLoader color="#FF5A5F" size={30}/>
    </div>
  )
}

export default Loading;
