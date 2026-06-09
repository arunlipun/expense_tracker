
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../api/authApi.js";
import { toast } from "react-toastify";
const Login = () => {
     const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

   const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(formData);
      console.log(response.data)

      const data = response.data.data;

      localStorage.setItem(
        "accessToken",
        data.accessToken
      );

      localStorage.setItem(
        "refreshToken",
        data.refreshToken
      );

      localStorage.setItem(
        "roles",
        JSON.stringify(data.roles)
      );

      localStorage.setItem(
        "userId",
        data.userId
      );

      if (data.roles.includes("ROLE_ADMIN")) {
        navigate("/admin/dashboard");
        toast.success("Admin Login Successful");
        // alert("Admin loginsuccessful")
      } else {
        toast.success("User Login Successful");
        //  alert(" User Login successful")
        navigate("/dashboard");
       
      }

    } catch (error) {
       console.log(error);
  console.log(error.response);
  console.log(error.response?.data);
  // alert("Login Failed");
  toast.error("Login Faiied");
  toast.error("Invalid Credential");
      // alert("Invalid Credentials");
    }
  };


  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 px-4 relative overflow-hidden">
    
    {/* Floating Info Card */}
    <div className="hidden md:block absolute top-16 left-10 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white">
      <p className="text-xs text-gray-500">Monthly Savings</p>
      <h3 className="text-xl font-bold text-gray-800">$2,840</h3>
      <p className="text-sm text-green-600">↑ 12.4% this month</p>
    </div>

    {/* Floating Expense Card */}
    <div className="hidden md:block absolute bottom-16 right-10 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white">
      <p className="text-xs text-gray-500">Top Expense</p>
      <h3 className="text-xl font-bold text-gray-800">Housing</h3>
      <p className="text-sm text-red-500">$1,200 · 34% of budget</p>
    </div>

    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-gray-100"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Welcome Back
        </h2>
        <p className="text-gray-500 mt-2">
          Login to your account
        </p>
      </div>

      <div className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
        />

        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
        />
      </div>

      <button
        type="submit"
        className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition duration-300 shadow-md"
      >
        Login
      </button>

      <p className="mt-6 text-center text-gray-600">
        New User?{" "}
        <Link
          to="/register"
          className="text-blue-600 font-semibold hover:text-blue-800"
        >
          Register
        </Link>
      </p>
    </form>
  </div>
);
};

export default Login;