import { useEffect, useState } from "react";
import axios from "axios";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function Analytics() {
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState(null);
  const user = JSON.parse(localStorage.getItem("atmUser"));

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:8080/api/analytics/${user.id}`)
        .then((res) => setAnalytics(res.data))
        .catch((err) => console.error("Error fetching analytics:", err));
    }
  }, [user]);

  if (!analytics)
    return <p className="text-center mt-10">Loading analytics...</p>;

  const pieData = {
    labels: ["Deposits", "Withdrawals"],
    datasets: [
      {
        data: [analytics.deposits, analytics.withdrawals],
        backgroundColor: ["#4ade80", "#f87171"],
      },
    ],
  };

  const barData = {
    labels: Object.keys(analytics.activityByDate),
    datasets: [
      {
        label: "Transactions",
        data: Object.values(analytics.activityByDate),
        backgroundColor: "#60a5fa",
      },
    ],
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-center md:text-left mb-4 md:mb-0">
          📊 Analytics Dashboard
        </h2>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition"
        >
          Back to Dashboard
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
          <h3 className="text-lg font-semibold mb-4 text-center">
            Deposit vs Withdrawal
          </h3>
          <Pie data={pieData} />
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
          <h3 className="text-lg font-semibold mb-4 text-center">
            Transactions by Date
          </h3>
          <Bar data={barData} />
        </div>
      </div>
    </div>
  );
}

export default Analytics;
