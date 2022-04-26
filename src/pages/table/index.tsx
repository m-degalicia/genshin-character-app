import React from "react";
import { useAppSelector } from "app/hooks";
import { selectCharacters } from "redux/genshinCharacters/genshinCharactersSlice";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "name", headerName: "Name" },
  { field: "vision", headerName: "Vision" },
  { field: "weapon", headerName: "Weapon" },
  { field: "nation", headerName: "Nation" },
  { field: "affiliation", headerName: "Affiliation", width: 200 },
  { field: "rarity", headerName: "Rarity" },
];

const TablePage = () => {
  const characterList = useAppSelector(selectCharacters);
  return (
    <div style={{ display: "flex", height: "100%", width: "100%" }}>
      <div style={{ flexGrow: 1 }}>
        <DataGrid autoHeight rows={characterList} columns={columns} />
      </div>
    </div>
  );
};

export default TablePage;
