import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { backend } from 'declarations/backend';
import { Typography, Card, CardContent, CardMedia, Grid, Link, CircularProgress } from '@mui/material';

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

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const result = await backend.getPosts();
        setPosts(result);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <CircularProgress />;
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
