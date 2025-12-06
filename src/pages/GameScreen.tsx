import {Stack} from "@mui/material";
import {GameBoard} from "../components/gameboard/GameBoard.tsx";
import { useParams } from "react-router-dom";
import {useStartNewGame} from "../hooks/useStartNewGame.ts";
import {useEffect} from "react";


export function GameScreen(){
    const {size} = useParams();
    const {createGame,newGame,isPending, isError} = useStartNewGame();

    useEffect(() => {
        //useffect to handle init load of this page.
        createGame({size:Number(size)});
    }, []);

    if(isPending){
        return(<div>Loading...</div>)
    }

    if(isError || !newGame){
        return(<div>Error!</div>)
    }

    return (
        <Stack justifyContent={"center"} alignItems={"center"} sx={{height:"100svh"}}>
            <GameBoard
                board={newGame}
            />
        </Stack>
    )
}