import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
    grounds: [],
    categories: [],
    locations: [],
    parks:[],
    parkLocations:[],
};

const playbookSlice = createSlice({
    name: "playbook",
    initialState,
    reducers: {
        setGrounds(state, action: any) {
            return { ...state, grounds: action.payload };
        },
        setParks(state,action:any){
            return { ...state, parks: action.payload };
        },
        setCategories(state, action) {
            return { ...state, categories: action.payload };
        },
        setLocations(state, action) {
            return { ...state, locations: action.payload };
        },
        setParkLocations(state, action) {
            return { ...state, parkLocations: action.payload };
        },
        // Add more cases for updating, deleting, or modifying products
    },
});
export const { setGrounds, setLocations, setCategories,setParks,setParkLocations } = playbookSlice.actions;
export default playbookSlice;
