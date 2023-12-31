import React from 'react';
import PropTypes from "prop-types";

function ToggleSwitch({
  onToggleChange = Function.prototype,
  toggleOn
}) {
    const ariaLabel = toggleOn ? "Turn on Light Mode" : "Turn on Dark Mode";

    return (
        <label className="switch" aria-label={ariaLabel}>
            <input
                type="checkbox"
                onChange={(e) => onToggleChange(e)}
                name="theme-selection-toggle"
                role='checkbox'
                checked={toggleOn}
            />
            <span className="slider round">0</span>
        </label>
    );
}

ToggleSwitch.propTypes = {
    onToggleChange: PropTypes.func.isRequired,
    toggleOn: PropTypes.bool.isRequired
};

export default ToggleSwitch;