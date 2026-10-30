import { useEffect, useState } from "react";
import {
    getAllUsers,
    createUser,
    deleteUser
} from "../services/userService";

function Users() {

    const [users, setUsers] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const [user, setUser] = useState({
        name: "",
        email: ""
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Load users when page opens
    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            setLoading(true);

            const data = await getAllUsers();

            setUsers(data);
            setError("");

        } catch (err) {
            console.error(err);
            setError("Failed to load users.");
        } finally {
            setLoading(false);
        }
    };

    // Handle input changes
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    // Create user
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user.name.trim() || !user.email.trim()) {
            setError("Name and email are required.");
            return;
        }

        try {

            await createUser(user);

            // Clear form
            setUser({
                name: "",
                email: ""
            });

            setShowForm(false);
            setError("");

            // Reload users
            loadUsers();

        } catch (err) {
            console.error(err);

            setError(
                err.response?.data?.message ||
                "Failed to create user."
            );
        }
    };

    // Delete user
    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await deleteUser(id);

            loadUsers();

        } catch (err) {
            console.error(err);

            setError(
                err.response?.data?.message ||
                "Failed to delete user."
            );
        }
    };

    return (
        <div className="users-page">

            {/* Header */}
            <div className="page-header">

                <div>
                    <h1>Users</h1>
                    <p>Manage users in your events</p>
                </div>

                <button
                    className="add-button"
                    onClick={() => setShowForm(true)}
                >
                    + Add User
                </button>

            </div>

            {/* Error */}
            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            {/* Loading */}
            {loading ? (
                <p>Loading users...</p>
            ) : users.length === 0 ? (

                <div className="empty-state">
                    <h3>No users found</h3>
                    <p>Add your first user to get started.</p>
                </div>

            ) : (

                <div className="users-grid">

                    {users.map((user) => (

                        <div
                            className="user-card"
                            key={user.id}
                        >

                            <div className="user-avatar">
                                {user.name.charAt(0).toUpperCase()}
                            </div>

                            <div className="user-details">

                                <h3>{user.name}</h3>

                                <p>{user.email}</p>

                                <span>
                                    User ID: {user.id}
                                </span>

                            </div>

                            <button
                                className="delete-button"
                                onClick={() => handleDelete(user.id)}
                            >
                                Delete
                            </button>

                        </div>

                    ))}

                </div>

            )}

            {/* Add User Modal */}
            {showForm && (

                <div className="modal-overlay">

                    <div className="modal">

                        <div className="modal-header">

                            <h2>Add User</h2>

                            <button
                                className="close-button"
                                onClick={() => setShowForm(false)}
                            >
                                ×
                            </button>

                        </div>

                        <form onSubmit={handleSubmit}>

                            <label>Name</label>

                            <input
                                type="text"
                                name="name"
                                placeholder="Enter user name"
                                value={user.name}
                                onChange={handleChange}
                            />

                            <label>Email</label>

                            <input
                                type="email"
                                name="email"
                                placeholder="Enter email address"
                                value={user.email}
                                onChange={handleChange}
                            />

                            <div className="form-buttons">

                                <button
                                    type="button"
                                    className="cancel-button"
                                    onClick={() => setShowForm(false)}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="save-button"
                                >
                                    Save User
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </div>
    );
}

export default Users;