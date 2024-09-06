import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { backend } from 'declarations/backend';
import { Typography, Card, CardContent, CardMedia, Grid, Link, CircularProgress, Alert } from '@mui/material';

interface Post {
  id: number;
  title: string;
  content: string;
  imageUrl: string | null;
  timestamp: bigint;
}

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await backend.getPosts();
        console.log('Fetched posts:', result); // Debug log
        setPosts(result);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Failed to fetch posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (posts.length === 0) {
    return <Typography>No posts available.</Typography>;
  }

  return (
    <Grid container spacing={4}>
      {posts.map((post) => (
        <Grid item xs={12} sm={6} md={4} key={post.id}>
          <Card>
            {post.imageUrl && (
              <CardMedia
                component="img"
                height="140"
                image={post.imageUrl}
                alt={post.title}
              />
            )}
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {post.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap>
                {post.content.replace(/<[^>]*>/g, '').substring(0, 100)}...
              </Typography>
              <Link component={RouterLink} to={`/post/${post.id}`}>
                Read more
              </Link>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default HomePage;
