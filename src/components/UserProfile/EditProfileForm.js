import { Col, Form, Input, Row } from "antd";
import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../../redux/alertSlice";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

const EditProfileForm = ({ initialValues }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      console.log(values);
      const response = await axios.post(
        "https://nith-mentorship-server.onrender.com/api/user/edit-profile",
        {
          userId: user._id,
          ...values,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ ...initialValues }}
      >
        <h1 className="card-title mt-3 mb-2">Personal Information</h1>
        <Row gutter={20}>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="First Name"
              name="firstName"
              rules={[{ required: true }]}
            >
              <Input placeholder="enter ur first name" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="Last Name"
              name="lastName"
              rules={[{ required: true }]}
            >
              <Input placeholder="enter ur last name" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="Phone Number"
              name="phoneNumber"
              rules={[{ required: true }]}
            >
              <Input placeholder="enter ur phone number" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item required label="Your bio" name="bio">
              <Input placeholder="I am a software developer" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="Enter your state?"
              name="state"
              rules={[{ required: true }]}
            >
              <Input placeholder="e.g, Himachal Pradesh" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="Enter your city?"
              name="city"
              rules={[{ required: true }]}
            >
              <Input placeholder="e.g, Hamirpur" />
            </Form.Item>
          </Col>
        </Row>
        <hr />
        <h1 className="card-title mt-3 mb-2">Educational detail </h1>
        <Row gutter={20}>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="Degree"
              name="degree"
              rules={[{ required: true }]}
            >
              <Input placeholder="e.g, B.tech " />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="Major"
              name="major"
              rules={[{ required: true }]}
            >
              <Input placeholder="e.g, cse " />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="College passout Year"
              name="passoutYear"
              rules={[{ required: true }]}
            >
              <Input placeholder="enter your passout year" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="School Name"
              name="schoolName"
              rules={[{ required: true }]}
            >
              <Input placeholder="enter your school name" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="School passout Year"
              name="schoolPassoutYear"
              rules={[{ required: true }]}
            >
              <Input placeholder="enter your passout year" />
            </Form.Item>
          </Col>
        </Row>
        <hr />
        <h1 className="card-title mt-3 mb-2">Your skills</h1>
        <Row gutter={20}>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="Skills"
              name="skills"
              rules={[{ required: true }]}
            >
              <Input placeholder="e.g, Software Engineering " />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="Resume Link"
              name="resumeLink"
              rules={[{ required: true }]}
            >
              <Input placeholder="paste your resume link" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="LinkedIn Profile"
              name="linkedIn"
              rules={[{ required: true }]}
            >
              <Input placeholder="enter your profile link" />
            </Form.Item>
          </Col>
        </Row>
        <div className="flex justify-end">
          <button
            className="p-2 px-4 font-medium text-sm rounded-md bg-black text-white hover:bg-green-500 hover:text-black "
            htmlType="submit"
          >
            Submit
          </button>
        </div>
      </Form>
      ;
    </>
  );
};

export default EditProfileForm;
