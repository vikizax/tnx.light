import { Chip, Stack, useMediaQuery, useTheme } from "@mui/material";
import { ColorPalette } from "../../../../utils/commons/color-palette";

export type FilterChipProps = {
  data: { key: string; value: string }[];
  prefix?: string;
  onDelete?: (
    key: string,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
};

const FilterChip: React.FC<FilterChipProps> = ({ data, prefix, onDelete }) => {
  const theme = useTheme();
  const isScreenSmall = useMediaQuery(theme.breakpoints.between(0, 660));
  return (
    <Stack
      direction={"row"}
      gap={1}
      flexWrap={isScreenSmall ? "wrap" : "nowrap"}
    >
      {data.map((filter, idx) => (
        <Chip
          sx={{
            color: ColorPalette.color,
            border: `1px solid ${ColorPalette.borderColor}`,
            "& svg": {
              fill: ColorPalette.bgColorLight,
            },
            fontWeight: "medium",
          }}
          label={prefix ? prefix + filter.value : "@" + filter.value}
          key={`${idx}-${filter}`}
          variant="outlined"
          onDelete={
            onDelete ? (event) => onDelete(filter.key, event) : undefined
          }
        />
      ))}
    </Stack>
  );
};

export default FilterChip;
