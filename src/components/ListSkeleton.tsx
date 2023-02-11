import { List, ListItem, Skeleton } from "@mui/material";
import React from "react";

interface IListSkeletonProps {
  length: number;
}

export const ListSkeleton = (props: IListSkeletonProps) => {
  return (
    <React.Fragment>
      <List>
        {[...Array(props?.length!)]!?.map((item, index: number) => {
          return (
            <ListItem key={index}>
              <Skeleton variant="rectangular" width={200} height={40} />
            </ListItem>
          );
        })}
      </List>
    </React.Fragment>
  );
};
