import { useState } from "react";
import API, { getErrorMessage } from "../api/api";

export default function AttendanceForm({ employees, onSuccess }) {
  const [form, setForm] = useState({
    employee_id: "",
    date: "",
    status: "PRESENT",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validate = () => {
    if (!form.employee_id) return "Please select an employee";
    if (!form.date) return "Please select a date";
    if (!form.status) return "Please select status";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      await API.post("attendance/", form);
      setSuccess("Attendance marked successfully");
      onSuccess(form.employee_id);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">Mark Attendance</h3>

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <select
          className="border rounded px-3 py-2"
          value={form.employee_id}
          onChange={(e) =>
            setForm({ ...form, employee_id: e.target.value })
          }
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.full_name}
            </option>
          ))}
        </select>

        <input
          type="date"
          className="border rounded px-3 py-2"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        <select
          className="border rounded px-3 py-2"
          value={form.status}
          onChange={(e) =>
            setForm({ ...form, status: e.target.value })
          }
        >
          <option value="PRESENT">Present</option>
          <option value="ABSENT">Absent</option>
        </select>

        <button
          disabled={loading}
          className="md:col-span-3 bg-gray-900 text-white py-2 rounded hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Submit Attendance"}
        </button>
      </form>
    </div>
  );
}
