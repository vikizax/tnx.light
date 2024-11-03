import CategoryIcon from "@mui/icons-material/Category";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CircularProgress from "@mui/material/CircularProgress";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid2 as Grid,
  InputAdornment,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import ActionButton from "../../../../components/action-button";
import InputField from "../../../../components/input";
import SelectField from "../../../../components/select";
import { ColorPalette } from "../../../../utils/commons/color-palette";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTransaction } from "../../../../api/";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { open } from "../../../../store/slices/snack.slice";

type TnxFormData = {
  type: "income" | "expense";
  amount: string | "";
  category: string;
  date: string;
  description: string;
  isRecurring: boolean;
  recurrenceFrequency: "weekly" | "monthly";
};

const AddTnxForm = ({
  toggleDrawer,
  initialFormData,
}: {
  toggleDrawer: (newOpen: boolean) => () => void;
  initialFormData?: TnxFormData;
}) => {
  const params = useParams<{ spaceId: string }>();

  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createTransaction,
    onSuccess: async () => {
      toggleDrawer(false)();
      dispatch(open("transaction created"));
      await queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
    },
    onError: () => dispatch(open("something went wrong. try again")),
  });

  const [formData, setFormData] = useState<TnxFormData>(
    initialFormData ?? {
      type: "income",
      amount: "",
      category: "",
      date: "",
      description: "",
      isRecurring: false,
      recurrenceFrequency: "weekly",
    }
  );

  const handleChange = (
    event:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<unknown>
  ) => {
    const { name, type } = event.target as {
      name?: string;
      type: unknown;
      value: string;
    };

    const value =
      type === "checkbox"
        ? (event.target as HTMLInputElement).checked
        : event.target.value;
    setFormData((prevData) => ({
      ...prevData,
      [name as keyof FormData]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);

    await mutateAsync({
      spaceId: params.spaceId!,
      amount: formData.amount + "",
      createdAt: formData.date,
      type: formData.type,
      category: formData.category,
      description: formData.description,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box padding={2}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12 }}>
            <SelectField
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              variant="standard"
              fullWidth
            >
              <MenuItem value="income">income</MenuItem>
              <MenuItem value="expense">expense</MenuItem>
            </SelectField>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <InputField
              name="amount"
              type="number"
              onKeyDown={(e) => {
                if (["e", "E", "-", "+"].includes(e.key)) {
                  e.preventDefault();
                }
              }}
              placeholder="add amount"
              value={formData.amount}
              onChange={handleChange}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment
                      sx={{
                        color: ColorPalette.colorLight,
                      }}
                      position="start"
                    >
                      <CurrencyRupeeIcon fontSize="small" />
                    </InputAdornment>
                  ),
                },
              }}
              required
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <InputField
              name="category"
              placeholder="add category"
              fullWidth
              value={formData.category}
              onChange={handleChange}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment
                      sx={{
                        color: ColorPalette.colorLight,
                      }}
                      position="start"
                    >
                      <CategoryIcon fontSize="small" />
                    </InputAdornment>
                  ),
                },
              }}
              required
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <InputField
              name="date"
              type="date"
              fullWidth
              value={formData.date}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <InputField
              name="description"
              placeholder="tnx description"
              variant="outlined"
              fullWidth
              value={formData.description}
              onChange={handleChange}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment
                      sx={{
                        color: ColorPalette.colorLight,
                      }}
                      position="start"
                    >
                      <EditIcon fontSize="small" />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <FormControlLabel
              sx={{
                color: ColorPalette.colorLight,
                "& svg": {
                  color: ColorPalette.bgColorLight,
                },
              }}
              control={
                <Checkbox
                  name="isRecurring"
                  checked={formData.isRecurring}
                  onChange={handleChange}
                />
              }
              label="make it recurring"
            />
          </Grid>

          {formData.isRecurring && (
            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth variant="standard">
                <SelectField
                  name="recurrenceFrequency"
                  value={formData.recurrenceFrequency}
                  onChange={handleChange}
                >
                  <MenuItem value="weekly">weekly</MenuItem>
                  <MenuItem value="monthly">monthly</MenuItem>
                </SelectField>
              </FormControl>
            </Grid>
          )}

          <Grid size={{ xs: 12 }}>
            <ActionButton type="submit" fullWidth>
              {isPending ? (
                <CircularProgress
                  sx={{
                    color: ColorPalette.color,
                  }}
                  size={24}
                />
              ) : (
                "Submit"
              )}
            </ActionButton>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default AddTnxForm;
