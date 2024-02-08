import {filter, findIndex, get, isEmpty, map, slice} from "lodash";
import {v4 as uuidv4} from "uuid";
import {IS_CURRENT, MAX_HISTORY} from "./constants";

// TO-DO LIST UTILS:
export const limitListLength = (list, maxLength) => {
    let updatedArray = list.slice();
    const numberOfItemsToRemove = list.length - maxLength;
    updatedArray = filter(updatedArray, (x, index) => index >= numberOfItemsToRemove);

    return updatedArray;
}

export const changeEditMode = (itemId, editMode, list) => {
    const indexOfItemToUpdate = findIndex(list, x => x.id === itemId);
    const updatedObject = list[indexOfItemToUpdate];

    updatedObject.editMode = editMode; // this will mutate original list, but this is intentional. This will avoid adding more history to the list of changes

    return list;
}

export const updateItemText = (itemId, newText, list) => {
    let updatedArray = slice(list);

    updatedArray = map(updatedArray, x => {
        if(x.id === itemId) {
           return  {
                id: x.id,
                text: newText,
                editMode: false,
                checked: x.checked
            }
        }
        return {...x};
    })

    return updatedArray;
}

export const addNewItemToList = (list) => {
    const updatedArray = slice(list);
    const newId = uuidv4();
    const emptyListItem = { id: newId, text: "", editMode: true, checked: false };

    // set editMode to false for all items
    if(list.length > 0) updatedArray.map(x => x.editMode = false);
    // add new item
    updatedArray.push(emptyListItem);

    return updatedArray;
}

export const changeCheckedState = (itemId, list, checked) => {
    let updatedArray = slice(list);

    updatedArray = map(updatedArray, x => {
        if(x.id === itemId) {
            return  {
                id: x.id,
                text: x.text,
                editMode: false,
                checked: checked
            }
        }
        return {...x}
    })
    return updatedArray;
}

export const deleteItem = (itemId, list) => {
    let updatedArray = list.slice();
    updatedArray = filter(updatedArray, x => !(x?.id === itemId));

    return updatedArray;
}

export const removeCheckedItems = (list) => {
    const updatedArray = slice(list);
    return filter(updatedArray, item => !item?.checked);
}

// HISTORY LIST STATE EDITS
export const clearIsCurrentProps = (historyList) => {
    const updatedArray = slice(historyList);
    return map(updatedArray, x => {
        x.isCurrent = false
        return x;
    });
}

export const removeAllEditModeFromHistory = (historyList) => {
    // filter main list by isInEditMode
    let updatedArray = slice(historyList);
    updatedArray = filter(updatedArray, x => !x.isInEditMode);
    // set all individual list items edit mode to false
    return map(updatedArray, x => {
        if(isEmpty(x.list)) return x;
        map(x.list, eachListItem => {
            eachListItem.editMode = false
            return eachListItem;
        })
        return x;
    })
}

export const moveCurrentState = (historyList, undo = true) => {
    const updatedHistory = slice(historyList);
    const currentListIndex = findIndex(updatedHistory, x => x.isCurrent === true);
    let newCurrentIndex = undo ? currentListIndex - 1 : currentListIndex + 1;

    clearIsCurrentProps(updatedHistory);

    updatedHistory[newCurrentIndex].isCurrent = true;

    return updatedHistory;
}

export const updateLatestChangeToDoHistory = (newListItem, historyToUpdate, editMode = false) => {
    let updatedHistory = historyToUpdate.slice();

    const newObject = {[IS_CURRENT]: true, list: newListItem.slice(), isInEditMode: editMode};
    const currentListIndex = findIndex(updatedHistory, x => x.isCurrent === true);
    const mostRecentListItem = updatedHistory[currentListIndex].list;

    //check if there is a change between previous state and new one
    if(JSON.stringify(newListItem) === JSON.stringify(mostRecentListItem)) return updatedHistory;

    // remove the history that is after current state
    updatedHistory.splice(currentListIndex + 1);

    // return isCurrent as false for all
    if(updatedHistory.length > 0) updatedHistory = clearIsCurrentProps(updatedHistory);
    // clear all edit states from history
    if(updatedHistory.length > 0 && !editMode) {
        updatedHistory = removeAllEditModeFromHistory(updatedHistory);
    }

    // set new item as latest change at end of list
    updatedHistory.push(newObject);
    
    // ensure list is no longer than MAX_HISTORY steps long
    if(updatedHistory.length > MAX_HISTORY) updatedHistory = limitListLength(updatedHistory, MAX_HISTORY);

    return updatedHistory;
}