import React, { useState, useEffect } from 'react';

const Users = () => {
    const [userList, setUerList] = useState([]);

    const fetchUserList = async () => {
        try {
            const res = await fetch("http://localhost:5000/users");
            const data = await res.json();
            setUerList(data);
        } catch (error) {
            console.log("Failed to load users", error);
        }
    };

    useEffect(() => {
        fetchUserList();
    }, []);

    return (
        <div style={{ marginTop: 50, padding: "20px" }}>
            <h2>Users List</h2>
            <table border="1" cellPadding="10" cellSpacing="0" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead style={{ backgroundColor: "#f4f4f4" }}>
                    <tr>
                        <th>Email</th>
                        <th>Verified</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {userList.length > 0 ? (
                        userList.map((user) => (
                            <tr key={user._id}>
                                <td>{user.email}</td>
                                <td>{user.verified ? "Yes" : "No"}</td>
                                <td>{new Date(user.createdAt).toLocaleString()}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" style={{ textAlign: "center" }}>No users found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Users;
