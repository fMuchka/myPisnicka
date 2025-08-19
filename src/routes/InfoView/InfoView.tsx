import { Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { RoutesEnum } from '../routes';

const InfoView = () => {
  const navigate = useNavigate();

  return (
    <Stack spacing={4} style={{ marginTop: '2rem' }}>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Stack>
          <Typography variant="h5">My Písnička</Typography>
          <Typography variant="subtitle1" marginBottom={'2rem'}>
            Můj zpěvník pro naši zábavu
          </Typography>
        </Stack>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="48px"
          viewBox="0 -960 960 960"
          width="48px"
          fill="#22b925"
        >
          <path d="M486-333q41 0 70-28.42T585-431v-252h116v-60H545v237q-11-9-26.32-14T486-525q-39.06 0-66.03 27.37-26.97 27.36-26.97 67Q393-391 419.97-362q26.97 29 66.03 29ZM260-200q-24 0-42-18t-18-42v-560q0-24 18-42t42-18h560q24 0 42 18t18 42v560q0 24-18 42t-42 18H260Zm0-60h560v-560H260v560ZM140-80q-24 0-42-18t-18-42v-620h60v620h620v60H140Zm120-740v560-560Z" />
        </svg>
      </Stack>

      <Typography marginBottom={'1rem'}>
        Stránky jsem vytvořil z typicky programátorského důvodu:
      </Typography>
      <Typography
        variant="body2"
        marginBottom={'1rem'}
        paddingLeft={'2rem'}
        sx={{ fontWeight: 'bold' }}
      >
        Spousta řešení, žádné neřeší 100% mých problémů.
      </Typography>

      <Typography marginBottom={'1rem'}>
        Primárně dělané pro Android Chrome.
        <br /> Případné problémy mi prosím oznamte, zkusím vyřešit.
        <br /> Možným zlepšovákům se taky nebráním. 🙂
      </Typography>

      <Typography marginBottom={'1rem'} color="info">
        Nevlastním žádnou píseň, kterou zde můžete najít. Vlastnictví písní
        náleží příslušným autorům, distributorům či jiným právoplatným
        vlastníkům.
      </Typography>

      <Typography color="error" marginBottom={'1rem'}>
        STRÁNKY NEJSOU URČENĚ PRO VÝDĚLEK. <br />
        Ani můj či náš. Ani tvůj či váš.
      </Typography>
      <Typography marginBottom={'1rem'}>
        Jsou zamýšlené jako zpěvník pro bezstarostnou zábavu mou a mého okolí.
      </Typography>
      <Typography marginBottom={'0.5rem'}>
        Nuže nechť hudba hraje a zpěv zní!
      </Typography>
      <Typography variant="h5" marginBottom={'1rem'} textAlign={'end'}>
        .fm97
      </Typography>

      <Button
        sx={{ marginBottom: '3rem' }}
        variant="outlined"
        fullWidth
        onClick={() => navigate(RoutesEnum.SONG_LIST, { viewTransition: true })}
      >
        Přejít na písně
      </Button>
    </Stack>
  );
};

export default InfoView;
