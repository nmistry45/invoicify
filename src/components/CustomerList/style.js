import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  tableRow: {
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
    cursor: "default",
  },
}));
