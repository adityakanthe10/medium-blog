import { Outlet } from "react-router-dom";
import { Appbar } from "../../components/Appbar";

const Layout = () => {
  return (
    <div>
      <Appbar />
      <Outlet /> {/* This will render child routes */}
    </div>
  );
};

export default Layout;
