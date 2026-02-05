import { useEffect, useState } from "react";
import API, { getErrorMessage } from "../api/api";
import EmployeeTable from "../components/EmployeeTable";
import EmployeeForm from "../components/EmployeeForm";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEmployees = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await API.get("employees/");
      setEmployees(res.data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Employees</h2>

      <EmployeeForm onSuccess={fetchEmployees} />

      {loading && <p className="text-gray-600">Loading employees...</p>}

      {!loading && error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded">
          {error}
        </div>
      )}

      {!loading && !error && employees.length === 0 && (
        <div className="bg-yellow-50 text-yellow-700 px-4 py-3 rounded">
          No employees found.
        </div>
      )}

      {!loading && !error && employees.length > 0 && (
        <EmployeeTable
  employees={employees}
  onDeleteSuccess={fetchEmployees}
/>

      )}
    </div>
  );
}
