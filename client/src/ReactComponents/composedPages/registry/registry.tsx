import React from 'react';

import Registry from '../../composedBlocks/registry/stdRegistryBlock';
import { NavLink, Redirect } from 'react-router-dom';
import { Container, CssBaseline, Avatar, Typography, Grid } from '@material-ui/core';
import { registryStyles } from "./styles";
import { template } from "../../../international/handlebars";
import { PATH_LOGIN_VIEW } from '../../../globalConfig';

const RegistryPage:React.FunctionComponent<{registry:boolean}> = ({registry}) => {
    console.log("registry comoponent\n",registry);
    const styles = registryStyles();


    return (
        <>
        {registry ? <Redirect to={PATH_LOGIN_VIEW}/> : ""}
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={styles.paper}>
        <Avatar className={styles.avatar}>
        </Avatar>
        <Typography component="h1" variant="h5">
          {template("registry.title")}
        </Typography>
        </div>
            <Registry />
        <Grid container justify="flex-end">
        <Grid item>
        </Grid>
        <NavLink
        to="/"
        >{template("login.hint")}</NavLink>
        </Grid>
        </Container>
        </>
    );
};

export default RegistryPage;