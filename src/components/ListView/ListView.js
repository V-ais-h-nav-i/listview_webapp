import React, { useEffect, useState } from "react";
import "./ListView.css";

const ListView = () => {
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(`https://reqres.in/api/users?page=${page}`)
      .then((response) => response.json())
      .then((result) => {
        setData(result.data);
        setTotalPages(result.total_pages);
      });
  }, [page]);

  const filteredData = data.filter((item) =>
    item.first_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="content">
      <input
        className="search"
        type="text"
        placeholder="Search by First Name"
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      />
      <div className="user-list">
        {filteredData.map((item) => (
          <div key={item.id}>
            <div className="user-list-item">
              <span className="user-id">{item.id}</span>
              <img src={item.avatar} alt={`${item.first_name}'s avatar`} />
            </div>
            <p>{item.first_name}</p>
          </div>
        ))}
      </div>
      <button
        onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
        disabled={page === 1}
      >
        Previous
      </button>
      <button
        onClick={() => setPage((prevPage) => prevPage + 1)}
        disabled={page >= totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default ListView;
