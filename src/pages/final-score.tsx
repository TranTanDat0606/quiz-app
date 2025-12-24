import React from "react";
import { Box, Container, TextField, Typography } from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

const FinalScore = () => {
  return (
    <Container maxWidth="xl" className="px-15! py-5!">
      <Box>
        <Typography variant="h3" align="center" marginBottom={4} fontWeight={500}>
          Final Score
        </Typography>

        <Gauge
          value={100}
          startAngle={-100}
          endAngle={100}
          sx={(theme) => ({
            [`& .${gaugeClasses.valueText}`]: {
              fontSize: 25,
              fontWeight: 700,
              transform: "translateY(-15px)",
            },
            [`& .${gaugeClasses.valueText} tspan`]: {
              fill: "green",
            },
            [`& .${gaugeClasses.valueArc}`]: {
              fill: "#52b202",
            },
            [`& .${gaugeClasses.referenceArc}`]: {
              fill: theme.palette.text.disabled,
            },
          })}
          text={({ value, valueMax }) => `${value} / ${valueMax}`}
        />

        <div className="h-[40vh] flex items-center justify-center">
          <Box sx={{ display: "flex", flexDirection: "column", width: 500, gap: 3 }}>
            <TextField id="first-name" label="First Name: " multiline maxRows={4} variant="standard" fullWidth />
            <TextField id="last-name" label="Last Name: " multiline maxRows={4} variant="standard" fullWidth />
            <TextField id="email" label="Email: " multiline maxRows={4} variant="standard" fullWidth />
          </Box>
        </div>
      </Box>
    </Container>
  );
};

export default FinalScore;
