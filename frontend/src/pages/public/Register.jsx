import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { registerUser } from "../../api/authApi";
import { toast } from "react-toastify";

const Register = () => {

const navigate=useNavigate();
const [formData,setFormData]=useState({
    name:"",
    email:"",
    password:""
});

const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value,})
}

const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
        await registerUser(formData);
        toast.success("Registration successful")
        
        navigate("/login")
    } catch (error) {
          console.error(error);
          toast.error("Registration Failed");
      
        
    }
}


 return (
  <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100 flex items-center justify-center px-4">
    <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

      {/* Left Side */}
      <div className="hidden md:flex flex-col justify-center p-10 bg-gradient-to-br from-green-500 to-emerald-600 text-white">
        <h1 className="text-4xl font-bold mb-4">
          Create Account
        </h1>

        <p className="text-lg text-green-100">
          Start tracking your expenses, savings and
          financial goals in one place.
        </p>

        <div className="mt-10 space-y-4">
          <div className="bg-white/10 p-4 rounded-xl">
            📊 Manage Expenses Easily
          </div>

          <div className="bg-white/10 p-4 rounded-xl">
            💰 Track Savings Growth
          </div>

          <div className="bg-white/10 p-4 rounded-xl">
            🎯 Achieve Financial Goals
          </div>
        </div>
      </div>

      {/* Right Side Form */}
      <div className="p-8 md:p-12 flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Register
        </h2>

        <p className="text-gray-500 mb-8">
          Create your account to continue
        </p>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-300 focus:border-green-500 outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-300 focus:border-green-500 outline-none"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-300 focus:border-green-500 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-600 font-semibold hover:text-green-700"
          >
            Login
          </Link>
        </p>
      </div>

    </div>
  </div>
);
};

export default Register;