import React, { useReducer } from 'react';
import { simpleFormReducer, actionForm } from '../utils/FormReducers';
import { connect, useDispatch } from "react-redux";
import { typeRootState } from '../../../StateManagement/redux/reducers';
import { actionRegistry } from '../../../StateManagement/redux/actionCreators';
import { loginBlockStyles } from './styles';
import { asyncLogin } from '../../../StateManagement/reduxSaga/asyncActions';
import { TextField, FormControlLabel, Checkbox, Button } from '@material-ui/core';

const initState={
  user: "",
  password: ""
};

interface InUpdate {
  type: string;
    payload: {
        [key: string]: string;
    };
};

function changeValueWState(update:React.Dispatch<InUpdate>){
  return function onChange(event:React.ChangeEvent<HTMLInputElement>){
    const value = event.target.value;
    const name = event.target.name;
    update(actionForm(name, value));
    return;
  };
};

/* -------- REACT COMPONENT --------- */

const LoginBlock:React.FunctionComponent<props> = ({registry}) => {
    
    const [state, update] = useReducer(simpleFormReducer, initState);
    const dispatch = useDispatch();
    if(registry) dispatch(actionRegistry({registry: false}));
    const style = loginBlockStyles();
    const handleChange = changeValueWState(update);

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(asyncLogin(state))
    };
    
    return (
        <form
        onSubmit={handleSubmit}
        className={style.form}
        noValidate
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="user"
            label="User name"
            name="user"
            autoComplete="user"
            autoFocus
            value={state.user}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={state.password}
            onChange={handleChange}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={style.submit}
          >
            Sign In
          </Button>
        </form>
    );
};


/* -------- REDUX FUNCTIONS ------- */

function getRegistry(state: typeRootState) {
    if(state.login.registry === true) return true;
    return false;
  };

function mapStateToProps(state: typeRootState) {
    return {
        registry: getRegistry(state)
    };
};

type props = ReturnType<typeof mapStateToProps>;

const ConnectedLogin = connect(mapStateToProps)(LoginBlock);

export { ConnectedLogin as default};