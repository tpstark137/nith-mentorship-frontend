import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { showLoading, hideLoading } from "../../redux/alertSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Table } from "antd";
import toast from "react-hot-toast";

const Mentors = () => {
  const [mentors, setMentors] = useState(null);
  const dispatch = useDispatch();

  const changeMentorStatus = async (mentorId, status) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "https://nith-mentorship-server.onrender.com/api/admin/change-mentor-status",
        {
          mentorId: mentorId,
          status: status,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.data.success) {
        dispatch(hideLoading());
        toast.success(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Try again later");
    }
  };

  const column = [
    {
      title: "User Id",
      dataIndex: "userId",
      render: (text, record) => <span>{record.userId}</span>,
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Mentoring topic",
      dataIndex: "topics",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="flex">
          {record.status === "pending" && (
            <h1
              className="underline text-lg cursor-pointer"
              onClick={() => changeMentorStatus(record.userId, "approved")}
            >
              Approve
            </h1>
          )}
          {record.status === "approved" && (
            <h1 className="underline text-lg cursor-pointer">Block</h1>
          )}
        </div>
      ),
    },
  ];

  const getMentors = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get(
        "https://nith-mentorship-server.onrender.com/api/admin/get-mentors",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.data.success) {
        setMentors(response.data.data);
        dispatch(hideLoading());
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong , try again later");
    }
  };

  useEffect(() => {
    getMentors();
  }, []);

  return (
    <Layout>
      {mentors && <Table columns={column} dataSource={mentors} />}
    </Layout>
  );
};

export default Mentors;
