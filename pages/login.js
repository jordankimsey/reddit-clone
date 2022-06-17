import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField, Grid, Snackbar, Alert } from '@mui/material';
import { Auth } from 'aws-amplify';
import { useUser } from '../src/context/AuthContext';
import { useRouter } from 'next/router';

const Login = () => {
  const router = useRouter();
  const { user, setUser } = useUser();
  const [open, setOpen] = useState(false);
  const [signInError, setSignInError] = useState('');

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async ({ username, password }) => {
    try {
      const amplifyUser = await Auth.signIn(username, password);
      setUser(amplifyUser);
      router.push('/');
    } catch (err) {
      setSignInError(err.message)
      setOpen(true);
      
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
      <Grid
        container
        direction='column'
        alignItems='center'
        justify='center'
        spacing={1}
        marginTop={1}
      >
        <Grid item>
          <TextField
            id='username'
            label='Username'
            variant='outlined'
            type='text'
            error={errors.username ? true : false}
            helperText={errors.username && errors.username.message}
            {...register('username', {
              required: {
                value: true,
                message: 'Please enter a valid username',
              },
              minLength: {
                value: 3,
                message: 'Please enter a username between 3-16 characters.',
              },
              maxLength: {
                value: 16,
                message: 'Please enter a username between 3-16 characters.',
              },
            })}
          />
        </Grid>
        <Grid item>
          <TextField
            id='password'
            label='Password'
            variant='outlined'
            type='password'
            error={errors.password ? true : false}
            helperText={errors.password && errors.password.message}
            {...register('password', {
              required: {
                value: true,
                message: 'Please enter a password',
              },
              minLength: {
                value: 8,
                message: 'Please enter a password greater than 8 characters.',
              },
            })}
          />
        </Grid>
        <Grid style={{ marginTop: 16 }}>
          <Button variant='contained' type='submit'>
            Sign In
          </Button>
        </Grid>
      </Grid>
     
    </form>
     <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
          {signInError}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Login;
