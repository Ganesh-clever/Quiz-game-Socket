import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isModalOpen: false,
    breadCrumbs: [
        {
            title: "Dashboard",
            href: "/",
            preventPush: true,
        },
    ],
    headerTitle: 'Dashboard',
    roomId: '',
    socketuserId : '',
}
export const UtilsSlices = createSlice({
    name: 'UtilsReducers',
    initialState,
    reducers: {
        ModalHandler: (state, action) => {
            if (state.isModalOpen == false) {
                state.isModalOpen = true
            } else {
                state.isModalOpen = false;
            }
        },
        RoomHandler: (state,action) => {
          state.roomId = action.payload;
        },
        HeaderTitleHandler : (state,action) => {
          state.headerTitle = action.payload;
        },
        BreadCrumbConfig: (state, action: any) => {
            if (action.payload.preventPush === true) {
                state.breadCrumbs.length <= 2 && state.breadCrumbs.splice(1, 1);
                const exists = state.breadCrumbs.filter(
                    (val: any) => val.title === action.payload.title
                );
                if (exists.length <= 0) {
                    state.breadCrumbs.push(action.payload);
                }
                state.breadCrumbs = state.breadCrumbs.filter(
                    (val: any) => val.preventPush == true
                );
                state.breadCrumbs.length > 2 && state.breadCrumbs.splice(1, 1);
            } else {
                const exists = state.breadCrumbs.filter(
                    (val: any) => val.title === action.payload.title
                );
                
                if (exists.length <= 0) {
                    state.breadCrumbs.push(action.payload);
                    state.breadCrumbs = [...new Set(state.breadCrumbs)];
                }
                const index = state.breadCrumbs.findIndex(
                    (item: any) => item.title === action.payload.title
                );

                if (index !== -1 && index < state.breadCrumbs.length - 1) {
                    state.breadCrumbs.splice(index + 1, 1);
                }
            }
        },
    },
    extraReducers: {}
});

export const { ModalHandler, BreadCrumbConfig, RoomHandler, HeaderTitleHandler } = UtilsSlices.actions;
export default UtilsSlices.reducer;