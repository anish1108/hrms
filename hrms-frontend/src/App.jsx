import { useState } from "react";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";

export default function App() {
  const [page, setPage] = useState("employees");

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between">
        <h1 className="text-xl font-semibold">HRMS Lite</h1>
        <div className="space-x-6">
          <button onClick={() => setPage("employees")}>Employees</button>
          <button onClick={() => setPage("attendance")}>Attendance</button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-6">
        {page === "employees" ? <Employees /> : <Attendance />}
      </main>
    </div>
  );
}
