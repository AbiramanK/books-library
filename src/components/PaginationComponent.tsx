import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { Button, Container, Typography } from "@mui/material";
import React from "react";

interface IPaginationComponentProps {
  previousButtonDisabled: boolean;
  nextButtonDisabled: boolean;
  previousPage: Function;
  nextPage: Function;
  startPage: number;
  endPage: number;
  totalPage: number;
}

export const PaginationComponent = (props: IPaginationComponentProps) => {
  return (
    <React.Fragment>
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          marginTop: 2,
          marginBottom: 2,
        }}
      >
        <Button
          variant="outlined"
          startIcon={<ArrowLeft fontSize="large" />}
          sx={{ marginRight: 2 }}
          disabled={props?.previousButtonDisabled}
          onClick={() => props?.previousPage()}
        >
          Previous
        </Button>
        {(!props?.nextButtonDisabled || !props?.previousButtonDisabled) && (
          <Typography variant="body2">{`${props?.startPage} - ${props?.endPage} of ${props?.totalPage}`}</Typography>
        )}
        <Button
          variant="outlined"
          endIcon={<ArrowRight fontSize="large" />}
          sx={{ marginLeft: 2 }}
          disabled={props?.nextButtonDisabled}
          onClick={() => props?.nextPage()}
        >
          Next
        </Button>
      </Container>
    </React.Fragment>
  );
};
