import { useEffect, useState } from "react";
import API, { getErrorMessage } from "../api/api";
import AttendanceForm from "../components/AttendanceForm";
import AttendanceList from "../components/AttendanceList";

export default function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load employees once
  useEffect(() => {
    API.get("employees/")
      .then((res) => setEmployees(res.data))
      .catch(() => setError("Failed to load employees"));
  }, []);

  const fetchAttendance = async () => {
    if (!selectedEmployee) {
      setError("Please select an employee to view attendance");
      return;
    }

    setLoading(true);
    setError("");
    setRecords([]);

    try {
      const res = await API.get(`attendance/${selectedEmployee}/`);
      setRecords(res.data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">
        Attendance Records
      </h2>

      {/* Mark Attendance */}
      <AttendanceForm
        employees={employees}
        onSuccess={() => fetchAttendance()}
      />

      {/* View Attendance Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">
          View Attendance by Employee
        </h3>

        <div className="flex flex-col md:flex-row gap-4">
          <select
            className="border rounded px-3 py-2 w-full md:w-1/3"
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
          >
            <option value="">Select Employee</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.full_name}
              </option>
            ))}
          </select>

          <button
            onClick={fetchAttendance}
            className="bg-gray-900 text-white px-6 py-2 rounded hover:bg-gray-800"
          >
            View Attendance
          </button>
        </div>
      </div>

      {/* States */}
      {loading && (
        <p className="text-gray-600">Loading attendance records...</p>
      )}

      {!loading && error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded">
          {error}
        </div>
      )}

      {!loading && !error && selectedEmployee && (
        <AttendanceList records={records} />
      )}
    </div>
  );
}
