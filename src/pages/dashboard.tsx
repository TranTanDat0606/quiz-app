import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import { Controller, useForm } from "react-hook-form";

import type { ICategory, IForm } from "../types";
import { updateFormQuestion } from "../redux/question/question.actions";

import { ToastContainer, toast } from "react-toastify";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [categories, setCategories] = React.useState<ICategory[]>([]);
  const { handleSubmit, control, reset } = useForm<IForm>({
    defaultValues: {
      category: "",
      difficulty: "",
      type: "",
      amount: 0,
    },
  });

  React.useEffect(() => {
    async function fetchCategory() {
      try {
        const res = await fetch("https://opentdb.com/api_category.php");
        const data = await res.json();
        setCategories(data.trivia_categories || []);
      } catch (e) {
        console.log("fail fetch category", e);
      }
    }
    fetchCategory();
  }, []);

  const onSubmit = (data: IForm) => {
    dispatch(updateFormQuestion(data));

    toast.success("Fetch Question Done!");

    setTimeout(() => {
      navigate("/question");
    }, 2000);
    reset();
  };

  return (
    <Container maxWidth="xl">
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

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[20px] items-center w-[40vw] mx-5!">
          <Controller
            name="category"
            control={control}
            rules={{ required: "Please select a category!!!" }}
            render={({ field, fieldState }) => (
              <FormControl sx={{ width: "100%" }} error={!!fieldState.error}>
                <InputLabel id="category">Category</InputLabel>
                <Select {...field} labelId="category" label="Category">
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>

                <FormHelperText>{fieldState.error?.message}</FormHelperText>
              </FormControl>
            )}
          />

          <Controller
            name="difficulty"
            control={control}
            rules={{ required: "Please select a difficulty!!!" }}
            render={({ field, fieldState }) => (
              <FormControl sx={{ width: "100%" }} error={!!fieldState.error}>
                <InputLabel id="difficulty">Difficulty</InputLabel>
                <Select {...field} labelId="difficulty" label="Difficulty">
                  <MenuItem value="easy">Easy</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="hard">Hard</MenuItem>
                </Select>

                <FormHelperText>{fieldState.error?.message}</FormHelperText>
              </FormControl>
            )}
          />

          <Controller
            name="type"
            control={control}
            rules={{ required: "Please select a type!!!" }}
            render={({ field, fieldState }) => (
              <FormControl sx={{ width: "100%" }} error={!!fieldState.error}>
                <InputLabel id="type">Type</InputLabel>
                <Select {...field} labelId="type" label="Type">
                  <MenuItem value="multiple">Multiple Choice</MenuItem>
                  <MenuItem value="boolean">True/False</MenuItem>
                </Select>

                <FormHelperText>{fieldState.error?.message}</FormHelperText>
              </FormControl>
            )}
          />

          <Controller
            name="amount"
            control={control}
            rules={{
              required: "Please enter amount!!!",
              min: { value: 1, message: "Value must be at least 1" },
              validate: (value) => !Number.isNaN(value) || "Amount should be a number",
            }}
            render={({ field, fieldState }) => (
              <TextField
                sx={{ width: "100%" }}
                {...field}
                type="text"
                label="Amount of Question"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                onChange={(e) => field.onChange(Number(e.target.value))}
                onFocus={() => {
                  if (field.value === 0) {
                    field.onChange("");
                  }
                }}
              />
            )}
          />

          <Button variant="contained" color="success" type="submit" className="w-[180px] absolute! bottom-10">
            Get Started
          </Button>
        </form>
      </Box>
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
}

export default Dashboard;
