import { Badge, message } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Layout.css";
import logo from "../../assets/nith_logo.png";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  // logout function
  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully");
    navigate("/login");
  };
  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "My Appointments",
      path: "/appointments",
      icon: "ri-file-list-line",
    },
    {
      name: "Apply Mentor",
      path: "/apply-mentor",
      icon: "ri-user-line",
    },
    {
      name: "Profile",
      path: `/edit-profile/${user?._id}`,
      icon: "ri-profile-line",
    },
  ];

  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Users",
      path: "/admin/all-users",
      icon: "ri-user-line",
    },
    {
      name: "Mentors",
      path: "/admin/all-mentors",
      icon: "ri-hospital-line",
    },
    {
      name: "Events",
      path: "/admin/events",
      icon: "ri-file-list-line",
    },
  ];

  const mentorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "My Appointments",
      path: "/mentor/appointments",
      icon: "ri-file-list-line",
    },
    {
      name: "Pending Appointments",
      path: "/mentor/requested-appointments",
      icon: "ri-file-list-line",
    },
    {
      name: "Profile",
      path: `/edit-profile/${user?._id}`,
      icon: "ri-profile-line",
    },
  ];

  const SidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isMentor
    ? mentorMenu
    : userMenu;

  return (
    <>
      <div className={`main`}>
        <div className="layout">
          <div className="sidebar">
            <div className="hidden font-semibold text-xl cursor-pointer md:flex items-center text-gray-800 px-2 mt-1">
              <Link to="/" className="flex items-center font-Poppins">
                <img
                  src={logo}
                  className="w-12 rounded-lg mr-3"
                  alt="NITH Logo"
                />
                / NITH-Mentorship
              </Link>
            </div>
            <div className="menu">
              {SidebarMenu.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <div
                    key={menu.name}
                    className={`menu-item ${isActive && "active"}`}
                  >
                    <i className={menu.icon}></i>
                    <Link to={menu.path}>{menu.name}</Link>
                  </div>
                );
              })}
              <div className="menu-item" onClick={handleLogout}>
                <i className="ri-logout-box-line"></i>
                <Link to="/logout">Logout</Link>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="header flex justify-end align-middle">
              <div className="px-4 text-lg">
                <Badge count={user?.unseenNotifications.length}>
                  <i
                    className="ri-notification-line text-[24px] cursor-pointer px-2"
                    onClick={() => navigate("/notifications")}
                  ></i>
                </Badge>
                <Link className="anchor px-3 underline">{user?.name}</Link>
              </div>
            </div>
            <div className="body overflow-auto">
              <div>{children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
