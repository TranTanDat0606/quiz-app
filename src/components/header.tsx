import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  const goToLeaderBoard = () => {
    navigate("/leader-board");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={0} color="transparent">
        <Toolbar className="h-0 mb-3!">
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "#215E30", fontWeight: 900, cursor: "pointer" }}
            onClick={goHome}
          >
            Quiz App
          </Typography>
          <Button className="text-[#215E50]! font-black!" onClick={goToLeaderBoard}>
            LEADER BOARD
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
