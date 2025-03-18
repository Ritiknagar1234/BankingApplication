import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

function ChangePin() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [newPin, setNewPin] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("atmUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleChangePin = async (e) => {
    e.preventDefault();

    try {
      await axios.put("http://localhost:8080/api/change-pin", null, {
        params: {
          userId: user.id,
          newPin,
        },
      });

      toast.success("PIN changed successfully");
      navigate("/dashboard");
    } catch (err) {
      console.error("Change PIN error:", err);
      toast.error(err.response?.data?.message || "Failed to change PIN");
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <form
        onSubmit={handleChangePin}
        className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          Change PIN
        </h2>

        <input
          type="password"
          placeholder="Enter new PIN"
          value={newPin}
          onChange={(e) => setNewPin(e.target.value)}
          required
          className="w-full mb-4 p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Change PIN
        </button>

        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="w-full mt-4 bg-gray-300 dark:bg-gray-600 text-black dark:text-white py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
        >
          Back to Dashboard
        </button>
      </form>
    </div>
  );
}

export default ChangePin;
