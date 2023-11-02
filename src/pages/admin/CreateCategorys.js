import { apiCreateCategory } from "apis";
import { Button, InputForm } from "components";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { getCategories } from "store/app/asyncActions";
import { getBase64 } from "ultils/helpers";

const CreateCategorys = () => {
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
    const base64Image = await getBase64(file);
    setPreview((prev) => ({ ...prev, image: base64Image }));
  };
  useEffect(() => {
    handlePreviewImage(watch("image")[0]);
  }, [watch("image")]);
  const handleCreateCategory = async (data) => {
    const finalPayload = { ...data, ...payload };
    const formData = new FormData();
    for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);
    if (finalPayload.image) formData.append("image", finalPayload.image[0]);
    if (finalPayload.brand) {
      // finalPayload.brand = finalPayload.brand.split(",").map((s) => s.trim());
      const brandArray = finalPayload.brand.split(",");
      for (let brand of brandArray) {
        formData.append("brand", brand);
      }
    }
    const response = await apiCreateCategory(formData);
    if (response.success) {
      toast.success(response.mes);
      reset();
      getCategories();
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
            label="Name category"
            register={register}
            errors={errors}
            id="title"
            validate={{
              required: "Need fill this field",
            }}
            style="flex-1"
            placeholder="Name of new category"
          />
          <InputForm
            label="Name brand"
            register={register}
            errors={errors}
            id="brand"
            validate={{
              required: "Need fill this field",
            }}
            style="flex-1"
            placeholder="Name of new brand"
          />
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
          <div className="my-6">
            <Button type="submit">Create New Category</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCategorys;
