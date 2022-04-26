import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "app/hooks";
import {
  selectCharacters,
  fetchCharactersList,
} from "redux/genshinCharacters/genshinCharactersSlice";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", width: 150 },
  { field: "vision", headerName: "Vision" },
  { field: "weapon", headerName: "Weapon" },
  { field: "nation", headerName: "Nation" },
  { field: "affiliation", headerName: "Affiliation", width: 200 },
  { field: "rarity", headerName: "Rarity" },
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
