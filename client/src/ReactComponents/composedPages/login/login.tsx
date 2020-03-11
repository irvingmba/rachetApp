import React from 'react';

import LoginBlock from '../../composedBlocks/login/styledLoginBk';
import { NavLink } from 'react-router-dom';
import { loginStyles } from "./styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Avatar, Typography, Grid } from '@material-ui/core';
import {  } from "@material-ui/core/Icon"

const LoginPage:React.FunctionComponent = () => {
    const styles = loginStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={styles.paper}>
            <Avatar className={styles.avatar}>
            </Avatar>
            <Typography component="h1" variant="h5">
            Sign in
            </Typography>
            <LoginBlock />
            <Grid container>
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
            <Grid item>
            <NavLink to="/registry">
                {"Don't you have an account? Sign up"}
            </NavLink>
            </Grid>
          </Grid>
            </div>
        </Container>
    );
};

export default LoginPage;