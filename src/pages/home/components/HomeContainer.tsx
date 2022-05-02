import { Box } from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';
import ButtonScrollToTop from '../../../components/Button/ButtonScrollToTop';
import Footer from '../../../components/Footer/Footer';
import Hero from '../../../components/Hero/Hero';
import { useUser } from '../../../hooks/authentication/useUser';
import useWatchScroll from '../../../hooks/utils/useWatchScroll';
import Navigation from './../../../components/Navigation/Navigation';
import MainContainer from './MainContainer';
const HomeContainer = () => {
  const { isShowScrollToTop } = useWatchScroll();
  const { data, error } = useUser();
  console.log(data);
  if (data?.nameGroup !== 'Customer' && !error) {
    return <Navigate to={'/user/profile'} replace={true} />;
  }

  return (
    <Box bgColor={'bgMain.100'} position="relative">
      <Navigation />
      <Hero />
      <MainContainer />
      <Footer />
      <ButtonScrollToTop isShowScrollToTop={isShowScrollToTop} />
    </Box>
  );
};

export default HomeContainer;
