import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
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

type FormInputs = {
  name: string;
  affiliation: string;
  vision: string;
  nation: string;
  weapon: string;
  rarity: number;
};

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
  const { handleSubmit, control, reset } = useForm<FormInputs>();

  useEffect(() => {
    if (typeof characterSelect !== "undefined") {
      reset({
        name: characterSelect.name,
        nation: characterSelect.nation,
        rarity: characterSelect.rarity,
        vision: characterSelect.vision,
        weapon: characterSelect.weapon,
        affiliation: characterSelect.affiliation,
      });
    }
  }, [characterSelect, reset]);

  useEffect(() => {
    if (
      !(characterListStatus === "idle" || characterListStatus === "loading") &&
      typeof id !== "undefined" &&
      typeof characterSelect === "undefined"
    ) {
      navigate(routes.error404());
    }
  }, [characterListStatus, id, characterSelect, navigate]);

  const _handleSubmit: SubmitHandler<FormInputs> = (data) => {
    if (isEdit) {
      dispatch(characterUpdated({ ...data, id }));
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
        <form
          style={{ width: "100%" }}
          onSubmit={handleSubmit(_handleSubmit)}
          noValidate
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Name required" }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      autoComplete="name"
                      variant="outlined"
                      fullWidth
                      required
                      label="Name"
                      value={value}
                      onChange={onChange}
                      autoFocus
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="affiliation"
                control={control}
                defaultValue=""
                rules={{ required: "Affiliation required" }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    autoComplete="affiliation"
                    variant="outlined"
                    fullWidth
                    required
                    label="Affiliation"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                control={control}
                name="vision"
                defaultValue=""
                rules={{ required: "Element Vision required" }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <FormControl fullWidth required error={!!error}>
                    <InputLabel>Vision</InputLabel>
                    <Select
                      value={value}
                      label="Vision"
                      onChange={onChange}
                      sx={{ textAlign: "start" }}
                    >
                      {ElementsList.map((element: Element) => (
                        <MenuItem value={element} key={element}>
                          {element}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>
                      {error ? error.message : "Required"}
                    </FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                control={control}
                name="weapon"
                defaultValue=""
                rules={{ required: "Weapon type required" }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <FormControl fullWidth required error={!!error}>
                    <InputLabel>Weapon</InputLabel>
                    <Select
                      value={value}
                      label="Weapon"
                      onChange={onChange}
                      sx={{ textAlign: "start" }}
                    >
                      {WeaponsList.map((weapon: Weapon) => (
                        <MenuItem value={weapon} key={weapon}>
                          {weapon}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>
                      {error ? error.message : "Required"}
                    </FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                control={control}
                name="nation"
                defaultValue=""
                rules={{ required: "Nation required" }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <FormControl fullWidth required error={!!error}>
                    <InputLabel>Nation</InputLabel>
                    <Select
                      value={value}
                      label="Nation"
                      onChange={onChange}
                      sx={{ textAlign: "start" }}
                    >
                      {NationsList.map((nation: Nation) => (
                        <MenuItem value={nation} key={nation}>
                          {nation}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>
                      {error ? error.message : "Required"}
                    </FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                control={control}
                name="rarity"
                defaultValue={4}
                rules={{ required: "Rarity required" }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <FormControl fullWidth required error={!!error}>
                    <InputLabel>Rarity</InputLabel>
                    <Select
                      value={value}
                      label="Rarity"
                      onChange={onChange}
                      sx={{ textAlign: "start" }}
                    >
                      {RarityList.map((rating: Rarity) => (
                        <MenuItem value={rating} key={rating}>
                          {rating}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>
                      {error ? error.message : "Required"}
                    </FormHelperText>
                  </FormControl>
                )}
              />
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
