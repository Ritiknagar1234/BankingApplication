import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    cardNumber: "",
    pin: "",
  });

  // Handle input field changes
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send login request to backend API
      const response = await axios.post(
        "http://localhost:8080/api/login",
        credentials
      );

      // Check if the response contains user data
      if (response.data && response.data.user) {
        const user = response.data.user;

        // Store user data in localStorage
        localStorage.setItem("atmUser", JSON.stringify(user));

        // Show success message
        toast.success("Login successful");

        // Redirect to dashboard page
        navigate("/dashboard");
      } else {
        toast.error("Login failed");
      }
    } catch (error) {
      // Show error message on failed login
      console.error(error);
      toast.error("Invalid card number or PIN");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Login
        </h2>

        {/* Card Number Input */}
        <input
          type="text"
          name="cardNumber"
          placeholder="Card Number"
          value={credentials.cardNumber}
          onChange={handleChange}
          required
          className="w-full mb-4 p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* PIN Input */}
        <input
          type="password"
          name="pin"
          placeholder="4-digit PIN"
          maxLength="4"
          value={credentials.pin}
          onChange={handleChange}
          required
          className="w-full mb-4 p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Login
        </button>

        {/* Register Link */}
        <p className="text-sm text-center mt-4 text-gray-600 dark:text-gray-300">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Register here
          </a>
        </p>
      </form>
    </div>
  );
}

export default Login;
