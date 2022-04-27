import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { useAppSelector, useAppDispatch } from "app/hooks";
import {
  selectCharacterById,
  characterAdded,
  characterUpdated,
} from "redux/genshinCharacters/genshinCharactersSlice";
import {
  ElementsList,
  NationsList,
  RarityList,
  WeaponsList,
} from "constants/index";
import routes from "routes/routes";
import { Element, Nation, Rarity, Weapon } from "types/Attributes";

import useFetchCharactersList from "utils/useFetchCharactersList";

const TableForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  useFetchCharactersList();
  const isEdit = typeof id !== "undefined";
  const characterListStatus = useAppSelector(
    (state) => state.genshinCharacters.status
  );
  const isInit =
    characterListStatus === "idle" || characterListStatus === "loading";
  const characterSelect = useAppSelector((state) =>
    selectCharacterById(state, id ?? "0")
  );
  const [name, setName] = useState("");
  const [affiliation, setaffiliation] = useState("");
  const [vision, setVision] = useState("");
  const [weapon, setWeapon] = useState("");
  const [nation, setNation] = useState("");
  const [rarity, setRarity] = useState(4);

  useEffect(() => {
    if (typeof characterSelect !== "undefined") {
      setName(characterSelect.name);
      setNation(characterSelect.nation);
      setRarity(characterSelect.rarity);
      setVision(characterSelect.vision);
      setWeapon(characterSelect.weapon);
      setaffiliation(characterSelect.affiliation);
    }
  }, [characterSelect]);

  useEffect(() => {
    if (
      !(characterListStatus === "idle" || characterListStatus === "loading") &&
      typeof id !== "undefined" &&
      typeof characterSelect === "undefined"
    ) {
      navigate(routes.error404());
    }
  }, [characterListStatus, id, characterSelect, navigate]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      id,
      name,
      vision,
      affiliation,
      nation,
      weapon,
      rarity,
    };

    if (isEdit) {
      dispatch(characterUpdated({ ...data }));
      navigate(routes.table());
    } else {
      dispatch(characterAdded({ ...data, id: nanoid() }));
      navigate(routes.table());
    }
  };

  if (isEdit && isInit) {
    return <div />;
  }

  if (isEdit && characterListStatus === "failed") {
    return <div>Error fetching data</div>;
  }

  return (
    <Container maxWidth="xs">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 1 }}>
          {`${isEdit ? "Edit" : "Create"} Character`}
        </Typography>
        <form style={{ width: "100%" }} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <TextField
                  autoComplete="name"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="affiliation"
                label="Affiliation"
                value={affiliation}
                onChange={(e) => setaffiliation(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Vision</InputLabel>
                <Select
                  id="vision"
                  value={vision}
                  label="Vision"
                  onChange={(e) => setVision(e.target.value)}
                  sx={{ textAlign: "start" }}
                >
                  {ElementsList.map((element: Element) => (
                    <MenuItem value={element} key={element}>
                      {element}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Required</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Weapon</InputLabel>
                <Select
                  id="weapon"
                  value={weapon}
                  label="Weapon"
                  onChange={(e) => setWeapon(e.target.value)}
                  sx={{ textAlign: "start" }}
                >
                  {WeaponsList.map((weapon: Weapon) => (
                    <MenuItem value={weapon} key={weapon}>
                      {weapon}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Required</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Nation</InputLabel>
                <Select
                  id="nation"
                  value={nation}
                  label="Nation"
                  onChange={(e) => setNation(e.target.value)}
                  sx={{ textAlign: "start" }}
                >
                  {NationsList.map((nation: Nation) => (
                    <MenuItem value={nation} key={nation}>
                      {nation}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Required</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Rarity</InputLabel>
                <Select
                  id="rarity"
                  value={rarity}
                  label="Rarity"
                  onChange={(e) => setRarity(e.target.value as number)}
                  sx={{ textAlign: "start" }}
                >
                  {RarityList.map((rating: Rarity) => (
                    <MenuItem value={rating} key={rating}>
                      {rating}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Required</FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ flex: 1 }}
            >
              {isEdit ? "Edit" : "Create"}
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => navigate(-1)}
              sx={{ flex: 1 }}
            >
              Cancel
            </Button>
          </Stack>
        </form>
      </div>
    </Container>
  );
};

export default TableForm;
