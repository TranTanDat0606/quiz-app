import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

// get API category: https://opentdb.com/api_category.php
// get question API: https://opentdb.com/api.php?amount=2&category=13&difficulty=medium&type=multiple

function Dashboard() {
  return (
    <>
      <Container maxWidth="xl">
        <Box
          sx={{
            bgcolor: "#fff",
            height: "77vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "30px",
            borderRadius: "15px",
          }}
        >
          <Typography variant="h5" marginTop={"50px"} marginBottom={"15px"} fontWeight={800} color="green">
            Question Dash Board
          </Typography>

          <FormControl sx={{ width: "900px" }}>
            <InputLabel id="category">Category</InputLabel>
            <Select labelId="demo-simple-select-label" id="category" label="Category">
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ width: "900px" }}>
            <InputLabel id="dfficulty">Difficulty</InputLabel>
            <Select labelId="demo-simple-select-label" id="difficulty" label="Difficulty">
              <MenuItem value={10}>Easy</MenuItem>
              <MenuItem value={20}>Medium</MenuItem>
              <MenuItem value={30}>Hard</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ width: "900px" }}>
            <InputLabel id="type">Type</InputLabel>
            <Select labelId="demo-simple-select-label" id="type" label="Type">
              <MenuItem value="multiple">Multiple Choice</MenuItem>
              <MenuItem value="boolean">True/False</MenuItem>
            </Select>
          </FormControl>

          <TextField id="outlined-basic" label="Amount of Question" variant="outlined" sx={{ width: "900px" }} />

          <Button variant="contained" color="success">
            Get Started
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default Dashboard;
