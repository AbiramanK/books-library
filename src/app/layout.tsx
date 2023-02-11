"use client";
import React, { useEffect, useState } from "react";
import { colors, Grid, LinearProgress } from "@mui/material";
import axios from "axios";
import { SnackbarProvider } from "notistack";
import dynamic from "next/dynamic";

import { OPEN_LIBRARY_API } from "@/configs";
import "./globals.css";

const LeftPanel = dynamic(
  () =>
    import("./../components/LeftPanel").then(
      (component) => component?.LeftPanel
    ),
  {
    loading: () => <LinearProgress />,
  }
);

export interface SubjectItemInterface {
  name: string;
  count: number;
  url: string;
}

export interface SubjectLinksInterface {
  self: string;
  list: string;
}

export interface SubjectListInterface {
  subjects: SubjectItemInterface[];
  places: SubjectItemInterface[];
  people: SubjectItemInterface[];
  times: SubjectItemInterface[];
  links: SubjectLinksInterface;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [subjects, setSubjects] = useState<SubjectItemInterface[]>();
  const [trendingSubjects, setTrendingSubjects] =
    useState<SubjectItemInterface[]>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getSubjects();
  }, []);

  const getSubjects = async () => {
    try {
      setLoading(true);
      const { data, status }: { data: SubjectListInterface; status: number } =
        await axios.get(
          `${OPEN_LIBRARY_API}/people/george08/lists/OL97L/subjects.json`
        );

      setLoading(false);
      if (status === 200) {
        setSubjects(data?.subjects);
        filterTrendingSubjects(data?.subjects);
      } else {
        alert("Something went wrong");
      }
    } catch (error: any) {
      setLoading(false);
      console.error(error?.message);
      alert(error?.message);
    }
  };

  const filterTrendingSubjects = (subjects: SubjectItemInterface[]) => {
    const trending: SubjectItemInterface[] = subjects?.sort((a, b) =>
      a.count < b.count ? 1 : b.count < a.count ? -1 : 0
    );

    setTrendingSubjects(trending?.slice(0, 5));
  };

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
                <LeftPanel
                  trendingSubjects={trendingSubjects}
                  subjects={subjects}
                  loading={loading}
                />
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
