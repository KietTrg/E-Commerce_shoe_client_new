import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import {
  Login,
  Home,
  Public,
  FAQ,
  Services,
  Blogs,
  DetailProduct,
  Products,
  FinalRegister,
  ResetPassword,
} from "./pages/public";
import {
  AdminLayout,
  ManageOrder,
  ManageProducts,
  ManageUser,
  CreateProducts,
  Dashboard,
} from "pages/admin";
import { MemberLayout, Personal } from "pages/member";
import path from "./ultils/path";
import { getCategories } from "./store/app/asyncActions";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal } from "./components";
function App() {
  const dispatch = useDispatch();
  const { isShowModal, modalChildren } = useSelector((state) => state.app);
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  return (
    <div className="min-h-screen relative font-main">
      {isShowModal && <Modal>{modalChildren}</Modal>}
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />}></Route>
          <Route path={path.BLOGS} element={<Blogs />}></Route>
          <Route
            path={path.DETAIL_PRODUCT__CATEGORY__PID__TITLE}
            element={<DetailProduct />}
          ></Route>
          <Route path={path.FAQ} element={<FAQ />}></Route>
          <Route path={path.OUR_SERVICES} element={<Services />}></Route>
          <Route path={path.PRODUCTS} element={<Products />}></Route>
          <Route path={path.RESET_PASSWORD} element={<ResetPassword />}></Route>
          <Route path={path.ALL} element={<Home />}></Route>
        </Route>
        <Route path={path.ADMIN} element={<AdminLayout />}>
          <Route path={path.DASHBOARD} element={<Dashboard />}></Route>
          <Route path={path.MANAGE_ORDER} element={<ManageOrder />}></Route>
          <Route
            path={path.MANAGE_PRODUCTS}
            element={<ManageProducts />}
          ></Route>
          <Route path={path.MANAGE_USER} element={<ManageUser />}></Route>
          <Route
            path={path.CREATE_PRODUCTS}
            element={<CreateProducts />}
          ></Route>
        </Route>
        <Route path={path.MEMBER} element={<MemberLayout />}>
          <Route path={path.PERSONAL} element={<Personal />}></Route>
        </Route>
        <Route path={path.FINAL_REGISTER} element={<FinalRegister />}></Route>
        <Route path={path.LOGIN} element={<Login />}></Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </div>
  );
}

export default App;
