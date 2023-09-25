import React from "react";
import {
  Sidebar,
  Banner,
  BestSeller,
  DealDaily,
  FeatureProduct,
  CustomSlider,
} from "../../components";
import { useSelector } from "react-redux";
import icons from "../../ultils/icons";
const { IoIosArrowForward } = icons;
const Home = () => {
  const { newProducts } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.app);
  console.log(categories);
  return (
    <div>
      <div className="w-main flex">
        <div className=" flex flex-col gap-5 w-[25%] flex-auto ">
          <Sidebar></Sidebar>
          <DealDaily></DealDaily>
        </div>
        <div className=" flex flex-col gap-5 pl-5 w-[75%] flex-auto ">
          <Banner></Banner>
          <BestSeller></BestSeller>
        </div>
      </div>
      <div className="my-8">
        <FeatureProduct></FeatureProduct>
      </div>
      <div className="my-8 w-full">
        <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
          NEW ARIVALS
        </h3>
        <div className="  mt-4 mx-[-10px] ">
          <CustomSlider products={newProducts} />
        </div>
      </div>
      <div className="my-8 w-full">
        <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
          HOT COLLECTIONS
        </h3>
        <div className=" flex flex-wrap gap-4 mt-4 ">
          {categories
            ?.filter((el) => el.brand.length > 0)
            ?.map((el) => (
              <div key={el._id} className="w-[396px]">
                <div className=" shadow-lg rounded-xl flex p-4 gap-4 min-h-[190px]">
                  <img
                    src={el?.image}
                    alt="imgCategory"
                    className="flex-1 w-[144px] h-[129px] object-cover"
                  ></img>
                  <div className="flex-1 text-gray-700">
                    <h4 className=" font-semibold uppercase">{el.title}</h4>
                    <ul className=" text-sm">
                      {el?.brand?.map((item) => (
                        <span className="flex gap-1 items-center text-gray-500">
                          <IoIosArrowForward size={14}></IoIosArrowForward>
                          <li key={item}>{item}</li>
                        </span>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="my-8 w-full">
        <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
          BLOG POSTS
        </h3>
      </div>
      <div className="w-full h-[500px] bg-main">Footer</div>
    </div>
  );
};

export default Home;
