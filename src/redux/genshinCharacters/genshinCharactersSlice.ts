import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { client } from 'api/client';
import { SERVER_URL } from 'constants/index';
import type Character from 'types/Character';

export interface GenshinState {
  list: Character[] | [];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | undefined | null;
}

const initialState: GenshinState = {
  list: [],
  status: 'idle',
  error: null,
};

export const fetchCharactersList = createAsyncThunk(
  'genshinCharacters/fetch',
  async () => {
    const response = await client.get(`${SERVER_URL}characters/all`);
    const transformedResponse = response?.data?.map((char: any, index: number) => ({
      id: index + 1,
      name: char.name,
      vision: char.vision,
      weapon: char.weapon,
      nation: char.nation,
      affiliation: char.affiliation,
      rarity: char.rarity
    }))
    return transformedResponse;
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
        state.status = 'succeeded';
        state.list = [...action.payload];
      })
      .addCase(fetchCharactersList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {} = genshinCharactersSlice.actions;

export const selectCharacters = (state: RootState) => state.genshinCharacters.list;

export default genshinCharactersSlice.reducer;
