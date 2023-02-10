import { GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { PaginationComponent } from "./PaginationComponent";
import { SearchResult } from "./SearchResult";

interface ISearchResultDataGridProps {
  searchKey: string;
  search: (search: string, currentPage?: number) => Promise<void>;
  searchResultData: any[] | undefined;
  loading: boolean;
  startPage: number;
  endPage: number;
  totalPage: number;
  columns: GridColDef[];
  searchResultLimit: number;
}

export const SearchResultDataGrid = (props: ISearchResultDataGridProps) => {
  const [page, setPage] = useState<number>(1);

  const [lastPage, setLastPage] = useState<boolean>(false);

  useEffect(() => {
    const totalPages =
      (page - 1) * props?.searchResultLimit + props?.searchResultData?.length!;
    if (totalPages === props?.totalPage!) {
      setLastPage(true);
    } else {
      if (lastPage) {
        setLastPage(false);
      }
    }
  }, [props?.searchResultData]);

  const nextPage = () => {
    const total: number = props?.totalPage!;

    if (page * props?.searchResultLimit < total) {
      const nextPage = page + 1;
      setPage(nextPage);
      props?.search(props?.searchKey ?? "", nextPage);
    }
  };

  const previousPage = () => {
    if (page > 1) {
      const previousPage: number = page - 1;
      setPage(previousPage);
      props?.search(props?.searchKey ?? "", previousPage);
    }
  };

  return (
    <React.Fragment>
      <SearchResult
        columns={props?.columns}
        rows={props?.searchResultData ?? []}
        disableSelectionOnClick={true}
        newEditingApi={true}
        pageSize={10}
        rowsPerPageOptions={[10]}
        tableHeight={380}
        loading={props?.loading}
      />
      <PaginationComponent
        startPage={props?.startPage}
        endPage={props?.endPage}
        totalPage={props?.totalPage}
        nextPage={nextPage}
        previousPage={previousPage}
        nextButtonDisabled={lastPage || !props?.searchResultData}
        previousButtonDisabled={page == 1}
      />
    </React.Fragment>
  );
};
