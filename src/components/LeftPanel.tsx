import React from "react";
import {
  Container,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";

interface ILeftPanelProps {
  trendingSubjects: string[];
}

export const LeftPanel = (props: ILeftPanelProps) => {
  return (
    <React.Fragment>
      <Container sx={{ marginTop: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography sx={{ fontWeight: "bold" }}>
              Trending Subjects
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField label={"Search Subjects"} size={"small"} />
          </Grid>
          <Grid item xs={12}>
            <List>
              {props?.trendingSubjects?.map((subject, index) => {
                return (
                  <ListItem key={index} disablePadding>
                    <ListItemButton>
                      <ListItemText primary={`${subject}`} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};
