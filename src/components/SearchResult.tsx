import React from "react";
import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface ISearchResultProps {
  rows: Array<any>;
  columns: GridColDef[];
  pageSize: number;
  rowsPerPageOptions: Array<number>;
  disableSelectionOnClick: boolean;
  newEditingApi: boolean;
  tableHeight: number;
  loading: boolean;
}

export const SearchResult = (props: ISearchResultProps) => {
  return (
    <React.Fragment>
      <Box sx={{ height: props?.tableHeight, width: "100%" }}>
        <DataGrid
          rows={props?.rows}
          columns={props?.columns}
          pageSize={props?.pageSize}
          rowsPerPageOptions={props?.rowsPerPageOptions}
          disableSelectionOnClick={props?.disableSelectionOnClick}
          experimentalFeatures={{ newEditingApi: props?.newEditingApi }}
          paginationMode={"client"}
          loading={props?.loading}
        />
      </Box>
    </React.Fragment>
  );
};
