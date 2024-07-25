import React from "react";
import { useNavigate } from "react-router-dom";

const MentorsCard = ({ mentor }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="w-auto m-2 bg-[#f7f7f7] text-black p-6 cursor-pointer"
        onClick={() => navigate(`/book-appointment/${mentor.userId}`)}
      >
        <div className="text-center font-bold mb-2">{mentor.name}</div>
        <div>
          <p>
            <b>Working In : </b>
            {mentor.companyName}
          </p>
          <p>
            <b>Designation : </b>
            {mentor.designation}
          </p>
          <p>
            <b>Total Year of Experience : </b>
            {mentor.experience}
          </p>
          <p>
            <b>Topics Mentoring : </b>
            {mentor.topics}
          </p>
        </div>
      </div>
    </>
  );
};

export default MentorsCard;
