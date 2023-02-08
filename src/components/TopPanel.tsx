import React from "react";
import { Search } from "@mui/icons-material";
import {
  colors,
  Container,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";

interface ITopPanelProps {}

export const TopPanel = (props: ITopPanelProps) => {
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
                <IconButton>
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Container>
    </React.Fragment>
  );
};
