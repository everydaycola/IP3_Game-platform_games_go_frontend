import {Stack} from "@mui/material";
import {GameBoard} from "../components/gameboard/GameBoard.tsx";
import { testBoardLarge} from "../config/TESTDATA_TO_BE_REMOVED.ts";


export function GameScreen(){
    return (
        <Stack justifyContent={"center"} alignItems={"center"} sx={{height:"100svh"}}>
            <GameBoard
                board={testBoardLarge}
            />
        </Stack>
    )
}