import { Chip, Stack } from "@mui/material";
import { ColorPalette } from "../../../../utils/commons/color-palette";

export type FilterChipProps = {
  data: { id: number; label: string }[];
  prefix?: string;
  onDelete?: (
    id: number,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
};

const FilterChip: React.FC<FilterChipProps> = ({ data, prefix, onDelete }) => {
  return (
    <Stack direction={"row"} overflow={"auto"} gap={1}>
      <div onClick={(e) => {}}></div>
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
          label={prefix ? prefix + filter.label : "@" + filter.label}
          key={`${idx}-${filter}`}
          variant="outlined"
          onDelete={
            onDelete ? (event) => onDelete(filter.id, event) : undefined
          }
        />
      ))}
    </Stack>
  );
};

export default FilterChip;
