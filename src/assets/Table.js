import React, { useEffect, useState } from "react";

const Table = () => {
  const [data, setData] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    newFirstName: "",
    newLastName: "",
    newMobile: "",
    newEmail: "",
    newProject: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/user");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (userId) => {
    setEditingUser(userId);
    const userToEdit = data.find((user) => user.id === userId);
    setUpdatedData({
      newFirstName: userToEdit.first_name,
      newLastName: userToEdit.last_name,
      newMobile: userToEdit.mobile,
      newEmail: userToEdit.email,
      newProject: userToEdit.project,
    });
  };

  const handleEditSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/update/${editingUser}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        setData((prevData) =>
          prevData.map((user) =>
            user.id === editingUser ? { ...user, ...updatedData } : user
          )
        );
        setEditingUser(null);
      } else {
        console.error("Error editing client");
      }
    } catch (error) {
      console.error("Error editing client:", error);
    }
  };

  const handleInputChange = (field, value) => {
    setUpdatedData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/delete/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setData((prevData) => prevData.filter((user) => user.id !== userId));
      } else {
        console.error("Error deleting user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  const renderTableData = () => {
    return data.map((user, index) => (
      <tr key={index}>
        <td>{user.first_name}</td>
        <td>{user.last_name}</td>
        <td>{user.email}</td>
        <td>{user.mobile}</td>
        <td>{user.project}</td>
        <td>
          {editingUser === user.id ? (
            <>
              <input
                type="text"
                value={updatedData.newFirstName}
                onChange={(e) => handleInputChange("newFirstName", e.target.value)}
              />
              <br />
              <input
                type="text"
                value={updatedData.newLastName}
                onChange={(e) => handleInputChange("newLastName", e.target.value)}
              />
              <br />
              <input
                type="text"
                value={updatedData.newEmail}
                onChange={(e) => handleInputChange("newEmail", e.target.value)}
              />
              <br />
              <input
                type="text"
                value={updatedData.newMobile}
                onChange={(e) => handleInputChange("newMobile", e.target.value)}
              />
              <br />
              <input
                type="text"
                value={updatedData.newProject}
                onChange={(e) => handleInputChange("newProject", e.target.value)}
              />
              <br />
              <button onClick={handleEditSubmit}>Save</button>
            </>
          ) : (
            <>
              <a href="#" onClick={() => handleEdit(user.id)}>
                Edit
              </a>{" "}
              |{" "}
              <a href="#" onClick={() => handleDelete(user.id)}>
                Delete
              </a>
            </>
          )}
        </td>
      </tr>
    ));
  };

  return (
    <div className="App">
     <div className="container mt-4">
      <h2>Clients</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Mobile No.</th>
              <th>Project</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{renderTableData()}</tbody>
        </table>
      )}
    </div>
    </div>
  );
};

export default Table;
