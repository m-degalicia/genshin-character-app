import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { fetchCharacters } from './genshinCharactersAPI';

import type Character from 'types/Character';

export interface GenshinState {
  list: Character[] | [];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: GenshinState = {
  list: [
    {
      "id": 1,
      "name": "Albedo",
      "vision": "Geo",
      "weapon": "Sword",
      "nation": "Mondstadt",
      "affiliation": "Knights of Favonius",
      "rarity": 5,
    },
    {
      "id": 2,
      "name": "Xiao",
      "vision": "Anemo",
      "weapon": "Polearm",
      "nation": "Liyue",
      "affiliation": "Liyue Adeptus",
      "rarity": 5,
    }
  ],
  status: 'idle',
};

export const fetchCharactersList = createAsyncThunk(
  'genshinCharacters/fetchCharacters',
  async () => {
    const response = await fetchCharacters();
    console.log(response.data);
    return response.data;
  }
);

export const genshinCharactersSlice = createSlice({
  name: 'genshinCharacters',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharactersList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCharactersList.fulfilled, (state, action) => {
        state.status = 'idle';
        state.list = [...action.payload];
      })
      .addCase(fetchCharactersList.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const {} = genshinCharactersSlice.actions;

export const selectCharacters = (state: RootState) => state.genshinCharacters.list;

export default genshinCharactersSlice.reducer;
