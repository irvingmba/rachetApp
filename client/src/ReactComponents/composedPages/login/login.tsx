import React from 'react';

import LoginBlock from '../../composedBlocks/login/styledLoginBk';
import { NavLink, Redirect } from 'react-router-dom';
import { loginStyles } from "./styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Avatar, Typography, Grid } from '@material-ui/core';
import { template } from "../../../international/handlebars";
import { Ostatus } from '../../../StateManagement/redux/actionCreators';
import { PATH_DASHBOARD_VIEW } from '../../../globalConfig';


/* -------- REACT COMPONENT --------- */ 

const LoginPage:React.FunctionComponent<{status:Ostatus}> = ({status}) => {
    const styles = loginStyles();

    return (
        <Container component="main" maxWidth="xs">
        {status === Ostatus.online ? <Redirect to={PATH_DASHBOARD_VIEW} /> : ""}
            <CssBaseline />
            <div className={styles.paper}>
            <Avatar className={styles.avatar}>
            </Avatar>
            <Typography component="h1" variant="h5">
            {template("login.title")}
            </Typography>
            <LoginBlock />
            <Grid container>
            <Grid item>
            <NavLink to="/registry">
                {template("login.toRegister")}
            </NavLink>
            </Grid>
          </Grid>
            </div>
        </Container>
    );
};

export default LoginPage;