import { useSelector } from "react-redux";
import type { RootState } from "../../Redux/store";
import { Navigate} from "react-router-dom";

interface ProtectedRouteProps{
    children : React.ReactNode;
}


export default function ProtectedRoute({children}:ProtectedRouteProps) {
  const {token,user}  =useSelector((state:RootState)=> state.auth);

  /* if there are token and user , user entry to pages in app,
  if not , user entry to login page
  */

  if(token && user){
    return <>{children}</>
  }else{
    return <Navigate to="/" replace/>
  }
 
}
