import { useLocation, Navigate, Outlet } from "react-router-dom";
const RequireAuth = ({ children, allowedRoles }: any) => {
  const { role }: any = JSON.parse(localStorage.getItem("user") || "{}");
 

  const location = useLocation();


  if(allowedRoles?.includes(role)){
    return  children || <Outlet />
  }
  
  // else if(role){
  //   return  <Navigate to="/unauthorized" state={{ from: location }} replace />
  // }
  
  
  
  // else{
  //   return <Navigate to="/login" state={{ from: location }} replace />;
  // }
};
export default RequireAuth;

