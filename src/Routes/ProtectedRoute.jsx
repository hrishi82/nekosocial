
import { Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export const ProtectedRoute = ({children}) => {
	const  {token}  = useSelector(store=>store.auth)
	// console.log(token)
	return token ? children : <Navigate to="/loginpage" replace/>;
};
