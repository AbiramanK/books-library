"use client";
import React, { useState } from "react";
import { Grid } from "@mui/material";
import { useSnackbar } from "notistack";
import axios from "axios";

import { SearchResultDataGrid, TopPanel } from "@/components";
import {
  OPEN_LIBRARY_API,
  OPEN_LIBRARY_FIELDS,
  OPEN_LIBRARY_LIMIT,
} from "@/configs";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

type SearchByType = "q" | "title" | "author";

const columns: GridColDef[] = [
  {
    field: "title",
    headerName: "Title and Sub Title",
    width: 250,
    valueGetter: (params: GridValueGetterParams) =>
      `${params?.row?.title ?? "-"}`,
  },
  {
    field: "author_name",
    headerName: "Author",
    width: 150,
    valueGetter: (params: GridValueGetterParams) =>
      `${params?.row?.author_name?.[0] ?? "-"}`,
  },
  {
    field: "publish_year",
    headerName: "Last Publish Year",
    width: 150,
    valueGetter: (params: GridValueGetterParams) =>
      `${params?.row?.publish_year !== 0 ? params?.row?.publish_year : "-"}`,
  },
  {
    field: "first_publish_year",
    headerName: "First Publish Year",
    width: 150,
    valueGetter: (params: GridValueGetterParams) =>
      `${params?.row?.first_publish_year ?? "-"}`,
  },
];

export interface SearchResultDocsInterface {
  title: string;
  publish_year: Array<number>;
  first_publish_year: number;
  author_name: Array<string>;
}

export interface SearchResultDocsAPIInterface
  extends SearchResultDocsInterface {
  key: string;
}
export interface SearchResultDocsTableInterface
  extends Omit<SearchResultDocsInterface, "publish_year"> {
  id: string;
  publish_year: number;
}
export interface SearchResultInterface {
  numFound: number;
  start: number;
  numFoundExact: boolean;
  docs: SearchResultDocsAPIInterface[];
  num_found: number;
  q: string;
  offset: any;
}

export default function Home() {
  const { enqueueSnackbar } = useSnackbar();

  const [searchText, setSearchText] = useState<string>("");
  const [searchResult, setSearchResult] = useState<SearchResultInterface>();
  const [searchResultDocs, setSearchResultDocs] =
    useState<SearchResultDocsTableInterface[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [searchBy, setSearchBy] = useState<SearchByType>("q");

  const searchBooks = async (search: string, currentPage?: number) => {
    setSearchText(search);

    try {
      if (!currentPage && page != 1) {
        setPage(1);
        currentPage = 1;
      }

      setLoading(true);

      const defaultParams = {
        limit: OPEN_LIBRARY_LIMIT,
        page: currentPage ?? page,
        fields: OPEN_LIBRARY_FIELDS,
      };

      let params;

      switch (searchBy) {
        case "q":
          params = {
            ...defaultParams,
            q: search,
          };
          break;

        case "title":
          params = {
            ...defaultParams,
            title: search,
          };
          break;

        case "author":
          params = {
            ...defaultParams,
            author: search,
          };
          break;

        default:
          params = {
            ...defaultParams,
            q: search,
          };
          break;
      }

      const {
        data,
        status,
      }: { data: SearchResultInterface; status: number; statusText: string } =
        await axios.get(`${OPEN_LIBRARY_API}/search.json`, {
          params,
        });

      setLoading(false);
      if (status === 200) {
        setSearchResult(data);
        const docs: SearchResultDocsTableInterface[] = data?.docs?.map(
          ({ key: id, publish_year, ...rest }) => {
            const lastPublishYear = Math?.max(...(publish_year ?? [0]));
            return {
              id,
              publish_year: lastPublishYear,
              ...rest,
            };
          }
        );

        setSearchResultDocs(docs);
      } else {
        enqueueSnackbar("Something went wrong", { variant: "error" });
      }
    } catch (error: any) {
      setLoading(false);
      console.error("Search Books request: ", error?.message);
      enqueueSnackbar(error?.message, { variant: "error" });
    }
  };

  const handleSearchByChange = (searchBy: SearchByType) => {
    setSearchBy(searchBy);
  };

  const resetSearch = () => {
    setSearchText("");
    setSearchResult(undefined);
    setSearchResultDocs(undefined);
    setPage(1);
    setSearchBy("q");
  };

  return (
    <React.Fragment>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <TopPanel
            searchBooks={searchBooks}
            handleSearchByChange={handleSearchByChange}
            resetSearch={resetSearch}
          />
        </Grid>
        <Grid item xs={12}>
          <SearchResultDataGrid
            searchKey={searchText}
            search={searchBooks}
            searchResultData={searchResultDocs}
            loading={loading}
            startPage={searchResult?.start!}
            endPage={searchResult?.start! + searchResult?.docs?.length!}
            totalPage={searchResult?.numFound!}
            columns={columns}
            searchResultLimit={parseInt(OPEN_LIBRARY_LIMIT!)}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
