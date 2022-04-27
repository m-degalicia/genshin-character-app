import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "app/hooks";
import Button from "@mui/material/Button";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import {
  selectCharacters,
  fetchCharactersList,
} from "redux/genshinCharacters/genshinCharactersSlice";

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
        <Button variant="contained" color="primary" size="small">
          {`Edit ${params.value}`}
        </Button>
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
  const characterList = useAppSelector(selectCharacters);
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
    <div style={{ display: "flex", height: "100%", width: "100%" }}>
      <div style={{ flexGrow: 1 }}>
        <DataGrid
          autoHeight
          rows={characterList}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          components={{ Toolbar: GridToolbar }}
        />
      </div>
    </div>
  );
};

export default TablePage;
