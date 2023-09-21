import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';

const API_URL = 'https://650b400adfd73d1fab09d158.mockapi.io/reduxcrud';

// Create a new user
export const createUser = createAsyncThunk(
  'user/createUser',
  async function (user) {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    return data;
  }
);

// Get all the users
export const getUsers = createAsyncThunk('user/getUsers', async function () {
  try {
    const response = await fetch(API_URL);
    const users = await response.json();
    return users;
  } catch (err) {
    throw new Error(err.message);
  }
});

// Delete the users
export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async function (id) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'Delete',
      });
      const data = await response.json();
      return data;
    } catch (err) {
      throw new Error(err.message);
    }
  }
);

// Update user
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async function (updatedData) {
    const response = await fetch(`${API_URL}/${updatedData.id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });
    const data = await response.json();
    return data;
  }
);

// user Slice
const initialState = {
  users: [],
  isLoading: false,
  error: null,
  searchQuery: '',
};

const userDetailSlice = createSlice({
  name: 'userDetail',
  initialState,
  reducers: {
    searchUser: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      // create new user
      .addCase(createUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // get all the users
      .addCase(getUsers.pending, state => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // delete the users
      .addCase(deleteUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const { id } = action.payload;
        if (id) {
          state.users = state.users.filter(user => user.id !== id);
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Update the user
      .addCase(updateUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;

        state.users = state.users.map(user =>
          user.id === action.payload.id ? action.payload : user
        );
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default userDetailSlice.reducer;

export const {searchUser}  = userDetailSlice.actions