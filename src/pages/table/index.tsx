import React, { useEffect, useState } from "react";
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
import {
  selectCharacterList,
  fetchCharactersList,
} from "redux/genshinCharacters/genshinCharactersSlice";

const DataGridToolbar = () => (
  <GridToolbarContainer>
    <GridToolbarFilterButton />
  </GridToolbarContainer>
);

const getId = (params: GridValueGetterParams) => params.row.id;

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
    valueGetter: getId,
    renderCell: (params: GridValueGetterParams<any>) => (
      <>
        <Link
          to={`${routes.tableEdit()}${params.value}`}
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
        >
          Delete
        </Button>
      </>
    ),
  },
];

const TablePage = () => {
  const [pageSize, setPageSize] = useState<number>(5);
  const characterList = useAppSelector(selectCharacterList);
  const characterListStatus = useAppSelector(
    (state) => state.genshinCharacters.status
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (characterListStatus === "idle") {
      dispatch(fetchCharactersList());
    }
  }, [characterListStatus, dispatch]);

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
    </div>
  );
};

export default TablePage;
