import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGetProduct, apiGetProducts } from "apis";
import {
  Breadcrumb,
  Button,
  SelectQuantity,
  ProductExtraInfoItem,
  ProductInfomation,
  CustomSlider,
} from "components";
import Slider from "react-slick";
import ReactImageMagnify from "react-image-magnify";
import { formatMoney, formatPrice, renderStarFromNumber } from "ultils/helpers";
import { ProductExtraInfomation } from "ultils/contants";

const settings = {
  dots: false, //dau cham
  infinite: false,
  speed: 500,
  slidesToShow: 3, //trong 1 lan show
  slidesToScroll: 1,
};
const DetailProduct = ({ normal }) => {
  const { pid, title, category } = useParams();
  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState(null);
  const [update, setUpdate] = useState(false);
  const fetchProductData = async () => {
    const response = await apiGetProduct(pid);
    if (response.success) {
      setProduct(response.productData);
      setCurrentImage(response.productData?.thumb);
    }
    // console.log(response.productData);
  };
  const fetchProducts = async () => {
    const response = await apiGetProducts({ category });
    if (response.success) setRelatedProducts(response.productDatas);
  };
  useEffect(() => {
    if (pid) {
      fetchProductData();
      fetchProducts();
    }
    window.scrollTo(0, 0);
  }, [pid]);
  useEffect(() => {
    if (pid) fetchProductData();
  }, [update]);
  const rerender = useCallback(() => {
    setUpdate(!update);
  }, [update]);
  const handleQuantity = useCallback(
    (number) => {
      if (!Number(number) || Number(number) < 1) {
        return;
      } else setQuantity(number);
    },
    [quantity]
  );
  const handleChangeQuantity = useCallback(
    (flag) => {
      if (flag === "minus" && quantity === 1) return;
      if (flag === "minus") setQuantity((prev) => +prev - 1);
      if (flag === "plus") setQuantity((prev) => +prev + 1);
    },
    [quantity]
  );
  const handleClickImage = (e, el) => {
    e.stopPropagation();
    setCurrentImage(el);
  };
  // console.log(pid, title);
  return (
    <div className="w-full">
      <div className="h-[81px] flex justify-center items-center bg-gray-100">
        <div className="w-main">
          <h3 className="font-semibold mb-2">{title}</h3>
          <Breadcrumb title={title} category={category}></Breadcrumb>
        </div>
      </div>
      <div className="w-main m-auto mt-4 flex">
        <div className=" flex flex-col gap-4 w-2/5">
          <div className="h-[458px] w-[458px] border  object-cover">
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: "Wristwatch by Ted Baker London",
                  isFluidWidth: true,
                  // src: product?.thumb,
                  src: currentImage,
                },
                largeImage: {
                  // src: product?.thumb,
                  src: currentImage,
                  width: 1800,
                  height: 1500,
                },
              }}
            />
          </div>
          <div className="w-[458px]">
            <Slider
              {...settings}
              className="img-slider justify-center flex gap-2"
            >
              {product?.images?.map((el) => (
                <div key={el} className="flex-1 ">
                  <img
                    onClick={(e) => handleClickImage(e, el)}
                    src={el}
                    alt="sub-product"
                    className="h-[143px] w-[143px] cursor-pointer border object-cover"
                  ></img>
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div className="w-2/5 flex flex-col gap-4 pr-[24px]  ">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-[30px]">{`${formatMoney(
              formatPrice(product?.price)
            )} VND`}</h2>
            <span className="text-sm text-main">{`Kho: ${product?.quantity}`}</span>
          </div>
          <div className="flex items-center gap-1">
            {renderStarFromNumber(product?.totalRatings)?.map((el, index) => (
              <span key={index}>{el}</span>
            ))}
            <span className="text-sm text-main italic">{`(Đã bán: ${product?.sold} sản phẩm)`}</span>
          </div>
          <ul className="text-sm text-gray-400 list-square pl-5">
            {product?.description?.map((el, index) => (
              <li className=" leading-7" key={index}>
                {el}
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <span className=" font-semibold">Số lượng</span>
              <SelectQuantity
                quantity={quantity}
                handleQuantity={handleQuantity}
                handleChangeQuantity={handleChangeQuantity}
              ></SelectQuantity>
            </div>
            <Button fw>Add to cart</Button>
          </div>
        </div>
        <div className="w-1/5 ">
          {ProductExtraInfomation.map((el) => (
            <ProductExtraInfoItem
              key={el.id}
              title={el.title}
              sub={el.sub}
              icon={el.icon}
            />
          ))}
        </div>
      </div>
      <div className="w-main m-auto mt-8">
        <ProductInfomation
          totalRatings={product?.totalRatings}
          ratings={product?.ratings}
          nameProduct={product?.title}
          pid={product?._id}
          rerender={rerender}
        />
      </div>
      <div className="w-main m-auto mt-8">
        <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
          OTHER CUSTOMERS ALSO BUY:
        </h3>
        <div className="  mt-4 mx-[-10px] ">
          <CustomSlider normal={true} products={relatedProducts} />
        </div>
      </div>
      {/* <div className="h-[500px] w-full"></div> */}
    </div>
  );
};

export default DetailProduct;
