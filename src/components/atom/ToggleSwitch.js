import React from 'react';
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMoon, faSun} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

function ToggleSwitch({
    className = '',
    onToggleChange = Function.prototype,
    toggleOn
}) {
    const ariaLabel = toggleOn ? "Turn on Light Mode" : "Turn on Dark Mode";
    const icon = toggleOn ? faSun : faMoon;

    return (
        <label
            className={classNames(`switch ${className}`)}
            aria-label={ariaLabel}
            data-testid='toggle-switch'
        >
            <input
                type="checkbox"
                onChange={(e) => onToggleChange(e.target.checked)}
                name="theme-selection-toggle"
                role='checkbox'
                checked={toggleOn}
                data-testid='toggle-input'
            />
            <span className="slider round">
                <FontAwesomeIcon icon={icon} className='mt-1.5' />
            </span>
        </label>
    );
}

ToggleSwitch.propTypes = {
    className: PropTypes.string,
    onToggleChange: PropTypes.func.isRequired,
    toggleOn: PropTypes.bool.isRequired
};

export default ToggleSwitch;