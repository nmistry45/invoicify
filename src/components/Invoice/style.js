import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
    // root: {
    //   display: 'flex',
    //   '& > *': {
    //     margin: theme.spacing(1),
    //   },
    // },
    large: {
      width: theme.spacing(12),
      height: theme.spacing(12),
    },

    headerContainer: {
        // display: 'flex'
        paddingTop: theme.spacing(1),
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(1),
    },
    saveButton: {
        backgroundColor: theme.palette.primary.main,
        color: "white",
        padding: "10px",
        borderRadius: "5px"
    }
  }));



  