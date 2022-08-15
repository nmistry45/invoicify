import React from "react";
import Grid from '@mui/material/Grid';

import emptyIcon from "../../images/empty.JPG"
import { Typography } from "@mui/material";
const Empty = (props) =>{
    return (<Grid container flexDirection="column">
        <Grid item xs={12} alignItems="center" justifyContent="center" pt={20}>
            <img src={emptyIcon} width="200px" height="150px"/>
        </Grid>
        <Grid item xs={12} alignItems="center" justifyContent="center" pt={5}>
            <Typography> Hmmm.... there is nothing to see here. You might want to add something to get started!</Typography>
        </Grid>

    </Grid>);
}
 
export default Empty ;