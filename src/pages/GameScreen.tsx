import {Stack} from "@mui/material";
import {GameBoard} from "../components/gameboard/GameBoard.tsx";
import {useParams} from "react-router-dom";
import {testBoard} from "../config/TESTDATA_TO_BE_REMOVED.ts";

export function GameScreen(){
    const {size} = useParams();
    if(!size){
        throw new Error("No size found...");
    }

    return (
        <Stack justifyContent={"center"} alignItems={"center"} sx={{height:"100svh"}}>
            <GameBoard  board={testBoard}/>
        </Stack>
    )
}