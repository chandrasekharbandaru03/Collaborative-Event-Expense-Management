import { useEffect, useState } from "react";

import {
    getAllEvents,
    createEvent
} from "../services/eventService";

function Events() {

    const [events, setEvents] = useState([]);

    const [showForm, setShowForm] = useState(false);

    const [event, setEvent] = useState({
        eventName: "",
        location: ""
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Load events when page opens
    useEffect(() => {
        loadEvents();
    }, []);

    const loadEvents = async () => {

        try {

            setLoading(true);

            const data = await getAllEvents();

            setEvents(data);
            setError("");

        } catch (err) {

            console.error(err);
            setError("Failed to load events.");

        } finally {

            setLoading(false);
        }
    };

    // Handle input changes
    const handleChange = (e) => {

        setEvent({
            ...event,
            [e.target.name]: e.target.value
        });
    };

    // Create event
    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!event.eventName.trim() || !event.location.trim()) {

            setError("Event name and location are required.");
            return;
        }

        try {

            await createEvent(event);

            // Clear form
            setEvent({
                eventName: "",
                location: ""
            });

            setShowForm(false);
            setError("");

            // Reload events
            loadEvents();

        } catch (err) {

            console.error(err);

            setError(
                err.response?.data?.message ||
                "Failed to create event."
            );
        }
    };

    return (
        <div className="events-page">

            {/* Header */}
            <div className="page-header">

                <div>
                    <h1>Events</h1>
                    <p>Manage your events</p>
                </div>

                <button
                    className="add-button"
                    onClick={() => setShowForm(true)}
                >
                    + Add Event
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

                <p>Loading events...</p>

            ) : events.length === 0 ? (

                <div className="empty-state">

                    <h3>No events found</h3>

                    <p>
                        Create your first event to get started.
                    </p>

                </div>

            ) : (

                <div className="events-grid">

                    {events.map((event) => (

                        <div
                            className="event-card"
                            key={event.id}
                        >

                            <div className="event-icon">
                                📅
                            </div>

                            <div className="event-details">

                                <h3>
                                    {event.eventName}
                                </h3>

                                <p className="event-location">
                                    📍 {event.location}
                                </p>

                                <span className="event-id">
                                    Event ID: {event.id}
                                </span>

                            </div>

                        </div>

                    ))}

                </div>

            )}

            {/* Add Event Modal */}
            {showForm && (

                <div className="modal-overlay">

                    <div className="modal">

                        <div className="modal-header">

                            <h2>Add Event</h2>

                            <button
                                className="close-button"
                                onClick={() => setShowForm(false)}
                            >
                                ×
                            </button>

                        </div>

                        <form onSubmit={handleSubmit}>

                            <label>
                                Event Name
                            </label>

                            <input
                                type="text"
                                name="eventName"
                                placeholder="Enter event name"
                                value={event.eventName}
                                onChange={handleChange}
                            />

                            <label>
                                Location
                            </label>

                            <input
                                type="text"
                                name="location"
                                placeholder="Enter location"
                                value={event.location}
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
                                    Save Event
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </div>
    );
}

export default Events;