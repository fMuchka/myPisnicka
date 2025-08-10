import { Button, Typography } from '@mui/material';

const InfoView = () => {
  return (
    <>
      <Typography variant="h5">My Písnička</Typography>
      <Typography variant="subtitle1" marginBottom={'2rem'}>
        Můj zpěvník pro naši zábavu
      </Typography>
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
        Vytvořené primárně pro mobily a tablety. Konkrétně pro <b>Android</b>.
        Nejsem jablíčkář a vyvíjet na <b>Apple</b> je "sranda". Pokud něco v
        <b> Safari</b> nefunguje, snad to bude fungovat v <b>Chromu</b>.
        <br /> Případné problémy mi prosím oznamte, zkusím vyřešit.
        <br /> Možným zlepšovákům se taky nebráním, ale dělat kafe to učit
        nebudu.
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
        href="/my-pisnicka/ListView"
      >
        Přejít na písně
      </Button>
    </>
  );
};

export default InfoView;
