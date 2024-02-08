export const id1 = 'fake-guid-0';
const id2 = 'fake-guid-1';
const text1 = 'initial unchecked item text';
const text2 = 'initial checked item text';

export const newText = 'new text';

/* ****************************************************** */
/* *** LIST MOCK DATA START *** */
/* ****************************************************** */
export const initialListMock = [
    {text: text1, id: id1, editMode: false, checked: false},
    {text: text2, id: id2, editMode: false, checked: true},
];

export const limitListLengthMockInitialList =[1, 2, 3, 4, 5, 6, 7, 8, 9];

export const limitListLengthMockResult =[5, 6, 7, 8, 9]; // for max of 5 in test case

export const changeCheckedStateResult=[
    {text: text1, id: id1, editMode: false, checked: true},
    {text: text2, id: id2, editMode: false, checked: true},
];

export const changeEditModeResult = [
    {text: text1, id: id1, editMode: true, checked: false},
    {text: text2, id: id2, editMode: false, checked: true},
]; // pass in itemId1, true, and initialListMock

export const updateItemTextResult = [
    {text: newText, id: id1, editMode: false, checked: false},
    {text: text2, id: id2, editMode: false, checked: true},
]; // pass in id1, newText, initialListMock

/* ****************************************************** */
/* *** LIST HISTORY MOCK DATA START *** */
/* ****************************************************** */
export const mockListHistoryInitialState =[
    {isCurrent: true, list: initialListMock, isInEditMode: false}
];

export const clearIsCurrentPropsResult =[
    {isCurrent: false, list: initialListMock, isInEditMode: false}
];

export const initialMoveCurrentMockData = [
    {isCurrent: false, list: initialListMock, isInEditMode: false},
    {isCurrent: true, list: initialListMock, isInEditMode: false},
    {isCurrent: false, list: initialListMock, isInEditMode: false}
];

const initialRemoveAllEditModeListWithEditTrue= [ // this is same as initialListMock, but with editMode as true
    {text: text1, id: id1, editMode: true, checked: false},
    {text: text2, id: id2, editMode: true, checked: true},
];

export const removeAllEditModeFromHistoryInitialMockData = [
    {isCurrent: false, list: initialListMock, isInEditMode: true},
    {isCurrent: false, list: initialRemoveAllEditModeListWithEditTrue, isInEditMode: false},
    {isCurrent: true, list: initialListMock, isInEditMode: false}
];

export const removeAllEditModeFromHistoryResult = [
    {isCurrent: false, list: initialListMock, isInEditMode: false},
    {isCurrent: true, list: initialListMock, isInEditMode: false}
]; // removes isInEditMode with true and sets editMode to false within list items

export const newListItemWithEditFalse = [
    {text: text1, id: id1, editMode: false, checked: true},
    {text: '', id: id2, editMode: false, checked: true},
];

export const newListItemWithEditTrue = [
    {text: text1, id: id1, editMode: false, checked: true},
    {text: '', id: id2, editMode: true, checked: true},
];

export const updateLatestChangeToDoHistoryResultWithEditModeTrue = [
    {isCurrent: false, list: initialListMock, isInEditMode: false},
    {isCurrent: true, list: newListItemWithEditTrue, isInEditMode: true}
]; // use this as new list item for updateLatestChangeToDoHistory editMode false test

export const updateLatestChangeToDoHistoryResultWithEditModeFalse = [
    {isCurrent: false, list: initialListMock, isInEditMode: false},
    {isCurrent: true, list: newListItemWithEditFalse, isInEditMode: false}
];