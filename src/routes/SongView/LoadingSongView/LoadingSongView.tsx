import { Stack, Skeleton } from '@mui/material';
import './LoadingSongView.module.css';

const LoadingSongScreen = () => {
  return (
    <>
      <Stack spacing={2} alignItems={'center'}>
        <Skeleton variant="rectangular" height={64} width={'100%'} />
        <Skeleton variant="rounded" height={50} width={'80%'} />

        <Stack spacing={3} alignItems={'center'} width={'100%'}>
          <Skeleton variant="rounded" height={'25vh'} width={'80%'} />
          <Skeleton variant="rounded" height={'25vh'} width={'80%'} />
          <Skeleton variant="rounded" height={'20vh'} width={'80%'} />
        </Stack>
      </Stack>
    </>
  );
};

export default LoadingSongScreen;
