import { useEffect, useState } from "react";

import {
    getAllExpenses,
    createExpense,
    deleteExpense
} from "../services/expenseService";

import { getAllEvents } from "../services/eventService";
import { getAllUsers } from "../services/userService";


function Expenses() {

    const [expenses, setExpenses] = useState([]);
    const [events, setEvents] = useState([]);
    const [users, setUsers] = useState([]);

    const [showModal, setShowModal] = useState(false);

    const [expense, setExpense] = useState({
        description: "",
        amount: "",
        category: "",
        expenseDate: "",
        eventId: "",
        userId: ""
    });


    // =========================================
    // LOAD EXPENSES, EVENTS AND USERS
    // =========================================

    const loadData = async () => {

        try {

            const [
                expenseData,
                eventData,
                userData
            ] = await Promise.all([
                getAllExpenses(),
                getAllEvents(),
                getAllUsers()
            ]);

            setExpenses(expenseData);
            setEvents(eventData);
            setUsers(userData);

        } catch (error) {

            console.error("Error loading data:", error);

            alert("Failed to load data.");

        }
    };


    useEffect(() => {

        loadData();

    }, []);


    // =========================================
    // HANDLE INPUT
    // =========================================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setExpense({
            ...expense,
            [name]: value
        });

    };


    // =========================================
    // CREATE EXPENSE
    // =========================================

    const handleSubmit = async (e) => {

        e.preventDefault();


        if (
            !expense.description ||
            !expense.amount ||
            !expense.category ||
            !expense.expenseDate ||
            !expense.eventId ||
            !expense.userId
        ) {

            alert("Please fill all fields.");

            return;
        }


        try {

            const expenseData = {

                description: expense.description,

                amount: Number(expense.amount),

                category: expense.category,

                expenseDate: expense.expenseDate,

                eventId: Number(expense.eventId),

                userId: Number(expense.userId)

            };


            await createExpense(expenseData);


            alert("Expense created successfully!");


            // Reset form

            setExpense({
                description: "",
                amount: "",
                category: "",
                expenseDate: "",
                eventId: "",
                userId: ""
            });


            setShowModal(false);


            // Reload expenses

            await loadData();


        } catch (error) {

            console.error("Error creating expense:", error);

            alert("Failed to create expense.");

        }

    };


    // =========================================
    // DELETE EXPENSE
    // =========================================

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this expense?"
        );


        if (!confirmDelete) {

            return;

        }


        try {

            await deleteExpense(id);

            alert("Expense deleted successfully!");


            await loadData();


        } catch (error) {

            console.error("Error deleting expense:", error);

            alert("Failed to delete expense.");

        }

    };


    // =========================================
    // GET EVENT NAME
    // =========================================

    const getEventName = (eventId) => {

        const event = events.find(
            (event) => Number(event.id) === Number(eventId)
        );


        return event
            ? event.eventName
            : "Unknown Event";

    };


    // =========================================
    // GET USER NAME
    // =========================================

    const getUserName = (userId) => {

        const user = users.find(
            (user) => Number(user.id) === Number(userId)
        );


        return user
            ? user.name
            : "Unknown User";

    };


    return (

        <div className="expenses-page">


            {/* =========================================
                PAGE HEADER
            ========================================= */}

            <div className="page-header">

                <div>

                    <h1>
                        Expenses
                    </h1>

                    <p>
                        Track and manage your event expenses
                    </p>

                </div>


                <button
                    className="add-button"
                    onClick={() => setShowModal(true)}
                >
                    + Add Expense
                </button>

            </div>


            {/* =========================================
                EXPENSE CARDS
            ========================================= */}

            <div className="expenses-grid">


                {expenses.length === 0 ? (

                    <div className="empty-state">

                        <h3>
                            No expenses found
                        </h3>

                        <p>
                            Add your first expense to get started.
                        </p>

                    </div>

                ) : (

                    expenses.map((expense) => (

                        <div
                            className="expense-card"
                            key={expense.id}
                        >


                            {/* CARD HEADER */}

                            <div className="expense-card-header">

                                <h3>
                                    {expense.description}
                                </h3>


                                <button
                                    className="delete-button"
                                    onClick={() =>
                                        handleDelete(expense.id)
                                    }
                                >
                                    Delete
                                </button>

                            </div>


                            {/* AMOUNT */}

                            <div className="expense-amount">

                                ₹{Number(expense.amount).toFixed(2)}

                            </div>


                            {/* CATEGORY */}

                            <p>

                                <strong>
                                    Category:
                                </strong>{" "}

                                {expense.category}

                            </p>


                            {/* DATE */}

                            <p>

                                <strong>
                                    Date:
                                </strong>{" "}

                                {expense.expenseDate}

                            </p>


                            {/* EVENT */}

                            <p>

                                <strong>
                                    Event:
                                </strong>{" "}

                                {getEventName(expense.eventId)}

                            </p>


                            {/* EVENT ID */}

                            <p>

                                <strong>
                                    Event ID:
                                </strong>{" "}

                                {expense.eventId}

                            </p>


                            {/* PAID BY */}

                            <p>

                                <strong>
                                    Paid By:
                                </strong>{" "}

                                {getUserName(expense.userId)}

                            </p>


                            {/* USER ID */}

                            <p>

                                <strong>
                                    User ID:
                                </strong>{" "}

                                {expense.userId}

                            </p>


                        </div>

                    ))

                )}

            </div>


            {/* =========================================
                ADD EXPENSE MODAL
            ========================================= */}

            {showModal && (

                <div className="modal-overlay">

                    <div className="modal">


                        {/* MODAL HEADER */}

                        <div className="modal-header">

                            <h2>
                                Add Expense
                            </h2>


                            <button
                                className="close-button"
                                onClick={() =>
                                    setShowModal(false)
                                }
                            >
                                ×
                            </button>

                        </div>


                        <form onSubmit={handleSubmit}>


                            {/* DESCRIPTION */}

                            <div className="form-group">

                                <label>
                                    Description
                                </label>


                                <input
                                    type="text"
                                    name="description"
                                    value={expense.description}
                                    onChange={handleChange}
                                    placeholder="Enter description"
                                />

                            </div>


                            {/* AMOUNT */}

                            <div className="form-group">

                                <label>
                                    Amount
                                </label>


                                <input
                                    type="number"
                                    name="amount"
                                    value={expense.amount}
                                    onChange={handleChange}
                                    placeholder="Enter amount"
                                    min="0"
                                    step="0.01"
                                />

                            </div>


                            {/* CATEGORY */}

                            <div className="form-group">

                                <label>
                                    Category
                                </label>


                                <select
                                    name="category"
                                    value={expense.category}
                                    onChange={handleChange}
                                >

                                    <option value="">
                                        Select category
                                    </option>

                                    <option value="Food">
                                        Food
                                    </option>

                                    <option value="Travel">
                                        Travel
                                    </option>

                                    <option value="Hotel">
                                        Hotel
                                    </option>

                                    <option value="Transport">
                                        Transport
                                    </option>

                                    <option value="Entertainment">
                                        Entertainment
                                    </option>

                                    <option value="Other">
                                        Other
                                    </option>

                                </select>

                            </div>


                            {/* EXPENSE DATE */}

                            <div className="form-group">

                                <label>
                                    Expense Date
                                </label>


                                <input
                                    type="date"
                                    name="expenseDate"
                                    value={expense.expenseDate}
                                    onChange={handleChange}
                                />

                            </div>


                            {/* EVENT */}

                            <div className="form-group">

                                <label>
                                    Event
                                </label>


                                <select
                                    name="eventId"
                                    value={expense.eventId}
                                    onChange={handleChange}
                                >

                                    <option value="">
                                        Select event
                                    </option>


                                    {events.map((event) => (

                                        <option
                                            key={event.id}
                                            value={event.id}
                                        >
                                            {event.eventName}
                                        </option>

                                    ))}

                                </select>

                            </div>


                            {/* PAID BY */}

                            <div className="form-group">

                                <label>
                                    Paid By
                                </label>


                                <select
                                    name="userId"
                                    value={expense.userId}
                                    onChange={handleChange}
                                >

                                    <option value="">
                                        Select user
                                    </option>


                                    {users.map((user) => (

                                        <option
                                            key={user.id}
                                            value={user.id}
                                        >
                                            {user.name}
                                        </option>

                                    ))}

                                </select>

                            </div>


                            {/* MODAL BUTTONS */}

                            <div className="modal-actions">


                                <button
                                    type="button"
                                    className="cancel-button"
                                    onClick={() =>
                                        setShowModal(false)
                                    }
                                >
                                    Cancel
                                </button>


                                <button
                                    type="submit"
                                    className="submit-button"
                                >
                                    Add Expense
                                </button>


                            </div>


                        </form>

                    </div>

                </div>

            )}

        </div>

    );

}

export default Expenses;