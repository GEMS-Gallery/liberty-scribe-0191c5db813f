import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { backend } from 'declarations/backend';
import { Typography, Card, CardContent, CardMedia, CircularProgress, Alert } from '@mui/material';

interface Post {
  id: bigint;
  title: string;
  content: string;
  imageUrl: string | null;
  timestamp: bigint;
}

const PostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        try {
          setLoading(true);
          setError(null);
          const result = await backend.getPost(BigInt(id));
          if (result.length > 0) {
            setPost(result[0]);
          } else {
            setError('Post not found');
          }
        } catch (error) {
          console.error('Error fetching post:', error);
          setError('Failed to fetch post. Please try again later.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!post) {
    return <Typography>Post not found</Typography>;
  }

  return (
    <Card>
      {post.imageUrl && (
        <CardMedia
          component="img"
          height="300"
          image={post.imageUrl}
          alt={post.title}
        />
      )}
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          {post.title}
        </Typography>
        <Typography variant="body1" color="text.secondary" dangerouslySetInnerHTML={{ __html: post.content }} />
        <Typography variant="caption" color="text.secondary">
          Posted on: {new Date(Number(post.timestamp) / 1000000).toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PostPage;
