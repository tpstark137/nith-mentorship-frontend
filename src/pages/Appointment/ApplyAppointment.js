import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertSlice";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

const ApplyAppointment = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const param = useParams();
  const [mentor, setMentor] = useState(null);
  const mentorId = param.mentorId;

  const bookAppointment = async () => {
    try {
      dispatch(showLoading());
      const studentId = user._id;
      const response = await axios.post(
        "https://nith-mentorship-server.onrender.com/user/book-appointment",
        {
          studentId: studentId,
          mentorId: mentorId,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.data.success) {
        dispatch(hideLoading());
        toast.success("Appointment done successfully");
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  const getMentorsData = async () => {
    dispatch(showLoading());
    try {
      const response = await axios.post(
        "https://nith-mentorship-server.onrender.com/mentor/get-mentor-data",
        {
          mentorId: mentorId,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.data.success) {
        setMentor(response.data.data);
        dispatch(hideLoading());
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Unable to get mentors data");
    }
  };

  const checkAvailableSlots = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "https://nith-mentorship-server.onrender.com/mentor/check-available-slots",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.data.success) {
        dispatch(hideLoading());
        toast.success("Slots are available at this moment");
      } else {
        dispatch(hideLoading());
        toast.error("No slots are available, check another slot");
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Unable to fetch time slots");
    }
  };

  useEffect(() => {
    getMentorsData();
  }, []);

  return <Layout>Apply for Appointment</Layout>;
};

export default ApplyAppointment;
