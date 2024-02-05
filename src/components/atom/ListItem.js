import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import {
    addNewItemToList, changeCheckedState,
    changeEditMode,
    checkItem,
    deleteItem, moveCurrentState,
    unCheckItem,
    updateItemText,
    updateLatestChangeToDoHistory
} from "../../utils/utils";
import {find, isEmpty} from "lodash";
import classNames from "classnames";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleMinus} from "@fortawesome/free-solid-svg-icons";
// import {updateLatestChangeToDoHistory} from "../../redux/actions";
// import {useDispatch} from "react-redux";

function ListItem({
    checked,
    editMode,
    id,
    listHistoryState,
    setListHistoryState,
    text = ''
  }) {
    // const currentListView = find(listHistoryState, x => x.isCurrent)?.list;
    const copyOfList = listHistoryState.slice();
    const currentListView = find(copyOfList, x => x.isCurrent)?.list || [];
    const [itemText, setItemText] = useState(text);

    const handleCheckboxChange = (checkEvent) => {
        let updatedArray = currentListView;

        // if(checkEvent) {
        //     updatedArray = checkItem(id, updatedArray);
        // }
        //
        // if(!checkEvent) {
        //     updatedArray = unCheckItem(id, updatedArray);
        // }
        updatedArray = changeCheckedState(id, updatedArray, checkEvent)

        const updateCurrentState = updateLatestChangeToDoHistory(updatedArray, listHistoryState);
        setListHistoryState(updateCurrentState);
    }

    const handleOnInputBlur = () => {
        if(isEmpty(itemText)) {
            // PERFORM AN UNDO IF ITEM TEXT IS EMPTY
            const undoHistoryState = moveCurrentState(listHistoryState);
            setListHistoryState([...undoHistoryState]);
            return;
        }

        // console.log('list to pass');
        // console.log('currentListView');
        // console.log(currentListView);
        // console.log('listHistoryState');
        // console.log(listHistoryState);
        const updatedArray = updateItemText(id, itemText, false, currentListView);

        console.log('updatedArray AFTER updating Item Text');
        console.log(updatedArray);

        const updateCurrentState = updateLatestChangeToDoHistory(updatedArray, listHistoryState);

        console.log('updateCurrentState');
        console.log(updateCurrentState);

        // setListHistoryState([...updateCurrentState]);
        setListHistoryState(updateCurrentState);
    }
    const handleEnterKey = () => {
        if(isEmpty(itemText)) {
            // PERFORM AN UNDO IF ITEM TEXT IS EMPTY
            const undoHistoryState = moveCurrentState(listHistoryState);
            setListHistoryState([...undoHistoryState]);
            return;
        }

        console.log('list 1');
        console.log(currentListView);
        const updatedTextArray = updateItemText(id, itemText, false, currentListView);

        // update text item in history
        let updateCurrentState = updateLatestChangeToDoHistory(updatedTextArray, listHistoryState);

        console.log('updateCurrentState 1');
        console.log(updateCurrentState);

        const updatedArrayWithNewItem = addNewItemToList(updatedTextArray);
        console.log('updatedArrayWithNewItem');
        console.log(updatedArrayWithNewItem);

        updateCurrentState = updateLatestChangeToDoHistory(updatedArrayWithNewItem, updateCurrentState, true);

        console.log('updateCurrentState 2');
        console.log(updateCurrentState);

        // setListHistoryState([...updateCurrentState]);
        setListHistoryState(updateCurrentState);
    }

    function onStaticTextClick() {
        const updatedArray = changeEditMode(id, true, currentListView);
        const updateCurrentState = updateLatestChangeToDoHistory(updatedArray, listHistoryState, true);

        // setListHistoryState([...updateCurrentState]);
        setListHistoryState(updateCurrentState);
    }

    const renderTextOrInput = () => {
        return editMode ?
        /* RENDER INPUT */
        (<input
            id={`text-input-${id}`}
            autoFocus={editMode}
            className='w-full active:w-full focus:text-yellow-950 pl-1'
            placeholder="Type to-do item here"
            type="text"
            value={itemText}
            onChange={(e) => setItemText(e.target.value)}
            onBlur={() => handleOnInputBlur()}
            onKeyDown={(e) => {
                if (e.key === 'Enter') handleEnterKey()
            }}
        />) :
            /* RENDER STATIC TEXT */
            <div
                className='cursor-pointer text-left'
                onClick={() => onStaticTextClick()}
                id={`list-item-text-${id}`}
            >
                {text}
            </div>
    }

    function onDeleteItem() {
        const updatedArray = deleteItem(id, currentListView);
        setListHistoryState(updatedArray, listHistoryState);
    }

    return (
        <div className={
            classNames('flex w-full px-4 justify-between hover:bg-secondary-bg',
                {'line-through italic': checked, '': !checked})
            }
            id={`list-item-${id}`}
        >
            {/* LIST ITEM INPUT/TEXT ITEM */}
            <div className='flex m-2' id={`checkbox-${id}`}>
                <label id={`label-${id}`} aria-label={text}/>
                <input
                    id={`checkbox-${id}`}
                    aria-label={text}
                    aria-labelledby={`label-${id}`}
                    type="checkbox"
                    checked={checked}
                    className={classNames('mr-2 w-[24px] h-[24px]', {'font-bold': checked, 'font-light': !checked})}
                    onChange={(e) => handleCheckboxChange(!checked)}
                />
                {renderTextOrInput()}
            </div>
            {/* DELETE INDIVIDUAL ITEM BUTTON */}
            <div className='items-end' id={`to-do-delete-${id}`}>
                <button
                    className='bold text-xl'
                    onClick={()=> onDeleteItem()}
                >
                    <FontAwesomeIcon icon={faCircleMinus} className='pt-2' />
                </button>
            </div>
        </div>
    );
}

ListItem.propTypes = {
    checked: PropTypes.bool.isRequired,
    editMode: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    listHistoryState:  PropTypes.arrayOf(PropTypes.shape({
        isCurrent: PropTypes.bool,
        list: PropTypes.arrayOf(PropTypes.shape({
            checked: PropTypes.bool,
            editMode: PropTypes.bool,
            id: PropTypes.string,
            text: PropTypes. string
        }))
    })).isRequired,
    setListHistoryState: PropTypes.func.isRequired,
    text: PropTypes.string
};

export default ListItem;