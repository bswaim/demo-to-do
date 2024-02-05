import React from 'react';
import PropTypes from "prop-types";
import {filter, find, isEmpty, map} from "lodash";
import ListItem from "../atom/ListItem";

function CheckListSection({
    groupedByUnChecked = false,
    listHistoryState,
    setListHistoryState
}) {
    const renderListItems = () => {
        const currentListView = find([...listHistoryState], x => x.isCurrent)?.list || [];
        const filteredList = filter(currentListView, item => groupedByUnChecked ? item?.checked : !item?.checked);

        if(isEmpty(filteredList)) return;

        return map(filteredList, listItem => 
            <li key={listItem?.id}>
                <ListItem
                    checked={listItem?.checked}
                    id={listItem?.id}
                    editMode={listItem?.editMode}
                    listHistoryState={listHistoryState}
                    setListHistoryState={(array) => setListHistoryState([...array])}
                    text={listItem?.text}
                />
            </li>);
    }

    return (
        <ul>
            {renderListItems()}
        </ul>
    );
}

CheckListSection.propTypes = {
    groupedByUnChecked: PropTypes.bool,
    listHistoryState:  PropTypes.arrayOf(PropTypes.shape({
        isCurrent: PropTypes.bool,
        list: PropTypes.arrayOf(PropTypes.shape({
            checked: PropTypes.bool,
            editMode: PropTypes.bool,
            id: PropTypes.string,
            text: PropTypes. string
        }))
    })).isRequired,
    setListHistoryState: PropTypes.func.isRequired
};

export default CheckListSection;