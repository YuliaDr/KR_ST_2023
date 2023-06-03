import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    auth: -1,
    username: '',
    user: {},
    error: '',
}

export const login = createAsyncThunk(
    'auth/login',
    async function ({email, password}, {rejectWithValue}) {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/login/`, {
                method: 'POST',
                credentials: "include",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email,
                    password: password,
                })
            });

            return await response.json();

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


export const logout = createAsyncThunk(
    'auth/logout',
    async function (_, {rejectWithValue}) {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/logout/`, {
                method: 'POST',
                credentials: "include",
                headers: {'Content-Type': 'application/json'}
            });

            return await response.json();

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


export const register = createAsyncThunk(
    'auth/register',
    async function ({last_name, first_name, middle_name = "", email, password}, {rejectWithValue}) {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/register/`, {
                method: 'POST',
                credentials: "include",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    last_name: last_name,
                    first_name: first_name,
                    middle_name: middle_name,
                    email: email,
                    password: password,
                })
            });

            return await response.json();

            // if (middle_name !== '') {
            //     const response = await fetch(`http://127.0.0.1:8000/api/register/`, {
            //         method: 'POST',
            //         credentials: "include",
            //         headers: { 'Content-Type': 'application/json' },
            //         body: JSON.stringify({
            //             last_name: last_name,
            //             first_name: first_name,
            //             middle_name: middle_name,
            //             email: email,
            //             password: password,
            //         })
            //     });
            //
            //     return await response.json();
            // }
            // else {
            //     const response = await fetch(`http://127.0.0.1:8000/api/register/`, {
            //         method: 'POST',
            //         credentials: "include",
            //         headers: { 'Content-Type': 'application/json' },
            //         body: JSON.stringify({
            //             last_name: last_name,
            //             first_name: first_name,
            //             middle_name: "",
            //             email: email,
            //             password: password,
            //         })
            //     });
            //
            //     return await response.json();
            // }

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
//
// export const check = createAsyncThunk(
//     'auth/check',
//     async function (_, {rejectWithValue}) {
//         try {
//             const response = await fetch(`https://3b25-213-87-145-223.ngrok-free.app/api/check/`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 credentials: "include"
//             });
//
//             return await response.json();
//
//         } catch (error) {
//             return rejectWithValue(error.message);
//         }
//     }
// );


export const fetchUser = createAsyncThunk(
    'auth/fetchUser',
    async function ({username}, {rejectWithValue}) {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/users/?username=${username}`, {
                credentials: "include"
            });

            if (!response.ok) {
                throw new Error("Ошибка HTTP: " + response.status);
            }

            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},

    extraReducers: {
        [login.pending]: (state) => {
            state.loading = true;
            state.error = '';
        },
        [login.fulfilled]: (state, action) => {
            state.loading = false;
            state.auth = action.payload.status === 'ok' ? 1 : 0;
            state.username = action.payload.first_name + ' ' + action.payload.last_name;
            state.user = action.payload;
            state.error = '';
        },
        [login.rejected]: (state, action) => {
            state.loading = false;
            state.auth = -1;
            state.error = action.payload;
        },


        [logout.pending]: (state) => {
            state.loading = true;
            state.error = '';
        },
        [logout.fulfilled]: (state, action) => {
            state.loading = false;
            state.auth = action.payload.status === 'ok' ? -1 : 0;
            state.username = '';
            state.error = '';
        },
        [logout.rejected]: (state, action) => {
            state.loading = false;
            state.auth = -1;
            state.error = action.payload;
        },


        [register.pending]: (state) => {
            state.loading = true;
            state.error = '';
        },
        [register.fulfilled]: (state, action) => {
            state.loading = false;
            state.auth = action.payload.status === 'ok' ? 1 : -2;
            state.username = action.payload.first_name + ' ' + action.payload.last_name;
            state.user = action.payload;
            state.error = '';
        },
        [register.rejected]: (state, action) => {
            state.loading = false;
            state.auth = -1;
            state.error = action.payload;
        },

        // [check.pending]: (state) => {
        //     state.loading = true;
        //     state.error = '';
        // },
        // [check.fulfilled]: (state, action) => {
        //     state.loading = false;
        //     state.auth = action.payload.status === 'authorise' ? 1 : 0;
        //     state.username = action.payload.username;
        //     state.user = action.payload;
        //     state.error = '';
        // },
        // [check.rejected]: (state, action) => {
        //     state.loading = false;
        //     state.auth = -1;
        //     state.error = action.payload;
        // },

        [fetchUser.pending]: (state) => {
            state.loading = true;
            state.error = '';
        },
        [fetchUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.user = action.payload[0];
            state.error = '';
        },
        [fetchUser.rejected]: (state, action) => {
            state.loading = false;
            state.user = {};
            state.error = action.payload;
        },
    },
})

export default authSlice.reducer;