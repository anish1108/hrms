export default function AttendanceList({ records }) {
  if (records.length === 0) {
    return (
      <div className="bg-yellow-50 text-yellow-700 px-4 py-3 rounded">
        No attendance records found.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="min-w-full border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold">Date</th>
            <th className="px-4 py-2 text-left text-sm font-semibold">Status</th>
          </tr>
        </thead>
        <tbody>
          {records.map((rec) => (
            <tr key={rec.id} className="border-t">
              <td className="px-4 py-2 text-sm">{rec.date}</td>
              <td
                className={`px-4 py-2 text-sm font-medium ${
                  rec.status === "PRESENT"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {rec.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
