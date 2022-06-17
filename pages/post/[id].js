import React from 'react';
import { withSSRContext } from 'aws-amplify';
import { getPost, listPosts } from '../../src/graphql/queries';
import { Container } from '@mui/material';
import PostPreview from '../../src/components/PostPreview';
import Comment from '../../src/components/Comment';

const SinglePost = ({post}) => {
  console.log(post) 
  return (
        <Container maxWidth='md'>
        <PostPreview post={post} />
        {post?.comments?.items.map((comment) => (<Comment comment={comment } key={comment.id} />))}
        
      </Container>
  )
};

export default SinglePost;



export async function getStaticPaths() {
  const SSR = withSSRContext();
  const { data } = await SSR.API.graphql({query: listPosts});
  const paths = data.listPosts.items.map((post) => ({
    params: { id: post.id }
  }));
    
  return { fallback: 'blocking', paths };
}

export async function getStaticProps({params}) {
    const SSR = withSSRContext();
    const { data } = await SSR.API.graphql({
        query: getPost,
        variables: {
            id: params.id
        }
    });

  return {
    props: {
      post: data.getPost
    },
    revalidate: 10, //In Seconds
  };
}
