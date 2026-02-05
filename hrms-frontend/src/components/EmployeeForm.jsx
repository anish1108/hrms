import { useState } from "react";
import API, { getErrorMessage } from "../api/api";

export default function EmployeeForm({ onSuccess }) {
  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.employee_id.trim()) return "Employee ID is required";
    if (!form.full_name.trim()) return "Full name is required";
    if (!form.email.trim()) return "Email is required";
    if (!form.department.trim()) return "Department is required";
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
      await API.post("employees/", form);
      setSuccess("Employee added successfully");
      setForm({
        employee_id: "",
        full_name: "",
        email: "",
        department: "",
      });
      onSuccess();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <h3 className="text-lg font-semibold mb-4">Add Employee</h3>

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

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="employee_id"
          placeholder="Employee ID"
          value={form.employee_id}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        />

        <input
          name="full_name"
          placeholder="Full Name"
          value={form.full_name}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        />

        <input
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        />

        <button
          disabled={loading}
          className="md:col-span-2 bg-gray-900 text-white py-2 rounded hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Add Employee"}
        </button>
      </form>
    </div>
  );
}
