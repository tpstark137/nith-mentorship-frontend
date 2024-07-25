import React from "react";
import AuthBanner from "../../components/AuthComponents/AuthBanner";
import RegisterForm from "../../components/AuthComponents/RegisterForm";

const Register = () => {
  return (
    <div className="flex flex-col sm:flex-row">
      <div>
        <AuthBanner />
      </div>
      <div className="w-full sm:w-3/6 pl-7 pt-7 sm:pt-14 md:w-2/5">
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
