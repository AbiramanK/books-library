"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { colors, Container, Grid, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import axios from "axios";

import { SearchResultDataGrid } from "@/components";
import { OPEN_LIBRARY_API, OPEN_LIBRARY_LIMIT } from "@/configs";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

const limit = parseInt(OPEN_LIBRARY_LIMIT!);
const columns: GridColDef[] = [
  {
    field: "title",
    headerName: "Title and Sub Title",
    width: 350,
    valueGetter: (params: GridValueGetterParams) =>
      `${params?.row?.title ?? "-"}`,
  },
  {
    field: "authors",
    headerName: "Author",
    width: 250,
    valueGetter: (params: GridValueGetterParams) =>
      `${params?.row?.authors?.[0]?.name! ?? "-"}`,
  },
  {
    field: "first_publish_year",
    headerName: "First Publish Year",
    width: 200,
    valueGetter: (params: GridValueGetterParams) =>
      `${params?.row?.first_publish_year ?? "-"}`,
  },
];

export interface SearchResultDataInterface {
  title: string;
  first_publish_year: number;
  author_name: Array<string>;
}

export interface SearchResultDataAPIInterface
  extends SearchResultDataInterface {
  key: string;
}

export interface SearchResultDataTableInterface
  extends SearchResultDataInterface {
  id: string;
}

export interface SearchResultInterface {
  key: string;
  name: string;
  subject_type: string;
  work_count: number;
  works: SearchResultDataAPIInterface[];
}

export default function Subject() {
  const pathName = usePathname();

  const subject: string = pathName!?.split("/")?.[1]!;

  const { enqueueSnackbar } = useSnackbar();

  const [searchText, setSearchText] = useState<string>("");
  const [searchResult, setSearchResult] = useState<SearchResultInterface>();
  const [searchResultData, setSearchResultData] =
    useState<SearchResultDataTableInterface[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [offset, setOffset] = useState<number>(0);

  useEffect(() => {
    searchBooks(subject);
  }, []);

  const searchBooks = async (search: string, currentPage?: number) => {
    setSearchText(search);

    try {
      if (!currentPage) {
        setPage(1);
        setOffset(0);
        currentPage = 1;
      } else {
        setPage(currentPage);
        setOffset((currentPage - 1) * limit);
      }

      setLoading(true);

      const {
        data,
        status,
      }: { data: SearchResultInterface; status: number; statusText: string } =
        await axios.get(`${OPEN_LIBRARY_API}/subjects/${subject}.json`, {
          params: {
            limit: OPEN_LIBRARY_LIMIT,
            offset: currentPage ? (currentPage - 1) * limit : 0,
          },
        });

      setLoading(false);
      if (status === 200) {
        setSearchResult(data);
        const works: SearchResultDataTableInterface[] = data?.works?.map(
          ({ key: id, ...rest }) => {
            return {
              id,
              ...rest,
            };
          }
        );

        setSearchResultData(works);
      } else {
        enqueueSnackbar("Something went wrong", { variant: "error" });
      }
    } catch (error: any) {
      setLoading(false);
      console.error("Search Subject request: ", error?.message);
      enqueueSnackbar(error?.message, { variant: "error" });
    }
  };

  return (
    <React.Fragment>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Container
            sx={{
              height: 70,
              marginTop: 2,
              borderBottomStyle: "solid",
              borderBottomWidth: 1,
              borderBottomColor: colors.grey,
            }}
          >
            <Typography variant="h4">{subject}</Typography>
          </Container>
        </Grid>
        <Grid item xs={12}>
          <SearchResultDataGrid
            searchKey={searchText}
            search={searchBooks}
            searchResultData={searchResultData}
            loading={loading}
            startPage={(page - 1) * limit}
            endPage={(page - 1) * limit + searchResult?.works?.length!}
            totalPage={searchResult?.work_count!}
            columns={columns}
            searchResultLimit={limit}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
