import React from "react";
import logo from "../../assets/nith_logo.png";
import { Link } from "react-router-dom";
import { Form, Input, Button } from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../../redux/alertSlice";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormData = async (e) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "https://nith-mentorship-server.onrender.com/api/user/login",
        e
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        toast.success("Welcome to NITH-Mentorship");
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <div className="hidden font-semibold text-xl cursor-pointer md:flex items-center text-gray-800 px-5 mt-1">
        <Link to="/" className="flex items-center font-Poppins">
          <img src={logo} className="w-12 rounded-lg mr-3" alt="NITH Logo" />/
          NITH-Mentorship
        </Link>
      </div>
      <div className="p-3 sm:p-10">
        <h2 className="text-3xl font-bold">Login</h2>
        <p className="mt-3">Find the best mentor for you!</p>
        <Form className="mt-6" layout="vertical" onFinish={handleFormData}>
          <Form.Item label="Email" name="email" className="font-semibold">
            <Input
              type="text"
              placeholder="enter ur email"
              className="rounded h-10 pl-5 text-base mb-3 border-x border-y border-gray-400"
            />
          </Form.Item>
          <Form.Item label="Password" name="password" className="font-semibold">
            <Input
              type="password"
              placeholder="enter ur password"
              className="rounded h-10 pl-5 text-base mb-3 border-x border-y border-gray-400"
            />
          </Form.Item>
          <Button
            className="bg-black rounded-md text-white font-normal text-sm h-11 w-full"
            htmlType="submit"
          >
            Login
          </Button>
        </Form>

        <div className="mt-5">
          <p className="cursor-pointer text-center">
            Don't have an account?{" "}
            <Link to="/register" className="underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
