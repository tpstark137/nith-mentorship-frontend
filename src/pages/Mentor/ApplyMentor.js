import React from "react";
import Layout from "../../components/Layout/Layout";
import { Col, Form, Input, Row, TimePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import moment from "moment";

const ApplyMentor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      console.log(values);
      const response = await axios.post(
        "https://nith-mentorship-server.onrender.com/api/user/apply-mentor",
        {
          userId: user._id,
          ...values,
          timings: [
            moment(values.timings[0]).format("HH:mm"),
            moment(values.timings[1]).format("HH:mm"),
          ],
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
    <Layout>
      <h1 className="font-bold underline">APPLY TO BE A MENTOR</h1>
      <p>
        If you are interested in becoming a mentor, please fill out the form
        below.
      </p>
      <Form layout="vertical" onFinish={onFinishHandler}>
        <h1 className="card-title mt-3 mb-2">Professional Information</h1>
        <Row gutter={20}>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="Company Name"
              name="companyName"
              rules={[{ required: true }]}
            >
              <Input placeholder="e.g, Microsoft" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="Designation"
              name="designation"
              rules={[{ required: true }]}
            >
              <Input placeholder="e.g, Software Engineer" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="Joining date"
              name="joinDate"
              rules={[{ required: true }]}
            >
              <Input placeholder="enter ur joining date" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="Total Year of Experience"
              name="experience"
            >
              <Input type="number" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="Techstack"
              name="techstack"
              rules={[{ required: true }]}
            >
              <Input placeholder="e.g, Python, C++, MERN , Machine learning" />
            </Form.Item>
          </Col>
        </Row>
        <hr />
        <h1 className="card-title mt-3 mb-2">General Information</h1>
        <Row gutter={20}>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="Why you want to be a mentor"
              name="info"
              rules={[{ required: true }]}
            >
              <Input placeholder="your answer" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="Topics to mentor"
              name="topics"
              rules={[{ required: true }]}
            >
              <Input placeholder="e.g, 1:1 mentorship , Resume review , Mock interview " />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="Timings to mentor"
              name="timings"
              rules={[{ required: true }]}
            >
              <TimePicker.RangePicker />
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
    </Layout>
  );
};

export default ApplyMentor;
