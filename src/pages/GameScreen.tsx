import {Stack, Typography, Button} from "@mui/material";

export function WelcomeScreen(){
    return (
        <Stack justifyContent={"center"} alignItems={"center"} sx={{height:"100svh"}}>
            <Typography variant={"h2"}>
                Welcome to Go!
            </Typography>
            <Button
                variant={"contained"}
                sx={{mt:2}}
            >
                Start a game
            </Button>
        </Stack>
    )
}