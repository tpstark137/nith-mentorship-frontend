import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import EditProfileForm from "../../components/UserProfile/EditProfileForm";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertSlice";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const EditProfile = () => {
  const [content, setContent] = useState(null);
  const dispatch = useDispatch();
  const params = useParams();

  const getProfileData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "https://nith-mentorship-server.onrender.com/api/user/get-edit-profile",
        { userId: params.userId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.data.success) {
        console.log(content);
        dispatch(hideLoading());
        setContent(response.data.data);
      } else {
        dispatch(hideLoading());
      }
    } catch (err) {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <Layout>
      <h1 className="font-bold underline">EDIT YOUR PROFILE</h1>
      {content && <EditProfileForm initialValues={content} />}
      {content === null && <EditProfileForm />}
    </Layout>
  );
};

export default EditProfile;
