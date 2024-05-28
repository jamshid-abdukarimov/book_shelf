import React from "react";
import { FallingLines } from "react-loader-spinner";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "shared/lib/store";
import { selectUserLoading } from "shared/model/auth";
import checkAuth from "shared/utils/checkAuth";
import { Header } from "widgets/header";
const Layout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    checkAuth(navigate, dispatch);
  }, []);
  const loading = useAppSelector(selectUserLoading);
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <FallingLines color="#00BFFF" width="100" visible={true} />
      </div>
    );
  }
  return (
    <main>
      <Header />
      <Outlet />
    </main>
  );
};

export default Layout;
