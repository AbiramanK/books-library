import React, { useState } from "react";
import { Search } from "@mui/icons-material";
import {
  colors,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  TextField,
  Select,
  SelectChangeEvent,
  Button,
  Grid,
} from "@mui/material";
import { useSnackbar } from "notistack";

type SearchByType = "q" | "title" | "author";
interface ITopPanelProps {
  searchBooks: Function;
  handleSearchByChange: (searchBy: SearchByType) => void;
  resetSearch: () => void;
}

export const TopPanel = (props: ITopPanelProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const [searchText, setSearchText] = useState("");
  const [searchBy, setSearchBy] = useState<SearchByType>("q");

  const searchBooks = () => {
    if (searchText?.trim() !== "") {
      props?.searchBooks(searchText);
    } else {
      enqueueSnackbar("Please enter search text!", {
        variant: "info",
      });
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    setSearchBy(event.target.value as SearchByType);
    props?.handleSearchByChange(event.target.value as SearchByType);
  };

  const resetSearch = () => {
    setSearchText("");
    setSearchBy("q");
    props?.resetSearch();
  };

  return (
    <React.Fragment>
      <Container
        sx={{
          height: 70,
          marginTop: 2,
          borderBottomStyle: "solid",
          borderBottomWidth: 1,
          borderBottomColor: colors.grey,
        }}
      >
        <Grid container alignItems={"center"}>
          <FormControl sx={{ width: 100 }}>
            <InputLabel id="search-by-select-label">Search By</InputLabel>
            <Select
              labelId="search-by-select-label"
              id="search-by-select"
              value={searchBy}
              label="SearchBy"
              onChange={handleChange}
              size={"small"}
            >
              <MenuItem value={"q"}>All</MenuItem>
              <MenuItem value={"title"}>Title</MenuItem>
              <MenuItem value={"author"}>Author</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label={"Search Book by Title or By Author"}
            size={"small"}
            sx={{ width: 320 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      searchBooks();
                    }}
                  >
                    <Search />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            value={searchText}
            onChange={(event) => setSearchText(event?.target?.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();

                searchBooks();
              }
            }}
          />
          <Button
            variant="outlined"
            color="error"
            sx={{ marginLeft: 2 }}
            onClick={resetSearch}
          >
            Reset
          </Button>
        </Grid>
      </Container>
    </React.Fragment>
  );
};
