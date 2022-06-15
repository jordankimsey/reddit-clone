import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { useUser } from '../src/context/AuthContext';
import { listPosts } from '../src/graphql/queries';
import { API } from 'aws-amplify';
import { Container } from '@mui/material';
import PostPreview from '../src/components/PostPreview';

export default function Home() {
  const { user } = useUser();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    //GraphQL API Reqest to retrieve all posts
    const fetchPostFromApi = async () => {
      const allPosts = await API.graphql({ query: listPosts });
      if (allPosts.data) {
        return setPosts(allPosts.data.listPosts.items);
      } else {
        throw new Error(
          'Oh no! Something went wrong.  Could not retrieve posts.'
        );
      }
    };
    fetchPostFromApi();
    // setPosts(DUMMY_DATA);
  }, []);

  const DUMMY_DATA = [
    {
      id: '123456',
      title: 'My first Post',
      owner: 'jordan',
      createdAt: '2022-06-15t17:02:47.282Z',
      upvotes: '22345',
      downvotes: '245',
    },
    {
      id: '123456',
      title: 'My first Post',
      owner: 'jordan',
      createdAt: '2022-06-15t17:02:47.282Z',
      upvotes: '22342',
      downvotes: '245',
    },
  ];

  return (
    <Container maxWidth='md'>
      {
        posts.map((post) => (
          <PostPreview key={post.id} post={ post} />
        ))
      }
    </Container>
  
    )
}
