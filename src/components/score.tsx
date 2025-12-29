import React from "react";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import type { IDataSource, IStore } from "../types";

interface ScoreProps {
  dataSource: IDataSource[];
}

function Score({ dataSource }: ScoreProps) {
  const score = useSelector((state: IStore) => state.question.score);

  return (
    <Typography sx={{ position: "absolute", top: 68, left: 60, fontWeight: 500, fontSize: 45 }}>
      {score}/{dataSource.length}
    </Typography>
  );
}

export default Score;
