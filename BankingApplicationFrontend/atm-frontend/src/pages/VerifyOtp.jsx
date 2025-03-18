import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Get cardNumber from state or fallback to localStorage
  const cardNumber =
    location.state?.cardNumber || localStorage.getItem("cardNumber");

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      console.log("Cardnumber in verify OTP page: ", cardNumber);
      const response = await axios.post(
        `http://localhost:8080/api/register/verify?cardNumber=${cardNumber}&otp=${otp}`
      );

      if (response.status === 200) {
        toast.success(response.data.message || "OTP Verified Successfully!");
        localStorage.removeItem("cardNumber");
        navigate("/");
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        toast.error(err.response.data?.error || "Invalid or Expired OTP");
      } else {
        toast.error("Something went wrong during OTP verification");
      }
    }
  };

  const handleResendOtp = async () => {
    try {
      console.log("Cardnumber in resend otp :", cardNumber);
      const response = await axios.post(
        "http://localhost:8080/api/resend-otp?cardNumber=" + cardNumber
      );
      if (response.status === 200) {
        toast.success("OTP resent successfully!");
      }
    } catch (error) {
      toast.error("Failed to resend OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleVerify}
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          OTP Verification
        </h2>

        <input
          type="text"
          name="otp"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          className="w-full mb-4 p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-200"
        >
          Verify OTP
        </button>

        <button
          type="button"
          onClick={handleResendOtp}
          className="mt-4 w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition duration-200"
        >
          Resend OTP
        </button>
      </form>
    </div>
  );
}

export default VerifyOtp;
