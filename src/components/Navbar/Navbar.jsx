import { User } from "lucide-react";
import "./Navbar.scss";
import { BiLogIn, BiLogOut } from "react-icons/bi";

import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../../main";
import axios from "axios";
import { toast } from "sonner";
import { Context } from "../../Context/Context";
import { useContext, useState } from "react";

const Navbar = () => {
  const { user, dispatch } = useContext(Context);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${baseUrl}/auth/logout`, null, {
        withCredentials: true,
      });

      if (data && data.result == 1) {
        localStorage.removeItem("user");
        dispatch({ type: "LOGOUT" });
        toast.success(data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="navbar">
      <div className="">
        {user && (
          <Link to={"/profile"} className="navbar-left">
            <User className="user-icon" />
            <p>{user?.user?.name}</p>
          </Link>
        )}
      </div>

      <div className="navbar-right">
        {user ? (
          <Link className="primary-btn" onClick={handleLogout}>
            <BiLogOut className="login-icon" /> Logout
          </Link>
        ) : (
          <Link to={"/login"} className="primary-btn">
            <BiLogIn className="login-icon" /> Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
