import {
  Box,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import DescriptionIcon from "@mui/icons-material/Description";

import { useSelector } from "react-redux";
import type { IUser, IUserStore } from "../types";

import { CSVLink } from "react-csv";
import { toast, ToastContainer } from "react-toastify";
import { generateFileName } from "../utils/generateFileName";
import Paper from "@mui/material/Paper";

const Leaderboard = () => {
  const users = useSelector((state: IUserStore) => state.users);

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "50px",
          borderRadius: "15px",
        }}
      >
        <Typography variant="h4" marginTop={"35px"} fontWeight={800} color="green">
          Question Dash Board
        </Typography>
      </Box>

      <Box textAlign={"right"} marginTop={"35px"} marginBottom={"30px"}>
        <CSVLink
          data={users}
          filename={generateFileName("User")}
          // onClick={(event: any) => {
          //   toast.success("You have successfully exported.");
          //   return false;
          // }}
        >
          <Button
            variant="contained"
            sx={{ marginRight: 2 }}
            onClick={() => {
              toast.success("You have successfully exported.");
              return false;
            }}
          >
            <DescriptionIcon sx={{ marginRight: 1 }} />
            Export CSV
          </Button>
        </CSVLink>

        <Button variant="outlined" href="/">
          Go Home
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ minWidth: 350 }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user: IUser, index: number) => (
              <TableRow key={index}>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </Container>
  );
};

export default Leaderboard;
