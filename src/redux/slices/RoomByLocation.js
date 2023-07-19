import { createSlice } from '@reduxjs/toolkit';

const RoomByLocationSlice = createSlice({
  name: 'RoomByLocationSlice',
  initialState: {
    listRoom: [],
  },
  reducers: {
    setListRoom: (state, action) => {
      state.listRoom = action.payload;
    },
  },
});

export const { setListRoom } = RoomByLocationSlice.actions;
export default RoomByLocationSlice.reducer;
