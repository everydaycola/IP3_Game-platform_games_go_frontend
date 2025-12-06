import {Stack} from "@mui/material";
import {GoGameBoardPiece} from "./GoGameBoardPiece.tsx";
import type {GoGameBoardResponse} from "../../models/GoGameBoardResponse.ts";

interface GameBoardProps {
    board: GoGameBoardResponse;
}

export function GameBoard({board}: GameBoardProps) {
    const pieceSize = 60;
    return (
        <>
            <Stack direction="row"
                   spacing={0}>
                {board.board.map((col, colIdx) => (
                    <Stack
                        key={"gameboardCol" + colIdx}
                        direction="column"
                        spacing={0}
                        alignItems="center">
                        {col.map((cell, rowIdx) => (
                            <GoGameBoardPiece
                                key={"cell-" + colIdx + "-" + rowIdx}
                                pieceSize={pieceSize}
                                stoneVisible={cell != "_"}
                                stoneColor={cell === "B" ?"black" : "white"}
                                topVisible={rowIdx != 0}
                                bottomVisible={rowIdx != board.board.length - 1}
                                leftVisible={colIdx != 0}
                                rightVisible={colIdx !== board.board[0].length - 1}
                            />
                        ))}
                    </Stack>
                ))}
            </Stack>
        </>
    )
}