import React from "react";
import Layout from "../../components/Layout/Layout";
import { Tabs } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertSlice";
import { setUser } from "../../redux/usersSlice";
import toast from "react-hot-toast";
import axios from "axios";

const Notifications = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const markAllAsSeen = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "https://nith-mentorship-server.onrender.com/api/user/mark-notification-seen",
        { userId: user._id },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.data));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };
  const deleteAllMessages = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "https://nith-mentorship-server.onrender.com/api/user/delete-all-notification",
        { userId: user._id },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.data));
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
      <h1 className="text-lg">Notifications</h1>
      <Tabs>
        <Tabs.TabPane tab="unseen" key={0}>
          <div className="flex justify-end">
            <h1
              className="text-lg underline cursor-pointer"
              onClick={() => markAllAsSeen()}
            >
              Mark all as seen
            </h1>
          </div>
          {user?.unseenNotifications.map((notification) => (
            <div
              className="text-lg shadow-lg shadow-gray-500/50 mt-5 p-2"
              onClick={() => navigate(notification.onClickPath)}
            >
              <div className="card-text">{notification.message}</div>
            </div>
          ))}
        </Tabs.TabPane>
        <Tabs.TabPane tab="seen" key={1}>
          <div className="flex justify-end">
            <h1
              className="text-lg underline cursor-pointer"
              onClick={() => deleteAllMessages()}
            >
              Delete all
            </h1>
          </div>
          {user?.seenNotifications.map((notification) => (
            <div
              className="text-lg shadow-lg shadow-gray-500/50 mt-5 p-2"
              onClick={() => navigate(notification.onClickPath)}
            >
              <div className="card-text">{notification.message}</div>
            </div>
          ))}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
};

export default Notifications;
