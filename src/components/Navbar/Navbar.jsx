import { LogIn, User } from "lucide-react";
import "./Navbar.scss";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <User className="user-icon"/>
        <p>Star Marketing</p>
      </div>
      <div className="navbar-right">
        <button className="primary-btn">
          <LogIn className="login-icon"/> Login
        </button>
      </div>
    </div>
  );
};

export default Navbar;
