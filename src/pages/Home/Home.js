import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { showLoading, hideLoading } from "../../redux/alertSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import MentorsCard from "../../components/Mentor/MentorsCard";
import { Row } from "antd";

const Home = () => {
  const dispatch = useDispatch();
  const [mentors, setMentors] = useState(null);

  const getMentors = async () => {
    dispatch(showLoading());
    try {
      const response = await axios.get(
        "https://nith-mentorship-server.onrender.com/api/admin/approved-mentors",
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
      toast.error("Error fetching mentors");
    }
  };

  useEffect(() => {
    getMentors();
  }, []);

  return (
    <Layout>
      <h1 className="text-lg underline">All Mentors listed below :</h1>
      <br />
      <Row>
        {mentors && mentors.map((mentor) => <MentorsCard mentor={mentor} />)}
      </Row>
    </Layout>
  );
};

export default Home;
