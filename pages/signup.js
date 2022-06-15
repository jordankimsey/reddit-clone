import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField, Grid, Snackbar, Alert } from '@mui/material';
import { Auth } from 'aws-amplify';
import { useUser } from '../src/context/AuthContext';
import { useRouter } from 'next/router';

const Signup = () => {
    const router = useRouter();
  const { user, setUser } = useUser();
  const [open, setOpen] = useState(false);
  const [signupError, setSignupError] = useState('');
  const [showCode, setShowCode] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      if (showCode) {
        await confirmSignUp(data);
      } else {
        await signUpWithEmailAndPassword(data);
        setShowCode(true);
      }
    } catch (err) {
      setSignupError(err.message);
      setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  async function signUpWithEmailAndPassword(data) {
    const { username, password, email } = data;
    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email, // optional
        },
      });
      console.log('Signed up a user: ', user);
      
      return user;
    } catch (error) {
      throw error;
    }
  }

  async function confirmSignUp(data) {
    const { username, password, code } = data;
    try {
      await Auth.confirmSignUp(username, code);
        const amplifyUser = await Auth.signIn(username, password);
        if (amplifyUser) {
              setUser(amplifyUser);
              router.push('/');
        } else {
           throw new Error('Something went wrong')
        }
      
      console.log('yayy Success, signed in :', amplifyUser);
    } catch (error) {
      console.log('error confirming sign up', error);
    }
  }
  return (
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
            id='email'
            label='Email'
            variant='outlined'
            type='email'
            error={errors.email ? true : false}
            helperText={errors.email && errors.email.message}
            {...register('email', {
              required: {
                value: true,
                message: 'Please enter a valid email',
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

        {showCode && (
          <Grid item>
            <TextField
              id='code'
              label='Verification Code'
              variant='outlined'
              type='text'
              error={errors.code ? true : false}
              helperText={errors.code && errors.code.message}
              {...register('code', {
                required: {
                  value: true,
                  message: 'Please enter a code to verify account',
                },
                minLength: {
                  value: 6,
                  message: 'Please enter your verification code',
                },
                maxLength: {
                  value: 6,
                  message: 'Please enter your verification code',
                },
              })}
            />
          </Grid>
        )}
        <Grid style={{ marginTop: 16 }}>
          <Button variant='contained' type='submit'>
            {showCode ? 'Confirm Code' : 'Sign Up'}
          </Button>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
          {signupError.message}
        </Alert>
      </Snackbar>
    </form>
  );
};

export default Signup;
