import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridValueGetterParams,
} from "@mui/x-data-grid";

import { useAppSelector, useAppDispatch } from "app/hooks";
import routes from "routes/routes";

import ConfirmDialog from "components/ConfirmDialog";

import {
  selectCharacterList,
  characterRemoved,
} from "redux/genshinCharacters/genshinCharactersSlice";

import useFetchCharactersList from "utils/useFetchCharactersList";

const DataGridToolbar = () => (
  <GridToolbarContainer>
    <GridToolbarFilterButton />
  </GridToolbarContainer>
);

const getActionInfo = (params: GridValueGetterParams) => {
  return { id: params.row.id, name: params.row.name };
};

const TablePage = () => {
  useFetchCharactersList();
  const characterList = useAppSelector(selectCharacterList);
  const characterListStatus = useAppSelector(
    (state) => state.genshinCharacters.status
  );
  const dispatch = useAppDispatch();
  const [pageSize, setPageSize] = useState<number>(5);
  const [open, setOpen] = useState(false);
  const [dialogName, setDialogName] = useState("");
  const [dialogId, setDialogId] = useState("");
  const isInit =
    characterListStatus === "idle" || characterListStatus === "loading";

  const handleDialogOpen = (name: string, id: string) => {
    setDialogName(name);
    setDialogId(id);
    setOpen(true);
  };

  const handleDelete = () => {
    dispatch(characterRemoved({ id: dialogId }));
    setDialogName("");
    setDialogId("");
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
    { field: "vision", headerName: "Vision" },
    { field: "weapon", headerName: "Weapon" },
    { field: "nation", headerName: "Nation" },
    { field: "affiliation", headerName: "Affiliation", width: 200 },
    { field: "rarity", headerName: "Rarity" },
    {
      field: "action",
      headerName: "Actions",
      width: 200,
      valueGetter: getActionInfo,
      renderCell: (params: GridValueGetterParams<any>) => (
        <>
          <Link
            to={`${routes.tableEdit()}${params.value.id}`}
            style={{ textDecoration: "none" }}
          >
            <Button variant="contained" color="primary" size="small">
              Edit
            </Button>
          </Link>
          <Button
            variant="contained"
            color="error"
            size="small"
            style={{ marginLeft: 16 }}
            onClick={() => handleDialogOpen(params.value.name, params.value.id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  if (isInit) {
    return <div>Loading...</div>;
  }

  if (characterListStatus === "failed") {
    return <div>Error fetching data</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        flexDirection: "column",
      }}
    >
      <Link
        to={routes.tableCreate()}
        style={{ textDecoration: "none", width: "100%", display: "flex" }}
      >
        <Button
          variant="contained"
          color="primary"
          size="medium"
          sx={{ mb: 2 }}
        >
          Create Character
        </Button>
      </Link>
      <div style={{ flexGrow: 1 }}>
        <DataGrid
          autoHeight
          rows={characterList}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          components={{ Toolbar: DataGridToolbar }}
          disableSelectionOnClick
        />
      </div>
      <ConfirmDialog
        open={open}
        setOpen={setOpen}
        name={dialogName}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default TablePage;
