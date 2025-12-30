import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import RocketLaunchSharpIcon from "@mui/icons-material/RocketLaunchSharp";
import { useDispatch, useSelector } from "react-redux";
import type { IStore, IUser } from "../types";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import {} from "../redux/question/question.actions";
import { addUser } from "../redux/user/users.actions";

const FinalScore = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const amount = useSelector((state: IStore) => state.question.amount);
  const score = useSelector((state: IStore) => state.question.score);

  const newAmount = amount;
  const newScore = score;

  const percent = newAmount ? (newScore / newAmount) * 100 : 0;

  const { handleSubmit, control } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  const onsubmit = (formData: Omit<IUser, "score">) => {
    const newUser: IUser = {
      ...formData,
      score,
    };

    dispatch(addUser(newUser));
    navigate("/leader-board");
  };

  return (
    <Container maxWidth="xl" className="px-15! py-10!">
      <Box>
        <Typography
          variant="h4"
          align="center"
          marginBottom={2}
          fontWeight={800}
          color={percent <= 25 ? "red" : percent <= 50 ? "orange" : "#52b202"}
        >
          Final Score <RocketLaunchSharpIcon sx={{ fontSize: 32 }} />
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>
        <Gauge
          width={190}
          height={120}
          value={percent}
          startAngle={-100}
          endAngle={100}
          sx={(theme) => ({
            [`& .${gaugeClasses.valueText}`]: {
              fontSize: 25,
              fontWeight: 700,
              transform: "translateY(-15px)",
            },
            [`& .${gaugeClasses.valueText} tspan`]: {
              fill: percent <= 25 ? "red" : percent <= 50 ? "orange" : "#52b202",
            },
            [`& .${gaugeClasses.valueArc}`]: {
              fill: percent <= 25 ? "red" : percent <= 50 ? "orange" : "#52b202",
            },
            [`& .${gaugeClasses.referenceArc}`]: {
              fill: theme.palette.text.disabled,
            },
          })}
          text={() => `${newScore} / ${newAmount}`}
        />
      </Box>

      <div className="h-[40vh] flex items-center justify-center">
        <Box sx={{ width: 500, gap: 3 }}>
          <form onSubmit={handleSubmit(onsubmit)} className="flex items-center flex-col gap-3">
            <Controller
              name="firstName"
              control={control}
              rules={{ required: "First Name is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="First Name"
                  variant="standard"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name="lastName"
              control={control}
              rules={{ required: "Last Name is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Last Name"
                  variant="standard"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  type="email"
                  label="Email"
                  variant="standard"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />

            <Button variant="contained" color="success" type="submit" className="w-[180px] mt-7!">
              Get Started
            </Button>
          </form>
        </Box>
      </div>
    </Container>
  );
};

export default FinalScore;
