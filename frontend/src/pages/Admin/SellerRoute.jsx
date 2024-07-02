import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

const SellerRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo && userInfo.isSeller ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default SellerRoute;
