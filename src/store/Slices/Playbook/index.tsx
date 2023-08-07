import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
    grounds: [],
    categories: [],
    locations: [],
};

const playbookSlice = createSlice({
    name: "playbook",
    initialState,
    reducers: {
        setGrounds(state, action: any) {
            return { ...state, grounds: action.payload };
        },
        setCategories(state, action) {
            return { ...state, categories: action.payload };
        },
        setLocations(state, action) {
            return { ...state, locations: action.payload };
        },
        // Add more cases for updating, deleting, or modifying products
    },
});
export const { setGrounds, setLocations, setCategories } = playbookSlice.actions;
export default playbookSlice;
