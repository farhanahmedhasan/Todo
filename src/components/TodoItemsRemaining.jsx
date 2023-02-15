import React from "react";
import PropTypes from "prop-types";

function TodoItemsRemaining({ remainingItems }) {
    return <span>{remainingItems} items remaining</span>;
}

TodoItemsRemaining.propTypes = {
    remainingItems: PropTypes.number.isRequired,
};

export default TodoItemsRemaining;
