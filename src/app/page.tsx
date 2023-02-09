"use client";
import React, { useState } from "react";
import { Grid } from "@mui/material";
import { SearchResultDataGrid, TopPanel } from "@/components";

export default function Home() {
  const [searchText, setSearchText] = useState<string>("");

  const searchBooks = async (search: string) => {
    setSearchText(search);
  };

  return (
    <React.Fragment>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <TopPanel searchBooks={searchBooks} />
        </Grid>
        <Grid item xs={12}>
          <SearchResultDataGrid search={searchText} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
