import { useState } from "react";

import Events from "./pages/Events";
import Users from "./pages/Users";
import Expenses from "./pages/Expenses";

import "./App.css";

function App() {

    const [activePage, setActivePage] = useState("Dashboard");

    const [sidebarOpen, setSidebarOpen] = useState(false);


    const handleNavigation = (page) => {

        setActivePage(page);

        // Close sidebar on mobile
        setSidebarOpen(false);
    };


    return (

        <div className="app">


            {/* ================= SIDEBAR ================= */}

            <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>

                <div className="sidebar-header">

                    <h2>
                        Expense Manager
                    </h2>

                    <button
                        className="mobile-close"
                        onClick={() => setSidebarOpen(false)}
                    >
                        ×
                    </button>

                </div>


                {/* Navigation */}

                <nav className="sidebar-nav">

                    <button
                        className={
                            activePage === "Dashboard"
                                ? "nav-item active"
                                : "nav-item"
                        }
                        onClick={() =>
                            handleNavigation("Dashboard")
                        }
                    >
                        <span>📊</span>
                        Dashboard
                    </button>


                    <button
                        className={
                            activePage === "Users"
                                ? "nav-item active"
                                : "nav-item"
                        }
                        onClick={() =>
                            handleNavigation("Users")
                        }
                    >
                        <span>👥</span>
                        Users
                    </button>


                    <button
                        className={
                            activePage === "Events"
                                ? "nav-item active"
                                : "nav-item"
                        }
                        onClick={() =>
                            handleNavigation("Events")
                        }
                    >
                        <span>📅</span>
                        Events
                    </button>


                    <button
                        className={
                            activePage === "Expenses"
                                ? "nav-item active"
                                : "nav-item"
                        }
                        onClick={() =>
                            handleNavigation("Expenses")
                        }
                    >
                        <span>💰</span>
                        Expenses
                    </button>

                </nav>


                {/* Sidebar footer */}

                <div className="sidebar-footer">

                    <p>
                        Collaborative Event
                    </p>

                    <p>
                        Expense Management
                    </p>

                </div>

            </aside>


            {/* ================= MOBILE OVERLAY ================= */}

            {sidebarOpen && (

                <div
                    className="sidebar-overlay"
                    onClick={() => setSidebarOpen(false)}
                ></div>

            )}


            {/* ================= MAIN CONTENT ================= */}

            <main className="main-content">


                {/* Mobile Header */}

                <div className="mobile-header">

                    <button
                        className="menu-button"
                        onClick={() =>
                            setSidebarOpen(true)
                        }
                    >
                        ☰
                    </button>

                    <h2>
                        Expense Manager
                    </h2>

                </div>


                {/* ================= DASHBOARD ================= */}

                {activePage === "Dashboard" && (

                    <div className="dashboard-page">

                        <div className="dashboard-header">

                            <div>

                                <h1>
                                    Dashboard
                                </h1>

                                <p>
                                    Welcome to your expense management system
                                </p>

                            </div>

                        </div>


                        <div className="dashboard-cards">


                            <div className="dashboard-card">

                                <div className="card-icon">
                                    👥
                                </div>

                                <div>

                                    <h3>
                                        Users
                                    </h3>

                                    <p>
                                        Manage your users
                                    </p>

                                </div>

                            </div>


                            <div className="dashboard-card">

                                <div className="card-icon">
                                    📅
                                </div>

                                <div>

                                    <h3>
                                        Events
                                    </h3>

                                    <p>
                                        Manage your events
                                    </p>

                                </div>

                            </div>


                            <div className="dashboard-card">

                                <div className="card-icon">
                                    💰
                                </div>

                                <div>

                                    <h3>
                                        Expenses
                                    </h3>

                                    <p>
                                        Track your expenses
                                    </p>

                                </div>

                            </div>


                        </div>


                        {/* Quick Actions */}

                        <div className="quick-actions">

                            <h2>
                                Quick Actions
                            </h2>


                            <div className="quick-action-buttons">

                                <button
                                    onClick={() =>
                                        handleNavigation("Users")
                                    }
                                >
                                    + Add User
                                </button>


                                <button
                                    onClick={() =>
                                        handleNavigation("Events")
                                    }
                                >
                                    + Add Event
                                </button>


                                <button
                                    onClick={() =>
                                        handleNavigation("Expenses")
                                    }
                                >
                                    + Add Expense
                                </button>

                            </div>

                        </div>

                    </div>

                )}


                {/* ================= USERS ================= */}

                {activePage === "Users" && (

                    <Users />

                )}


                {/* ================= EVENTS ================= */}

                {activePage === "Events" && (

                    <Events />

                )}


                {/* ================= EXPENSES ================= */}

                {activePage === "Expenses" && (

                    <Expenses />

                )}

            </main>

        </div>

    );
}

export default App;