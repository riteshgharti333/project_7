import "./Sidebar.scss";

import logo from "../../assets/images/logo.png";
import { sidebarItems } from "../../assets/data";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sideabr-logo">
        <img src={logo} alt="Logo" />
        <div className="sideabr-logo-desc">
          <p>Star</p>
          <p>Marketing</p>
        </div>
      </div>

      <div className="sidebar-items">
        {sidebarItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <NavLink
              to={`/${item.link}`}
              key={index}
              className={({ isActive }) =>
                isActive ? "sidebar-item active" : "sidebar-item"
              }
            >
              <Icon className="sidebar-icon" />
              <p>{item.title}</p>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
