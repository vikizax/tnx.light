import { Stack, Typography } from "@mui/material";
import { ColorPalette } from "../../utils/commons/color-palette";

export type PageHeadProps = {
  heading: string;
  subheading?: string;
};

const PageHead: React.FC<PageHeadProps> = (props) => {
  return (
    <Stack>
      <Typography variant="h2" color={`${ColorPalette.color}`}>
        {props.heading}
      </Typography>
      {props.subheading && (
        <Typography color={`${ColorPalette.color}`}>
          {props.subheading}
        </Typography>
      )}
    </Stack>
  );
};

export default PageHead;
