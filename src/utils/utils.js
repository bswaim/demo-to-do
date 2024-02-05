import {filter, findIndex, get, isEmpty, map, slice} from "lodash";
import {v4 as uuidv4} from "uuid";
import {IS_CURRENT, MAX_HISTORY} from "./constants";

// ToDoApp Utils
export const changeEditMode = (itemId, editMode, list) => {
    // const updatedArray = slice(list);
    const indexOfItemToUpdate = findIndex(list, x => x.id === itemId);
    const updatedObject = list[indexOfItemToUpdate];

    updatedObject.editMode = editMode; // this will mutate original list, but this is intentional. This will avoid adding more history to the list of changes

    return list;
}

export const updateItemText = (itemId, newText, editMode = false, list) => {
    let updatedArray = slice(list);

    updatedArray = map(updatedArray, x => {
        if(x.id === itemId) {
           return  {
                id: x.id,
                text: newText,
                editMode: editMode,
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

    // return [...updatedArray];
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

// export const checkItem = (itemId, list) => {
//     const updatedArray = slice(list);
//     const indexOfCheckedItem = findIndex(updatedArray, x => x.id === itemId);
//     const itemToMove = updatedArray[indexOfCheckedItem];
//
//     itemToMove.checked = true;
//     itemToMove.editMode = false;
//     updatedArray.splice(indexOfCheckedItem, 1); // remove original item
//     updatedArray.push(itemToMove); // add it to end of list
//
//     return [...updatedArray];
// }
//
// export const unCheckItem = (itemId, list) => {
//     const updatedArray = slice(list);
//     const indexOfUnCheckedItem = findIndex(updatedArray, x => x.id === itemId);
//     const itemToMove = updatedArray[indexOfUnCheckedItem];
//     const newIndex = findIndex(updatedArray, x => x.checked); // find first index of completed item
//
//     itemToMove.checked = false;
//     itemToMove.editMode = false;
//
//     updatedArray.splice(indexOfUnCheckedItem, 1); // remove original item
//     updatedArray.splice(newIndex, 0, itemToMove); // add it to bottom of unchecked items
//
//     return [...updatedArray];
// }

export const deleteItem = (itemId, list) => {
    const updatedArray = slice(list);
    const indexOfItemToDelete = findIndex(updatedArray, x => x.id === itemId);

    updatedArray.splice(indexOfItemToDelete, 1); // delete item

    return [...updatedArray];
}
export const removeCheckedItems = (list) => {
    const updatedArray = slice(list);
    return filter(updatedArray, item => !item?.checked);
}

export const clearIsCurrentProps = (historyList) => {
    const updatedArray = slice(historyList);
    return map(updatedArray, x => {
        x.isCurrent = false
        return x;
    });
}


// todo: DO WE NEED THIS:??
// export const removeEmptyTextItems = (historyList) => {
//     let updatedArray = slice(historyList);
//     return filter(updatedArray, x => { // will this mutate original???
//             if(!isEmpty(x.list)) {
//                 // if text is empty, delete that item
//                 const filteredList = filter(x.list, eachListItem => isEmpty(eachListItem?.text));
//                 if(isEmpty(filteredList)) return true;
//                 else return false;
//                 // if remaining list items exist, set edit mode to false for all
//                 // else x.list = map(filteredList, eachFilteredItem => {
//                 //     if(eachFilteredItem.editMode) eachFilteredItem.editMode = false;
//                 //     return eachFilteredItem;
//                 // });
//             }
//             return true;
//         }
//     );
// }
export const removeAllEditModeFromHistory = (historyList) => {
    // filter main list by isInEditMode
    let updatedArray = slice(historyList);
    updatedArray = filter(updatedArray, x => !x.isInEditMode);
    // todo: set all individual list items edit mode to false:
    return map(updatedArray, x => {
        if(isEmpty(x.list)) return x;
        map(x.list, eachListItem => {
            eachListItem.editMode = false
            return eachListItem;
        })
        return x;
    })
}
// export const setEditModeFalseAndRemoveEmptyText = (historyList) => {
//     let updatedArray = slice(historyList);
//     return map(updatedArray, x => {
//             if(!isEmpty(x.list)) {
//                 // if text is empty, delete that item
//                 const filteredList = filter(x.list, eachListItem => !isEmpty(eachListItem?.text));
//                 if(isEmpty(filteredList)) x.list = [];
//                 // if remaining list items exist, set edit mode to false for all
//                 else x.list = map(filteredList, eachFilteredItem => {
//                     if(eachFilteredItem.editMode) eachFilteredItem.editMode = false;
//                     return eachFilteredItem;
//                 });
//             }
//             return x;
//         }
//     );
// }
export const moveCurrentState = (listHistory, undo = true) => {
    const updatedHistory = slice(listHistory);
    const currentListIndex = findIndex(updatedHistory, x => x.isCurrent === true);
    let newCurrentIndex = undo ? currentListIndex - 1 : currentListIndex + 1;

    clearIsCurrentProps(updatedHistory);

    updatedHistory[newCurrentIndex].isCurrent = true;

    return updatedHistory;
}

export const limitListLength = (list, length) => {
    const updatedArray = slice(list);
    const numberOfItemsToRemove = updatedArray.length - length;
    return updatedArray.splice(0, numberOfItemsToRemove);
}

export const updateLatestChangeToDoHistory = (newListItem, historyToUpdate, editMode = false) => {
    let updatedHistory = historyToUpdate.slice();
    // let newListItemCopy = [...newListItem];

    const newObject = {[IS_CURRENT]: true, list: newListItem.slice(), isInEditMode: editMode};
    const currentListIndex = findIndex(updatedHistory, x => x.isCurrent === true);
    const mostRecentListItem = updatedHistory[currentListIndex].list;

    //check if there is a change between previous state and new one
    if(JSON.stringify(newListItem) === JSON.stringify(mostRecentListItem)) return updatedHistory;

    // remove the history that is after current state
    updatedHistory.splice(currentListIndex + 1);

    // return isCurrent as false for all
    if(updatedHistory.length > 0) updatedHistory = clearIsCurrentProps(updatedHistory);
    // if(updatedHistory.length > 0 && !editMode) updatedHistory = setEditModeFalseAndRemoveEmptyText(updatedHistory);
    if(updatedHistory.length > 0 && !editMode) {
        // updatedHistory = removeEmptyTextItems(updatedHistory);
        updatedHistory = removeAllEditModeFromHistory(updatedHistory);
    }
    // todo: will probably still need to change all prev stages of history to editMode = false

    // set new item as latest change at end of list
    updatedHistory.push(newObject);
    
    // ensure list is no longer than MAX_HISTORY steps long
    if(updatedHistory.length > MAX_HISTORY) limitListLength(updatedHistory, MAX_HISTORY);

    return [...updatedHistory];
}