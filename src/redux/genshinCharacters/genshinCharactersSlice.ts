import { createAsyncThunk, createSelector, createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
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
    const transformedResponse = response?.data?.map((char: any) => ({
      id: nanoid(),
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
    characterAdded: (state, action) => {
      let characterList: Character[] = [];
      characterList = [...state.list];
      characterList.push(action.payload);
      return { ...state, list: characterList }
    },
    characterUpdated: (state, action) => {
      const { id } = action.payload;
      const existingCharacterIndex = state.list.findIndex(character => character.id === id);
      if (existingCharacterIndex > -1) {
        state.list[existingCharacterIndex] = action.payload;
      }
    },
    characterRemoved: (state, action) => {
      const { id } = action.payload;
      const existingCharacterIndex = state.list.findIndex(character => character.id === id);
      if (existingCharacterIndex > -1) {
        state.list.splice(existingCharacterIndex, 1);
      }
    }
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

export const { characterAdded, characterUpdated, characterRemoved } = genshinCharactersSlice.actions;

export const selectCharacters = (state: RootState) => state.genshinCharacters.list;
export const selectCharacterList = createSelector([selectCharacters], (list) => {
  const tempList = [...list];
  return tempList.sort((a: Character, b: Character) => a.name.localeCompare(b.name));
});

export const getCharactersListLength = (state: RootState) => state.genshinCharacters.list.length;

const selectCharacterId = (state: RootState, id: string) => id
export const selectCharacterById = createSelector([selectCharacters, selectCharacterId], (list, id) => list.find((character: Character) => character.id === id));

export default genshinCharactersSlice.reducer;
