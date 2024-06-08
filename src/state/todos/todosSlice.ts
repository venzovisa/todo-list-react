import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TodoType } from "../../models/todos";
import { getTodos } from "../../utils";

type TodosState = {
  value: TodoType[];
};

const initialState: TodosState = {
  value: getTodos() || [],
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    add: (state, data) => {
      state.value = [...state.value, data.payload];
    },
    remove: (state, data) => {
      state.value = state.value.filter((t) => t.id !== data.payload);
    },
    change: (state, data) => {
      state.value = state.value.map((t) =>
        t.id === data.payload.id ? { ...t, ...data.payload } : t
      );
    },
    // Used in tests to replace the store on every run
    replace: (state, data) => {
        state.value = data.payload;
    }
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
  //   extraReducers: (builder) => {
  //     builder
  //       .addCase(incrementAsync.pending, () => {
  //         console.log("incrementAsync.pending");
  //       })
  //       .addCase(
  //         incrementAsync.fulfilled,
  //         (state, action: PayloadAction<number>) => {
  //           state.value += action.payload;
  //         }
  //       );
  //   },
});

// export const incrementAsync = createAsyncThunk(
//   "counter/incrementAsync",
//   async (amount: number) => {
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//     return amount;
//   }
// );

export const { add, remove, change, replace } = todosSlice.actions;

export default todosSlice.reducer;
