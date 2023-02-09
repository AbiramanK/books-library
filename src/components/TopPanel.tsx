import React, { useState } from "react";
import { Search } from "@mui/icons-material";
import {
  colors,
  Container,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useSnackbar } from "notistack";

interface ITopPanelProps {
  searchBooks: Function;
}

export const TopPanel = (props: ITopPanelProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const [searchText, setSearchText] = useState("");

  const searchBooks = () => {
    if (searchText?.trim() !== "") {
      props?.searchBooks(searchText);
    } else {
      enqueueSnackbar("Please enter search text!", {
        variant: "info",
      });
    }
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
        />
      </Container>
    </React.Fragment>
  );
};
