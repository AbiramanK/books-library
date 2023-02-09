"use client";
import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useSnackbar } from "notistack";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import axios from "axios";
import { PaginationComponent, SearchResult, TopPanel } from "@/components";
import {
  OPEN_LIBRARY_API,
  OPEN_LIBRARY_FIELDS,
  OPEN_LIBRARY_LIMIT,
} from "@/configs";

const trendingSubjects = [
  "Javascript",
  "Harry Potter",
  "Indian History",
  "Crypto Currency",
  "Criminal Law",
];

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

const rows: any[] = [];

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

  const [searchResult, setSearchResult] = useState<SearchResultInterface>();
  const [searchResultDocs, setSearchResultDocs] =
    useState<SearchResultDocsTableInterface[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");
  const [lastPage, setLastPage] = useState<boolean>(false);

  useEffect(() => {
    const totalPages =
      (page - 1) * parseInt(OPEN_LIBRARY_LIMIT!) + searchResultDocs?.length!;
    if (totalPages === searchResult?.numFound!) {
      setLastPage(true);
    } else {
      if (lastPage) {
        setLastPage(false);
      }
    }
  }, [searchResultDocs]);

  const searchBooks = async (search: string, currentPage?: number) => {
    setSearchText(search);
    try {
      if (!currentPage && page != 1) {
        setPage(1);
        currentPage = 1;
      }

      setLoading(true);
      const {
        data,
        status,
        statusText,
      }: { data: SearchResultInterface; status: number; statusText: string } =
        await axios.get(`${OPEN_LIBRARY_API}/search.json`, {
          params: {
            q: search,
            limit: OPEN_LIBRARY_LIMIT,
            page: currentPage ?? page,
            fields: OPEN_LIBRARY_FIELDS,
          },
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
      console.error("Search Books requeest: ", error?.message);
      enqueueSnackbar(error?.message, { variant: "error" });
    }
  };

  const nextPage = () => {
    const total: number = searchResult?.numFound!;

    if (page * parseInt(OPEN_LIBRARY_LIMIT!) < total) {
      const nextPage = page + 1;
      setPage(nextPage);
      searchBooks(searchText, nextPage);
    }
  };

  const previousPage = () => {
    if (page > 1) {
      const previousPage: number = page - 1;
      setPage(previousPage);
      searchBooks(searchText, previousPage);
    }
  };

  return (
    <React.Fragment>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <TopPanel searchBooks={searchBooks} />
        </Grid>
        <Grid item xs={12}>
          <SearchResult
            columns={columns}
            rows={searchResultDocs ?? []}
            disableSelectionOnClick={true}
            newEditingApi={true}
            pageSize={10}
            rowsPerPageOptions={[10]}
            tableHeight={380}
            loading={loading}
          />
          <PaginationComponent
            startPage={searchResult?.start!}
            endPage={searchResult?.start! + searchResult?.docs?.length!}
            totalPage={searchResult?.numFound!}
            nextPage={nextPage}
            previousPage={previousPage}
            nextButtonDisabled={lastPage || !searchResult}
            previousButtonDisabled={page == 1}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
