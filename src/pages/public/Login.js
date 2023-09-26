import React, { useState, useCallback } from "react";
import { InputField, Button } from "../../components";
const Login = () => {
  const [payload, setPayload] = useState({ email: "", password: "", name: "" });
  const [isRegiter, setIsRegiter] = useState(false);
  const handleSubmit = useCallback(() => {
    console.log(payload);
  }, [payload]);
  return (
    <div className=" w-screen h-screen relative">
      <img
        src="https://lh3.google.com/u/0/d/1rWf8iB40OPJzlRGA_EnY87LQxS8a7fZZ=w1243-h865-iv1"
        alt="bg"
        className=" w-full h-full object-cover"
      ></img>
      <div className=" absolute top-0 left-0 right-1/2 bottom-0 flex items-center justify-center">
        <div className="p-8 bg-white flex flex-col items-center rounded-md min-w-[500px] ">
          <h1 className="text-[40px] font-semibold text-main mb-8">
            {isRegiter ? "Regiter" : "Login"}
          </h1>
          {isRegiter && (
            <InputField
              value={payload.name}
              setValue={setPayload}
              nameKey="name"
            />
          )}
          <InputField
            value={payload.email}
            setValue={setPayload}
            nameKey="email"
          />
          <InputField
            value={payload.password}
            setValue={setPayload}
            nameKey="password"
            type="password"
          />
          <Button
            name={isRegiter ? "Regiter" : "Login"}
            handleOnClick={handleSubmit}
            fw
          />
          <div className=" flex items-center justify-between my-2 w-full text-sm">
            {!isRegiter && (
              <span className="text-main hover:underline cursor-pointer">
                Forgot your account ?
              </span>
            )}
            {!isRegiter && (
              <span
                className="text-main hover:underline cursor-pointer"
                onClick={() => setIsRegiter(true)}
              >
                Create account
              </span>
            )}
            {isRegiter && (
              <span
                className="text-main hover:underline cursor-pointer w-full text-center"
                onClick={() => setIsRegiter(false)}
              >
                Go Login
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
