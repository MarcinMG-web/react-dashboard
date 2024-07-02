import Box from '@mui/joy/Box';
import CssBaseline from '@mui/joy/CssBaseline';
import Footer from '../../ui/Footer';
import Header from '../../ui/Header';
import MainDashboard from '../../components/MainDashboard';

export default function Dashboard(): JSX.Element {
  return (
    <>
      <CssBaseline />

      <Box
        sx={(theme) => ({
          width: { xs: '100%', md: '48vw' },
          transition: 'width var(--Transition-duration)',
          transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(255 255 255 / 0.2)',
          [theme.getColorSchemeSelector('dark')]: {
            backgroundColor: 'rgba(19 19 24 / 0.4)',
          },
        })}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '90vh',
            width: '100%',
            px: 2,
          }}
        >
          <Header />
          <MainDashboard />
          <Footer />
        </Box>
      </Box>

      <Box
        sx={(theme) => ({
          height: '100%',
          position: 'fixed',
          right: 0,
          top: 0,
          bottom: 0,
          left: { xs: 0, md: '50vw' },
          transition: 'background-image var(--Transition-duration), left var(--Transition-duration) !important',
          transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
          backgroundColor: 'background.level1',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundImage: 'url(src/assets/lightMode.png)',
          [theme.getColorSchemeSelector('dark')]: {
            backgroundImage: 'url(src/assets/darkMode.png)',
          },
        })}
      />
    </>
  );
}
