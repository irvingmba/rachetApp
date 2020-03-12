import React,{ useReducer } from 'react';
import { inputElements } from './variables';
import { mapInputsToArray } from '../utils/utilForm';
import { simpleFormReducer, actionForm } from "../utils/FormReducers";
import { connect, useDispatch } from 'react-redux';
import { ASC_REGISTER } from "../../../StateManagement/reduxSaga/sagaRegister";
import { verifySamePassword, alertDifferentPass } from '../utils/utilFns';
import { template } from "../../../international/handlebars";
import { stylesRegBlock } from "./styles";
import { Grid, TextField, Button } from '@material-ui/core';

interface InUpdate {
  type: string;
  payload: {
      [key: string]: string;
  };
}

const initState = {
  name: "",
  UserID: "",
  birthday: "",
  email: "",
  password: "",
  confPassword: ""
};

function addUpdater2Disp(update:React.Dispatch<InUpdate>) {
  return function handleChange(event:React.ChangeEvent<HTMLInputElement>){
    const value = event.target.value;
    const name = event.target.name;
    update(actionForm(name,value));
  };
};

/* -----REACT COMPONENT ----- */

const Registry:React.FunctionComponent = () => {

    const dispatch = useDispatch();
    const [state,update] = useReducer(simpleFormReducer,initState);
    const styles = stylesRegBlock();
    const changer = addUpdater2Disp(update);

    const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const samePass = verifySamePassword(state);
        if(samePass) {
            dispatch({type:ASC_REGISTER, payload: state});
        } else{
            alertDifferentPass();
        };
    };

    return (
        <form
        onSubmit={handleSubmit}
        noValidate
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label={template("registry.fName")}
                autoFocus
                onChange={changer}
                value={state["name"]}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="UserID"
                label={template("registry.fUser")}
                name="UserID"
                autoComplete="uname"
                onChange={changer}
                value={state["UserID"]}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="birthday"
                label={template("registry.fBirthday")}
                name="birthday"
                autoComplete="birthday"
                type="date"
                InputLabelProps={{
                  shrink: true
                }}
                onChange={changer}
                value={state["birthday"]}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label={template("registry.fEmail")}
                name="email"
                autoComplete="email"
                onChange={changer}
                value={state["email"]}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label={template("registry.fPassword")}
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={changer}
                value={state["password"]}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confPassword"
                label={template("registry.fConfPass")}
                type="password"
                id="confPassword"
                autoComplete="confirm-password"
                onChange={changer}
                value={state["confPassword"]}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={styles.submit}
          >
            Sign Up
          </Button>
        </form>
    );
};

const connectedRegistry = connect(null)(Registry);

export default connectedRegistry;