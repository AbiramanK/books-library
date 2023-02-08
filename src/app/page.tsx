"use client";

import { Grid, Container, colors, Button } from "@mui/material";

import styles from "./page.module.css";
import { LeftPanel, SearchResult, TopPanel } from "@components/index";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { GridColDef } from "@mui/x-data-grid";

const trendingSubjects = [
  "Javascript",
  "Harry Potter",
  "Indian History",
  "Crypto Currency",
  "Criminal Law",
];

const columns: GridColDef[] = [
  { field: "title", headerName: "Title and Sub Title", width: 250 },
  { field: "author", headerName: "Author", width: 150 },
  { field: "lastPublishYear", headerName: "Last Publish Year", width: 150 },
  { field: "firstPublishYear", headerName: "First Publish Year", width: 150 },
];

const rows = [
  {
    id: 1,
    title: "Javascript The Definitive Guide",
    author: "David Flanagan",
    lastPublishYear: "2020",
    firstPublishYear: "1996",
  },
  {
    id: 2,
    title: "Javascript The Definitive Guide",
    author: "David Flanagan",
    lastPublishYear: "2020",
    firstPublishYear: "1996",
  },
  {
    id: 3,
    title: "Javascript The Definitive Guide",
    author: "David Flanagan",
    lastPublishYear: "2020",
    firstPublishYear: "1996",
  },
  {
    id: 4,
    title: "Javascript The Definitive Guide",
    author: "David Flanagan",
    lastPublishYear: "2020",
    firstPublishYear: "1996",
  },
  {
    id: 5,
    title: "Javascript The Definitive Guide",
    author: "David Flanagan",
    lastPublishYear: "2020",
    firstPublishYear: "1996",
  },
  {
    id: 6,
    title: "Javascript The Definitive Guide",
    author: "David Flanagan",
    lastPublishYear: "2020",
    firstPublishYear: "1996",
  },
  {
    id: 7,
    title: "Javascript The Definitive Guide",
    author: "David Flanagan",
    lastPublishYear: "2020",
    firstPublishYear: "1996",
  },
  {
    id: 8,
    title: "Javascript The Definitive Guide",
    author: "David Flanagan",
    lastPublishYear: "2020",
    firstPublishYear: "1996",
  },
  {
    id: 9,
    title: "Javascript The Definitive Guide",
    author: "David Flanagan",
    lastPublishYear: "2020",
    firstPublishYear: "1996",
  },
  {
    id: 10,
    title: "Javascript The Definitive Guide",
    author: "David Flanagan",
    lastPublishYear: "2020",
    firstPublishYear: "1996",
  },
];

export default function Home() {
  return (
    <main className={styles.main}>
      <Grid container spacing={0}>
        <Grid
          item
          xs={2}
          sx={{
            height: "100vh",
            borderRightStyle: "solid",
            borderRightWidth: 1,
            borderRightColor: colors.grey,
          }}
        >
          <LeftPanel trendingSubjects={trendingSubjects} />
        </Grid>
        <Grid item xs={10}>
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <TopPanel />
            </Grid>
            <Grid item xs={12}>
              <SearchResult
                rows={rows}
                columns={columns}
                disableSelectionOnClick={true}
                newEditingApi={true}
                pageSize={10}
                rowsPerPageOptions={[10]}
                tableHeight={380}
              />
              <Container
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  marginTop: 2,
                  marginBottom: 2,
                }}
              >
                <Button
                  variant="outlined"
                  startIcon={<ArrowLeft fontSize="large" />}
                >
                  Previous
                </Button>
                <Button
                  variant="outlined"
                  endIcon={<ArrowRight fontSize="large" />}
                  sx={{ marginLeft: 3 }}
                >
                  Next
                </Button>
              </Container>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </main>
  );
}
