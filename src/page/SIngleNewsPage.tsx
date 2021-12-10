import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout } from '../effects/user/userSlice';
import { userAuthSelector } from '../effects/user/userSelector';
import { getNewsById, newsLoadingFailed, newsLoadingSelector } from '../effects/news/newsSelector';
import { Loader } from '../components/Loader';
import { ErrorComponent } from '../components/ErrorComponent';

export const SingleNewsPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const isLoading = useAppSelector(newsLoadingSelector);
  const newsById = useAppSelector(getNewsById(+id || 0));
  const isLogin = useAppSelector(userAuthSelector);
  const isError = useAppSelector(newsLoadingFailed);

  useEffect(() => {
    !isLogin && navigate('/');
  }, [isLogin, navigate]);

  const logoutHandler = () => {
    navigate('/');
    dispatch(logout());
  };

  if (isError) {
    return <ErrorComponent />;
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Button onClick={() => navigate('/')} color="inherit">
              Back
            </Button>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            <Button onClick={logoutHandler} color="inherit">
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Container maxWidth="lg">
        {isLoading ? (
          <Loader />
        ) : (
          <Card>
            {newsById?.img && (
              <CardMedia component="img" height="360" image={newsById?.img} alt="news" />
            )}
            <CardContent>
              <Typography gutterBottom variant={'h3'} component="div">
                {newsById?.title}
                If the United States pulls back, the world will become more dangerous
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {newsById?.description}
                Other democracies must start preparing
              </Typography>
              {newsById?.text?.map((item, i) => (
                <Typography key={i} variant="body1" color="text.secondary">
                  {item}
                </Typography>
              ))}
            </CardContent>
          </Card>
        )}
      </Container>
    </>
  );
};
