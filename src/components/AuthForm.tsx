import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const API_URL = "https://todo-backend-mrjv.onrender.com";

type Props = {
  type: "login" | "signup";
};

export default function AuthForm({ type }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      if (type === "signup") {
        const response = await axios.post(`${API_URL}/register`, {
          email,
          password,
        });
        console.log("Signup success:", response.data);
        alert("Signup success");
      } else {
        const response = await axios.post(`${API_URL}/login`, {
          email,
          password,
        });
        const { accessToken } = response.data;
        localStorage.setItem("token", accessToken); // store JWT for later use
        // console.log("Login success:", accessToken);
        alert("Login success")
      }
  
      navigate("/dashboard");
    } catch (error: any) {
      console.error(`${type} failed:`, error.response?.data || error.message);
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center capitalize">
          {type}
        </h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border border-gray-300 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 border border-gray-300 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
        >
          {type === "login" ? "Log In" : "Sign Up"}
        </button>
        <div className="mt-4 text-sm text-center">
          {type === "login" ? (
            <>
              Don’t have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Log in
              </span>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
