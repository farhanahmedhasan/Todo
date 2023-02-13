import React from "react";
import PropTypes from "prop-types";

function TodoFilters({ filter, setFilter }) {
    function getValue(event) {
        setFilter(event.target.value);
    }

    return (
        <div>
            <button
                value="all"
                onClick={getValue}
                className={`button filter-button ${filter === "all" ? "filter-button-active" : ""}`}
            >
                All
            </button>
            <button
                value="active"
                onClick={getValue}
                className={`button filter-button ${
                    filter === "active" ? "filter-button-active" : ""
                }`}
            >
                Active
            </button>
            <button
                value="completed"
                onClick={getValue}
                className={`button filter-button ${
                    filter === "completed" ? "filter-button-active" : ""
                }`}
            >
                Completed
            </button>
        </div>
    );
}

TodoFilters.propTypes = {
    setFilter: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired,
};

export default TodoFilters;
