import { Button, ButtonProps, Tooltip, TooltipProps } from "@mui/material";
import { ColorPalette, Units } from "../../utils/commons/color-palette";

export type ActionButtonProps = {
  isactive?: boolean;
  tooltipProps?: Omit<TooltipProps, "children">;
};

const ActionButton: React.FC<ButtonProps & ActionButtonProps> = ({
  isactive,
  tooltipProps,
  children,
  ...props
}) => {
  return (
    <Tooltip {...tooltipProps} title={tooltipProps?.title ?? ""}>
      <Button
        {...props}
        sx={{
          ...props.sx,
          border: isactive
            ? "1px solid transparent"
            : `1px solid ${ColorPalette.borderColor}`,
          color: isactive ? ColorPalette.active.color : ColorPalette.color,
          backgroundColor: isactive
            ? ColorPalette.active.bgColor
            : "transparent",
          borderRadius: Units.borderRadius,
          textTransform: "none",
        }}
        variant="outlined"
      >
        {children}
      </Button>
    </Tooltip>
  );
};

export default ActionButton;
