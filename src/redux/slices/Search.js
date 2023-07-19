import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'searchSlice',
  initialState: {
    location: '',
    startDate: null,
    endDate: null,
    numberOfGuests: 1,
    maViTri: '',
  },
  reducers: {
    setSearch: (state, action) => {
      state.location = action.payload.location;
      state.startDate = action.payload.startDate;
      state.endDate = action.payload.endDate;
      state.numberOfGuests = parseInt(action.payload.numberOfGuests);
      state.maViTri = action.payload.maViTri; 
    },
  },
});

export const { setSearch, clearSearch } = searchSlice.actions;

export default searchSlice.reducer;
