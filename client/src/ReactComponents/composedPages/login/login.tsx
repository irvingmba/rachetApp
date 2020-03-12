import React from 'react';

import LoginBlock from '../../composedBlocks/login/styledLoginBk';
import { NavLink } from 'react-router-dom';
import { loginStyles } from "./styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Avatar, Typography, Grid, Button } from '@material-ui/core';
import Handlebars from "handlebars";
import { template } from "../../../international/handlebars";
import {polyglot} from "../../../international/main";


/* -------- REACT COMPONENT --------- */ 

const LoginPage:React.FunctionComponent = () => {
    const styles = loginStyles();

    return (
        <Container component="main" maxWidth="xs">
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