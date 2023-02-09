"use client";
import { LeftPanel } from "@/components";
import { colors, Grid } from "@mui/material";
import { SnackbarProvider } from "notistack";

import "./globals.css";

const trendingSubjects = [
  "Javascript",
  "Harry Potter",
  "Indian History",
  "Crypto Currency",
  "Criminal Law",
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <SnackbarProvider maxSnack={3}>
          <main style={{ minHeight: "100vh" }}>
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
                {children}
              </Grid>
            </Grid>
          </main>
        </SnackbarProvider>
      </body>
    </html>
  );
}
