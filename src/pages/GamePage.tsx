import {Stack} from "@mui/material";
import {useParams} from "react-router-dom";

import {useEffect} from "react";
import {useStartNewGame} from "../hooks/useStartNewGame.ts";
import {allowedSizes} from "../config/game/config.ts";
import {GameBoard} from "../components/gameboard/GameBoard.tsx";
import {ErrorCard} from "../components/ErrorCard.tsx";


export function GamePage() {
    const {size} = useParams();
    const {createGame, newGame, isPending, isError} = useStartNewGame();


    useEffect(() => {
        //useffect to handle init load of this page.
        if (allowedSizes.includes(Number(size))) {
            createGame({size: Number(size)});
        }
    }, []);

    if (!allowedSizes.includes(Number(size))) {
        return (<ErrorCard title={`Oeps?!`}
                           description={`${size} is geen geldig spelformaat...`}
                           renderBackToHomeButton={true}/>)
    }

    if (isPending) {
        return (<div>Loading...</div>)
    }

    if (isError || !newGame) {
        return (<div>Error!</div>)
    }

    return (
        <Stack justifyContent={"center"}
               alignItems={"center"}
               sx={{height: "100svh"}}>
            <GameBoard
                board={newGame}
            />
        </Stack>
    )
}