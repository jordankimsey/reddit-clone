import { Typography } from '@mui/material';
import { useUser } from '../src/context/AuthContext';

export default function Home() {

  const { user } = useUser();

  console.log("Welcome", user.username);
  return (
    <Typography variant='h1'>Welcome { user.username}</Typography>
  );
}
