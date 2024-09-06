import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { backend } from 'declarations/backend';
import { Typography, TextField, Button, Box, CircularProgress } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

interface FormData {
  title: string;
  content: string;
  imageUrl: string;
}

const NewPostPage: React.FC = () => {
  const { control, handleSubmit } = useForm<FormData>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const postId = await backend.createPost(data.title, data.content, data.imageUrl ? [data.imageUrl] : []);
      navigate(`/post/${postId}`);
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
      <Typography variant="h4" gutterBottom>
        Create New Post
      </Typography>
      <Controller
        name="title"
        control={control}
        defaultValue=""
        rules={{ required: 'Title is required' }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            error={!!error}
            helperText={error ? error.message : null}
          />
        )}
      />
      <Controller
        name="content"
        control={control}
        defaultValue=""
        rules={{ required: 'Content is required' }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            margin="normal"
            required
            fullWidth
            id="content"
            label="Content"
            multiline
            rows={4}
            error={!!error}
            helperText={error ? error.message : null}
          />
        )}
      />
      <Controller
        name="imageUrl"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            margin="normal"
            fullWidth
            id="imageUrl"
            label="Image URL (optional)"
          />
        )}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Create Post'}
      </Button>
    </Box>
  );
};

export default NewPostPage;
