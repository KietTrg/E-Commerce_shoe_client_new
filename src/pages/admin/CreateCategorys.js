import { InputForm } from "components";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getBase64 } from "ultils/helpers";

const CreateCategorys = () => {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
  } = useForm();
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
  return (
    <div className="w-full ">
      <h1 className="h-[75px] flex justify-between items-center text-3xl font-bold p-4 border-b-2 border-main">
        <span className="text-main">Create New Category</span>
      </h1>
      <div className="p-4">
        <form>
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
        </form>
      </div>
    </div>
  );
};

export default CreateCategorys;
