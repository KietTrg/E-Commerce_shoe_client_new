import React, { Fragment, memo, useEffect, useState } from "react";
import logo from "assets/logo2.png";
import icons from "ultils/icons";
import { Link } from "react-router-dom";
import path from "ultils/path";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "store/user/userSlice";
import withBase from "hocs/withBase";
import { showCart } from "store/app/appSlice";
const { BsTelephoneFill, MdEmail, BiSolidShoppingBagAlt, BiSolidUser } = icons;
const Header = ({ dispatch }) => {
  const { current } = useSelector((state) => state.user);
  const [isShowOption, setIsShowOption] = useState(false);
  // const dispatch = useDispatch();
  useEffect(() => {
    const handleClickoutOptions = (e) => {
      const profile = document.getElementById("profile");
      if (!profile?.contains(e.target)) setIsShowOption(false);
    };
    document.addEventListener("click", handleClickoutOptions);
    return () => {
      document.removeEventListener("click", handleClickoutOptions);
    };
  }, []);
  return (
    <div className=" w-main flex justify-between h-[110px] py-[35px]">
      <Link to={`/${path.HOME}`}>
        <img src={logo} alt="logo" className=" w-[234px] object-contain"></img>
      </Link>
      <div className=" flex text-[13px]">
        <div className=" flex flex-col items-center px-6 border-r">
          <span className=" flex gap-4 items-center">
            <BsTelephoneFill color="#005f90"></BsTelephoneFill>
            <span className=" font-semibold">(+1800) 000 8808</span>
          </span>
          <span>Mon-Sat 9:00AM - 8:00PM</span>
        </div>
        <div className=" flex flex-col items-center px-6 border-r">
          <span className=" flex gap-4 items-center">
            <MdEmail color="#005f90"></MdEmail>
            <span className=" font-semibold">SUPPORT@TADATHEMES.COM</span>
          </span>
          <span>Online Support 24/7</span>
        </div>
        {current && (
          <Fragment>
            <div
              onClick={() => dispatch(showCart())}
              className=" cursor-pointer flex items-center justify-center gap-2 px-6 border-r"
            >
              <BiSolidShoppingBagAlt color="#005f90"></BiSolidShoppingBagAlt>
              <span>{`${current?.cart?.length || 0} item(s)`}</span>
            </div>
            <div
              onClick={() => setIsShowOption((prev) => !prev)}
              id="profile"
              className=" cursor-pointer flex items-center justify-center px-6 gap-2 relative"
            >
              <BiSolidUser color="#005f90" size={24}></BiSolidUser>
              <span>Profile</span>
              {isShowOption && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className=" absolute flex flex-col top-full left-[16px] bg-gray-100 min-w-[150px] py-2"
                >
                  <Link
                    className="p-2 hover:bg-sky-300 w-full"
                    to={`/${path.MEMBER}/${path.PERSONAL}`}
                  >
                    Pesonal
                  </Link>
                  {current.role === "1" && (
                    <Link
                      className="p-2 hover:bg-sky-300 w-full"
                      to={`/${path.ADMIN}/${path.DASHBOARD}`}
                    >
                      Admin
                    </Link>
                  )}
                  <span
                    onClick={() => dispatch(logout())}
                    className="p-2 hover:bg-sky-300 w-full"
                  >
                    Logout
                  </span>
                </div>
              )}
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default withBase(memo(Header));
