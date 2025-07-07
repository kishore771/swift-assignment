import React, { useEffect, useState } from "react";
import { TiArrowUnsorted } from "react-icons/ti";
import "./CommentsDashboard.css";

const CommentsDashboard = ({ onViewProfile }) => {
  const [comments, setComments] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
        setFiltered(data);
      });
  }, []);

  const handleSearch = (value) => {
    setSearch(value);
    const query = value.toLowerCase();
    const result = comments.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.email.toLowerCase().includes(query) ||
        c.body.toLowerCase().includes(query)
    );
    setFiltered(result);
    setPage(1);
  };

  const sortBy = (key) => {
    const sorted = [...filtered].sort((a, b) =>
      a[key].toString().localeCompare(b[key].toString())
    );
    setFiltered(sorted);
    setPage(1);
  };

  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="dashboard-container container">
      {/* Top Controls */}
      <div className="control-buttons d-flex justify-content-between align-items-center mb-3 flex-wrap gap-3">
        <div className="d-flex gap-3 flex-wrap">
          <button className="sort-btn" onClick={() => sortBy("postId")}>
            Sort Post ID <TiArrowUnsorted />
          </button>
          <button className="sort-btn" onClick={() => sortBy("name")}>
            Sort Name <TiArrowUnsorted />
          </button>
          <button className="sort-btn" onClick={() => sortBy("email")}>
            Sort Email <TiArrowUnsorted />
          </button>
        </div>

        <div className="search-container">
          <i className="bi bi-search search-icon"></i>
          <input
            type="text"
            className="dashboard-search"
            placeholder="Search name, email, comment"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="dashboard-table-wrapper">
        <table className="table dashboard-table">
          <thead>
            <tr>
              <th>Post ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((comment) => (
              <tr key={comment.id}>
                <td>{comment.postId}</td>
                <td>{comment.name}</td>
                <td>{comment.email}</td>
                <td>{comment.body}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination-bar d-flex justify-content-end align-items-end mt-4 flex-wrap">
        <div className="page-info">
          {pageSize * (page - 1) + 1}-{Math.min(page * pageSize, totalItems)} of {totalItems} items
        </div>

        <div className="pagination-controls d-flex align-items-center gap-2 flex-wrap">
          {/* Prev Arrow */}
          <button
            className="pagination-arrow"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            &lt;
          </button>

          {/* Page Numbers Logic */}
          {Array.from({ length: totalPages }).map((_, i) => {
            const index = i + 1;
            if (
              index === 1 ||
              index === totalPages ||
              Math.abs(page - index) <= 1
            ) {
              return (
                <button
                  key={index}
                  className={`pagination-page ${page === index ? "active" : ""}`}
                  onClick={() => setPage(index)}
                >
                  {index}
                </button>
              );
            } else if (
              (index === 2 && page > 4) ||
              (index === totalPages - 1 && page < totalPages - 3)
            ) {
              return <span key={index} className="ellipsis">...</span>;
            }
            return null;
          })}

          {/* Next Arrow */}
          <button
            className="pagination-arrow"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            &gt;
          </button>

          {/* Page Size Dropdown */}
          <select
            className="form-select pagination-select"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
          >
            <option value={10}>10 / Page</option>
            <option value={25}>25 / Page</option>
            <option value={50}>50 / Page</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default CommentsDashboard;
