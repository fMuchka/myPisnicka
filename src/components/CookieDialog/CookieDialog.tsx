import { Box, Button, Card, Stack, Typography } from "@mui/material"
import {Cookie} from '@mui/icons-material';
import type { CookieDialogProps } from "./types";
import { CookieAcceptState } from "../../enums";

const CookieDialog = (props: CookieDialogProps) => {

    if (props.cookieAcceptState !== CookieAcceptState.NONE) {
        return <></>
    }

    return (
        <Box
            sx={{
                position: "fixed",
                top: 0,
                width: "100%",
                height: "100%",
                margin: 0,
                backgroundColor: "#0c0c0cb0"
            }}
        >
            <Card
                elevation={10}
                sx={{
                    position: "fixed",
                    bottom: 0,
                    width: "100%",
                    margin: 0,
                    p: 3
                }}
            >
                <Typography variant="h6" color="primary" sx={{ display: "flex", alignItems: "center", placeSelf: "center" }}>
                    Nabízím ti sušenky
                    <Cookie sx={{ marginLeft: "5px" }} color="primary" />
                </Typography>
                <Typography>
                    Tato stránka si umí uložit tyto údaje pro tvé budoucí uživání:
                </Typography>
                    <ul>
                        <li>barva</li>
                        <li>barevné schéma</li>
                        <li>velikost písma</li>
                        <li>rychlost posunu</li>
                    </ul>
                <Typography>
                    Nepracuji s žádnou reklamou, analytikou či jinými.
                </Typography>
                <Typography>Chceš moje sušenky?</Typography>
                <Stack direction={"row"} spacing={5} alignContent={"center"} justifyContent={"center"} sx={{marginTop: "10px"}}>
                    <Button color="error" variant="outlined" onClick={() => props.setCookieAcceptState(CookieAcceptState.DECLINED)}>Nesouhlasím</Button>
                    <Button color="success" variant="outlined" onClick={() => props.setCookieAcceptState(CookieAcceptState.ACCEPTED)}>Souhlasím</Button>
                </Stack>
            </Card>
        </Box>
    )
}

export default CookieDialog;