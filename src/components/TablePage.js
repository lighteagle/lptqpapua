import React, { useState, useEffect } from "react";
import axios from "axios";
// http://api.lptqpapua.org/api/portal/post?page=1&limit=5
const URL_API = "http://api.lptqpapua.org/api/portal/post?";

const TablePage = () => {
  const [post, setPost] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    axios.get(`${URL_API}page=${page}&limit=5`).then((res) => {
      //   console.log(res.data.data.total_page)
      setPost((prev) => [...prev, ...res.data.data.posts]);
      setTotalPage(res.data.data.total_page);
    });
  }, [page]);

  const handleLoadMore = (event) => {
    event.preventDefault();
    page < totalPage && setPage((prev) => page + 1);
  };
  return (
    <div>
      {console.log(post)}

      <h1 style={{ textAlign: "center" }}>LPTQ PAPUA</h1>
      <table style={{ margin: "auto" }}>
        <thead>
          <tr>
            <th>id</th>
            <th>Title</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          {post.map((val, index) => (
            <tr key={index}>
              <td>{val.id}</td>
              <td>{val.title}</td>
              <td>{val.author.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {page < totalPage && (
        <button
          style={{ margin: "0 auto", display: "block" }}
          onClick={handleLoadMore}
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default TablePage;
