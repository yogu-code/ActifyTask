"use client";
import React, { useState } from "react";
import * as XLSX from "xlsx";

export default function AccountTable({ data }) {
  const [search, setSearch] = useState(""); // For global search
  const [sortColumn, setSortColumn] = useState(null); // Which column to sort
  const [sortOrder, setSortOrder] = useState("asc"); // asc or desc
  const [page, setPage] = useState(1); // Current page
  const rowsPerPage = 10; // Show 10 rows per page

  // 🔍 Filter data based on search
  const filteredData = data.filter((item) =>
    Object.values(item).join(" ").toLowerCase().includes(search.toLowerCase())
  );

  // ↕️ Sort the data
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortColumn) return 0;
    const valA = a[sortColumn] ? a[sortColumn].toString().toLowerCase() : "";
    const valB = b[sortColumn] ? b[sortColumn].toString().toLowerCase() : "";
    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // 📄 Pagination Logic
  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const startIndex = (page - 1) * rowsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + rowsPerPage);

  // ⬇️ Excel Download (filtered + sorted data)
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(sortedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Accounts");
    XLSX.writeFile(workbook, "accounts-data.xlsx");
  };

  // 🔄 Handle sorting toggle
  const handleSort = (column) => {
    if (sortColumn === column) {
      // Toggle sorting order
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 sm:p-6">
      <div className="w-full max-w-7xl">
        {/* Top controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-700">
            Accounts Table
          </h2>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 w-full sm:w-auto"
            />

            {/* Download button */}
            <button
              onClick={downloadExcel}
              className="bg-sky-400 text-white px-4 py-2 text-sm rounded-lg hover:bg-sky-500 transition-all whitespace-nowrap"
            >
              Download Excel
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200">
          <table className="min-w-full text-xs sm:text-sm">
            <thead className="bg-blue-300">
              <tr>
                {[
                  "accountName",
                  "email",
                  "phone",
                  "website",
                  "industry",
                  "status",
                  "remark",
                ].map((col) => (
                  <th
                    key={col}
                    onClick={() => handleSort(col)}
                    className="px-2 sm:px-4 py-2 sm:py-3 text-left font-semibold cursor-pointer select-none hover:bg-blue-400 transition-colors"
                  >
                    <span className="flex items-center gap-1">
                      {col
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (s) => s.toUpperCase())}
                      {sortColumn === col && (
                        <span className="text-xs">
                          {sortOrder === "asc" ? "🔼" : "🔽"}
                        </span>
                      )}
                    </span>
                  </th>
                ))}
                <th className="px-2 sm:px-4 py-2 sm:py-3 font-semibold">Action</th>
              </tr>
            </thead>

            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((row, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } text-gray-700 hover:bg-gray-100 transition-colors`}
                  >
                    <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                      {row.accountName}
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 break-all">
                      {row.email}
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                      {row.phone}
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 break-all max-w-[150px] sm:max-w-none">
                      {row.website}
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                      {row.industry}
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          row.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 max-w-[150px] sm:max-w-[200px] truncate">
                      {row.remark}
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3">
                      <button className="text-sky-500 hover:text-sky-600 hover:underline font-medium">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center text-gray-500 italic py-8"
                  >
                    No results found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="border border-gray-300 px-4 py-2 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors w-full sm:w-auto"
          >
            Previous
          </button>
          <p className="text-sm text-gray-600 font-medium">
            Page {page} of {totalPages || 1}
          </p>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages || totalPages === 0}
            className="border border-gray-300 px-4 py-2 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors w-full sm:w-auto"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}