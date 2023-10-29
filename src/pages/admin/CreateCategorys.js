import React, { useCallback, useEffect, useState } from "react";
import { InputForm, Select, Button, MarkdownEditor, Loading } from "components";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { validate, getBase64 } from "ultils/helpers";
import { toast } from "react-toastify";
import { apiCreateCategory } from "apis";
import { showModal } from "store/app/appSlice";
import Swal from "sweetalert2";
// import { RiDeleteBin2Fill } from "react-icons/ri";
const CreateCategorys = () => {
  const { categories } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
  } = useForm();
  const [payload, setPayload] = useState();
  const [preview, setPreview] = useState({
    image: null,
  });
  const handlePreviewImage = async (file) => {
    const base64Thumb = await getBase64(file);
    setPreview((prev) => ({ ...prev, image: base64Thumb }));
  };
  useEffect(() => {
    handlePreviewImage(watch("image")[0]);
    // console.log(watch("thumb"));
  }, [watch("image")]);
  const handleCreateCategory = async (data) => {
    const finalPayload = { ...data, ...payload };
    console.log("finalPayload: ", finalPayload);
    const formData = new FormData();
    for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);
    if (finalPayload.image) formData.append("image", finalPayload.image[0]);
    if (finalPayload.brand) {
      // finalPayload.brand = finalPayload.brand.split(",").map((s) => s.trim());
      const brandArray = finalPayload.brand.split(",");
      for (let brand of brandArray) {
        formData.append("brand", brand);

        console.log("brand: ", brand);
      }
      console.log("finalPayload.brand: ", brandArray);
    }
    const response = await apiCreateCategory(formData);
    console.log("response: ", response);
    if (response.success) {
      toast.success(response.mes);
      reset();
      setPayload({
        image: "",
      });
    } else toast.error(response.mes);
  };
  return (
    <div className="w-full ">
      <h1 className="h-[75px] flex justify-between items-center text-3xl font-bold p-4 border-b-2 border-main">
        <span className="text-main">Create New Category</span>
      </h1>
      <div className="p-4">
        <form onSubmit={handleSubmit(handleCreateCategory)}>
          <InputForm
            label="Name Category"
            register={register}
            errors={errors}
            id="title"
            validate={{
              required: "Need fill this field",
            }}
            style="flex-1"
            placeholder="Name of new Category"
          />
          <InputForm
            label="Brand Category"
            register={register}
            errors={errors}
            id="brand"
            validate={{
              required: "Need fill this field",
            }}
            style="flex-auto"
            placeholder="Brand of new Category"
            fullWidth
          />
          {/* <div className="w-full flex gap-4 my-6">
            <InputForm
              label="Brand Category"
              register={register}
              errors={errors}
              id="brand"
              validate={{
                required: "Need fill this field",
              }}
              style="flex-auto"
              placeholder="Price of new Category"
              type="number"
              fullWidth
            />
            <InputForm
              label="Quantity product"
              register={register}
              errors={errors}
              id="quantity"
              validate={{
                required: "Need fill this field",
              }}
              style="flex-auto"
              placeholder="Quantity of new product"
              type="number"
              fullWidth
            />
            <InputForm
              label="Color product"
              register={register}
              errors={errors}
              id="color"
              validate={{
                required: "Need fill this field",
              }}
              style="flex-auto"
              placeholder="Color of new product"
              fullWidth
            />
            <InputForm
              label="Size product"
              register={register}
              errors={errors}
              id="size"
              validate={{
                required: "Need fill this field",
              }}
              style="flex-auto"
              placeholder="Size of new product"
              fullWidth
            />
          </div>
          <div className="w-full flex gap-4 my-6">
            <Select
              label="Category"
              options={categories?.map((el) => ({
                code: el._id,
                value: el.title,
              }))}
              register={register}
              id="category"
              validate={{ required: "Need fill this field" }}
              style="flex-auto"
              errors={errors}
              fullWidth
            />
            <Select
              label="Brand (Optional)"
              options={categories
                ?.find((el) => el._id === watch("category"))
                ?.brand?.map((el) => ({
                  code: el,
                  value: el,
                }))}
              register={register}
              id="brand"
              style="flex-auto"
              errors={errors}
              fullWidth
            />
          </div> */}
          {/* <MarkdownEditor
            name="description"
            changeValue={changeValue}
            label="Description"
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          /> */}
          <div className="flex flex-col gap-2 mt-8">
            <label className="font-semibold" htmlFor="image">
              Upload image image
            </label>
            <input
              type="file"
              id="image"
              {...register("image", { required: "Need fill" })}
            />
            {errors["image"] && (
              <small className="text-xs text-red-600">
                {errors["image"]?.message}
              </small>
            )}
          </div>
          {preview.image && (
            <div className="my-4">
              <img
                className="w-[200px] object-contain"
                src={preview.image}
                alt="image"
              ></img>
            </div>
          )}
          {/* <div className="flex flex-col gap-2 mt-8">
            <label className="font-semibold" htmlFor="products">
              Upload images of product
            </label>
            <input
              type="file"
              id="products"
              multiple
              {...register("images", { required: "Need fill" })}
            />
            {errors["images"] && (
              <small className="text-xs text-red-600">
                {errors["images"]?.message}
              </small>
            )}
          </div>
          {preview.images.length > 0 && (
            <div className="my-4  flex gap-3 w-full flex-wrap">
              {preview.images?.map((el, index) => (
                <div key={index} className="w-fit relative">
                  <img
                    className="w-[200px] object-contain"
                    src={el.path}
                    alt="product"
                  ></img>
                </div>
              ))}
            </div>
          )} */}
          <div className="my-6">
            <Button type="submit">Create New Product</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCategorys;
