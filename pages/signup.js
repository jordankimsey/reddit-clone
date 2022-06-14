import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField, Grid } from '@mui/material';

const Signup = () => {
  const { register, formState: {errors}, handleSubmit } = useForm();
    const onSubmit = (data) => {
      console.log('Errors:', errors);
    console.log('Submitted the form');
    console.log(data);
  };
console.log('Easdrrors:', errors);
  

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
      <Grid
        container
        direction='column'
        alignItems='center'
        justify='center'
        spacing={2}
      >
        <Grid item>
          <TextField
            id='username'
            label='Username'
            variant='outlined'
            {...register("username", {
                required: { value: true, message: 'Please enter a username' },
                minLength: {value: 3, message: 'Please enter a username between 3-16 characters.'},
                maxLength: {value: 16, message: 'Please enter a username between 3-16 characters.'}
            })}
          />
        </Grid>
        <Grid>
          {' '}
          <Button variant='contained' type='submit'>
            Sign up
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Signup;
