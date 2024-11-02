import { IconButton, Tooltip } from "@mui/material";
import { TooltipProps } from "@mui/material/Tooltip";
import { SxProps, Theme } from "@mui/system";
import { Link, useMatch } from "react-router-dom";
import { ColorPalette } from "../../../utils/commons/color-palette";

export type NavButtonProps = {
  to: string;
  icon: (sx: SxProps) => React.ReactNode;
  tooltipTxt?: string;
  tooltipPlacement?: TooltipProps["placement"];
};

export const NavButton: React.FC<NavButtonProps> = ({
  to,
  icon,
  tooltipTxt,
  tooltipPlacement = "right",
}) => {
  const isActive = Boolean(useMatch(to));
  const iconButtonSx: SxProps<Theme> = {
    backgroundColor: isActive ? ColorPalette.active.bgColor : "transparent",
    border: isActive ? "1px solid transparent" : `1px solid ${ColorPalette.borderColor}`,
    "&:hover": {
      backgroundColor: isActive ? ColorPalette.active.bgColor : "transparent",
    },
  };

  return (
    <Link to={to}>
      <Tooltip title={tooltipTxt} placement={tooltipPlacement}>
        <IconButton sx={iconButtonSx}>
          {icon({ color: isActive ? "#000" : ColorPalette.color })}
        </IconButton>
      </Tooltip>
    </Link>
  );
};
