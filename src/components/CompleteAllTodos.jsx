import React from "react";
import PropTypes from "prop-types";

function CompleteAllTodos({ completeAllTodos }) {
    return (
        <div onClick={completeAllTodos} className="button">
            Check All
        </div>
    );
}

CompleteAllTodos.propTypes = {
    completeAllTodos: PropTypes.func.isRequired,
};

export default CompleteAllTodos;
