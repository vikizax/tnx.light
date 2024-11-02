import { Button, ButtonProps } from "@mui/material";
import { ColorPalette, Units } from "../../utils/commons/color-palette";

export type ActionButtonProps = {
  isActive?: boolean;
};

const ActionButton: React.FC<ButtonProps & ActionButtonProps> = (props) => {
  return (
    <Button
      sx={{
        border: props.isActive
          ? "1px solid transparent"
          : `1px solid ${ColorPalette.borderColor}`,
        color: props.isActive ? ColorPalette.active.color : ColorPalette.color,
        backgroundColor: props.isActive
          ? ColorPalette.active.bgColor
          : "transparent",
        borderRadius: Units.borderRadius,
        textTransform: "none",
      }}
      {...props}
      variant="outlined"
    />
  );
};

export default ActionButton;
