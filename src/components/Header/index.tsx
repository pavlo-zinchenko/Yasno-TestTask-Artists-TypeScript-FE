import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Typography, IconButton, Button, Badge } from '@mui/material';
import { ArrowBack, Brightness4, Brightness7, Favorite } from '@mui/icons-material';
import { useTheme, Theme } from '@mui/material/styles';
import { toggleTheme } from '@slices/themeSlice';
import { RootState } from '@store/index';
import { Dispatch } from 'redux';
import { Routes, RouteTitles } from '@enums';

const isDynamicArtistRoute = (pathname: string): boolean => /^\/artists\/\d+$/.test(pathname);

export default function Header() {
  const [headerTitle, setHeaderTitle] = useState<string>('Music App');
  const [isReturnButton, setIsReturnButton] = useState<boolean>(false);

  const theme: Theme = useTheme();
  const dispatch: Dispatch<any> = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const favoriteCount: number = useSelector((state: RootState) => state.favourites?.songs?.length || 0);
  const isAuthenticated: boolean = !!localStorage.getItem('token');

  useEffect(() => {
    const { pathname } = location;
    let title = 'Music App';

    if (pathname in RouteTitles) {
      title = RouteTitles[pathname as Routes];
      setIsReturnButton(pathname === Routes.Favourites);
    } else if (isDynamicArtistRoute(pathname)) {
      title = 'Artist';
      setIsReturnButton(true);
    } else {
      setIsReturnButton(false);
      title = 'Music App';
    }

    setHeaderTitle(title);
    document.title = title;
  }, [location.pathname]);

  const handleLogout = (): void => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const navigateTo = (url: Routes): void => {
    if (location.pathname !== url) {
      navigate(url);
    }
  };

  return (
    <Box
      component="header"
      sx={{
        backgroundColor: 'primary.main',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 2,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {isReturnButton && (
          <IconButton onClick={() => navigate(-1)} sx={{ color: 'white' }}>
            <ArrowBack />
          </IconButton>
        )}
        <Typography variant="h6" onClick={() => navigate('/')} sx={{ cursor: 'pointer', ml: isReturnButton ? 1 : 0 }}>
          {headerTitle}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={() => navigateTo(Routes.Favourites)} sx={{ color: 'white', ml: 1, mr: 1 }}>
          <Badge badgeContent={favoriteCount} color="error">
            <Favorite />
          </Badge>
        </IconButton>

        <IconButton
          sx={{ color: 'white', ml: 1, mr: 1 }}
          aria-label="toggle theme"
          onClick={() => dispatch(toggleTheme())}
        >
          {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>

        {!isAuthenticated ? (
          <>
            <Button color="inherit" onClick={() => navigateTo(Routes.Login)}>
              Sign In
            </Button>
            <Button color="inherit" onClick={() => navigateTo(Routes.Register)}>
              Sign Up
            </Button>
          </>
        ) : (
          <Button color="inherit" onClick={handleLogout}>
            Log Out
          </Button>
        )}
      </Box>
    </Box>
  );
}
