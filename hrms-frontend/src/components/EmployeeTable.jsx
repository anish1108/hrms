import { useState } from "react";
import API, { getErrorMessage } from "../api/api";

export default function EmployeeTable({ employees, onDeleteSuccess }) {
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?\nAttendance records will also be removed."
    );
    if (!confirmed) return;

    setDeletingId(id);
    setError("");

    try {
      await API.delete(`employees/${id}/`);
      onDeleteSuccess(); // refresh list
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded">
          {error}
        </div>
      )}

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold">Employee ID</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Name</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Email</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Department</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Action</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id} className="border-t">
                <td className="px-4 py-2 text-sm">{emp.employee_id}</td>
                <td className="px-4 py-2 text-sm">{emp.full_name}</td>
                <td className="px-4 py-2 text-sm">{emp.email}</td>
                <td className="px-4 py-2 text-sm">{emp.department}</td>
                <td className="px-4 py-2 text-sm">
                  <button
                    onClick={() => handleDelete(emp.id)}
                    disabled={deletingId === emp.id}
                    className="text-red-600 hover:underline disabled:opacity-50"
                  >
                    {deletingId === emp.id ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
