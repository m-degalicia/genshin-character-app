import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from "app/hooks";
import {
  fetchCharactersList,
} from "redux/genshinCharacters/genshinCharactersSlice";

const useFetchCharactersList = () => {
  const characterListStatus = useAppSelector(
    (state) => state.genshinCharacters.status
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (characterListStatus === "idle") {
      dispatch(fetchCharactersList());
    }
  }, [characterListStatus, dispatch]);
};

export default useFetchCharactersList;
