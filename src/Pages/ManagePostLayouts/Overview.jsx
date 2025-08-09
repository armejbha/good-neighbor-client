import { useContext, useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Loading from "../Shared/Loading";
import { AuthContext } from "../../Context/AuthContext";

export default function Overview() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const{user}=useContext(AuthContext)
  useEffect(() => {
    const fetchStats = async () => {
      try {
        if (!user) return;

        const token = await user.getIdToken();
        const res = await fetch(
          `https://good-neighbor-server.vercel.app/stats?email=${user?.email}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${user?.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch stats");

        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user]);

  if (loading) return <Loading/>;

  // Pie chart data for My Data
  const pieData = [
    { name: "My Posts", value: stats.myData.totalPosts },
    { name: "My Volunteers Needed", value: stats.myData.totalVolunteersNeeded },
    { name: "Requests Received", value: stats.myData.totalRequestsReceived },
    { name: "Requests Sent", value: stats.myData.totalRequestsSent },
  ];

  const COLORS = ["#4F46E5", "#22C55E", "#F59E0B", "#EF4444"];
  console.log(stats);
  return (
    <div className="space-y-8">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className=" p-4 rounded-xl shadow hover:shadow-lg transition bg-base-200">
          <h3 className="text-gray-500 text-sm">All Posts</h3>
          <p className="text-2xl font-bold">{stats?.allData.totalPosts}</p>
        </div>

        <div className=" p-4 rounded-xl shadow hover:shadow-lg transition bg-base-200">
          <h3 className="text-gray-500 text-sm">All Volunteers Needed</h3>
          <p className="text-2xl font-bold">{stats?.allData.totalVolunteersNeeded}</p>
        </div>

        <div className=" p-4 rounded-xl shadow hover:shadow-lg transition bg-base-200">
          <h3 className="text-gray-500 text-sm">All Requests</h3>
          <p className="text-2xl font-bold">{stats?.allData.totalRequests}</p>
        </div>

        <div className=" p-4 rounded-xl shadow hover:shadow-lg transition bg-base-200">
          <h3 className="text-gray-500 text-sm">My Posts</h3>
          <p className="text-2xl font-bold">{stats?.myData.totalPosts}</p>
        </div>

        <div className=" p-4 rounded-xl shadow hover:shadow-lg transition bg-base-200">
          <h3 className="text-gray-500 text-sm">My Volunteers Needed</h3>
          <p className="text-2xl font-bold">{stats?.myData.totalVolunteersNeeded}</p>
        </div>

        <div className=" p-4 rounded-xl shadow hover:shadow-lg transition bg-base-200">
          <h3 className="text-gray-500 text-sm">Requests Received</h3>
          <p className="text-2xl font-bold">{stats?.myData.totalRequestsReceived}</p>
        </div>

        <div className=" p-4 rounded-xl shadow hover:shadow-lg transition bg-base-200">
          <h3 className="text-gray-500 text-sm">Requests Sent</h3>
          <p className="text-2xl font-bold">{stats?.myData.totalRequestsSent}</p>
        </div>
      </div>

      {/* Pie Chart */}
      <div className=" p-6 rounded-xl shadow hover:shadow-lg transition bg-base-200">
        <h3 className="text-lg font-semibold mb-4">My Data Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, value }) => `${name}: ${value}`}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
