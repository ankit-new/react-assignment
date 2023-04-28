import axios from "axios";
import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";

const CardView = ({ data }) => {
  return (
    <div className="card-container">
      {data.map((item) => (
        <div className="card">
          <h3>{item.name}</h3>
          <p>Age: {item.age}</p>
          <p>Occupation: {item.occupation}</p>
        </div>
      ))}
    </div>
  );
};

const TableView = ({ data, columns }) => {
  return (
    <BootstrapTable bootstrap4 keyField="name" columns={columns} data={data} />
  );
};

const TableComponent = () => {
  const [profile, setProfile] = useState([]);
  const [search, setSearch] = useState("");
  const [isFiltered, setIsFiltered] = useState(false);
  const [isCardView, setIsCardView] = useState(false);

  console.log(search);

  const fetchData = async () => {
    const response = await axios
      .get("https://coralmango.com/api/react-test")
      .catch((err) => console.log(err));
    console.log(response.data);
    setProfile(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (search) {
      setIsFiltered(true);
    } else {
      setIsFiltered(false);
    }
  }, [search]);

  const columns = [
    { dataField: "name", text: "Name", sort: true },
    { dataField: "age", text: "Age", sort: true },
    { dataField: "occupation", text: "Occupation" },
  ];

  const filteredData = profile.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.age.toString().toLowerCase().includes(search.toLowerCase()) ||
      item.occupation.toLowerCase().includes(search.toLowerCase())
  );

  const toggleCardView = () => {
    setIsCardView(!isCardView);
  };

  return (
    <div>
      <input
        type="email"
        className="form-control"
        placeholder="Search Data"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <br />
      <br />

      {isFiltered && (
        <div className="alert alert-info" role="alert">
          You are viewing filtered results.
        </div>
      )}

      <button onClick={toggleCardView}>
        {isCardView ? "Table View" : "Card View"}
      </button>

      {isCardView ? (
        <CardView data={filteredData} />
      ) : (
        <TableView data={filteredData} columns={columns} />
      )}
    </div>
  );
};

export default TableComponent;
