import React from "react";
import logo from "../assets/logo2.png";
import icons from "../ultils/icons";
import { Link } from "react-router-dom";
import path from "../ultils/path";
const Header = () => {
  const { BsTelephoneFill, MdEmail, BiSolidShoppingBagAlt, BiSolidUser } =
    icons;
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
        <div className=" flex items-center justify-center gap-2 px-6 border-r">
          <BiSolidShoppingBagAlt color="#005f90"></BiSolidShoppingBagAlt>
          <span>0 item(s)</span>
        </div>
        <div className=" flex items-center justify-center px-6 ">
          <BiSolidUser size={24}></BiSolidUser>
        </div>
      </div>
    </div>
  );
};

export default Header;
