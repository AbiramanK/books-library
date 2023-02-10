import React, { useState, useEffect } from "react";
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

export interface SubjectItemInterface {
  name: string;
  count: number;
  url: string;
}

interface ILeftPanelProps {
  trendingSubjects: SubjectItemInterface[] | undefined;
  subjects: SubjectItemInterface[] | undefined;
}

export const LeftPanel = (props: ILeftPanelProps) => {
  const [subjects, setSubjects] = useState<SubjectItemInterface[]>();

  useEffect(() => {
    setSubjects(props?.trendingSubjects);
  }, [props?.trendingSubjects]);

  const filter = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const key = event?.target?.value!?.trim()?.toLocaleLowerCase();
    if (key !== "") {
      const results = props?.subjects?.filter((subject) => {
        return subject?.name?.toLocaleLowerCase().includes(key);
      });

      setSubjects(results);
    } else {
      setSubjects(props?.trendingSubjects);
    }
  };

  return (
    <React.Fragment>
      <Container
        sx={{
          marginTop: 2,
          maxHeight: "100vh",
          overflowY: subjects && subjects?.length > 5 ? "scroll" : "hidden",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography sx={{ fontWeight: "bold" }}>
              Trending Subjects
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label={"Search Subjects"}
              size={"small"}
              onChange={filter}
            />
          </Grid>
          <Grid item xs={12}>
            <List>
              {subjects?.map((subject, index) => {
                return (
                  <ListItem key={index} disablePadding>
                    <ListItemButton>
                      <ListItemText primary={`${subject?.name}`} />
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
