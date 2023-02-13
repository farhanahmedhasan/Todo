import React from "react";
import PropTypes from "prop-types";

function TodoCompleteAll({ completeAllTodos }) {
    return (
        <div onClick={completeAllTodos} className="button">
            Check All
        </div>
    );
}

TodoCompleteAll.propTypes = {
    completeAllTodos: PropTypes.func.isRequired,
};

export default TodoCompleteAll;
