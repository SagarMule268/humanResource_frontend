import { useAuth } from "../../context/AuthContext";
const Navbar = () => {
    const {user } = useAuth();
  return (
    <div className=" flex bg-red-300 h-15 items-center justify-between px-6  ">
        <p className="ml-78">Welcome  { user.name} </p>
    </div>
  )
}

export default Navbar
