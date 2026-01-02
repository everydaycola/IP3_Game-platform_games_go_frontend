import {Button, Stack, Typography} from "@mui/material";
import {useState} from "react";
import {SizeSelector} from "../components/SizeSelector.tsx";
import {useGameBoard} from "../hooks/useGameBoard.ts";
import {useNavigate} from "react-router-dom";

export function WelcomePage() {
    const {gameState, isGamePending} = useGameBoard();
    const navigate = useNavigate();
    const [isSelectingSize, setIsSelectingSize] = useState(false);
    const sizes = [9,13,19];

    if(isGamePending){
        return <div>Loading...</div>
    }

    if(gameState != null){
        navigate(`/game/${gameState.size}`)
    }

    return (
        <>
            {!isSelectingSize &&
                <Stack justifyContent={"center"}
                       alignItems={"center"}
                       sx={{height: "100svh"}}>
                    <Typography variant={"h2"}>
                        Welcome to Go!
                    </Typography>
                    <Button
                        variant={"contained"}
                        sx={{mt: 2}}
                        onClick={() => setIsSelectingSize(true)}
                    >
                        Start a game
                    </Button>
                </Stack>
            }

            {isSelectingSize &&
                <SizeSelector
                    onBack={() => setIsSelectingSize(false)}
                    sizes={sizes}
                />
            }
        </>
    )
}