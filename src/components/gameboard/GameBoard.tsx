import {Box, Button, CircularProgress, Paper, Stack, Typography} from "@mui/material";
import {GoGameBoardPiece} from "./GoGameBoardPiece.tsx";
import type {GameState} from "../../models/GameState.ts";
import {usePlaceStone} from "../../hooks/usePlaceStone.ts";
import {useEffect} from "react";
import {useAiMove} from "../../hooks/useAiMove.ts";
import {usePassTurn} from "../../hooks/usePassTurn.ts";
import {useStartNewGame} from "../../hooks/useStartNewGame.ts";

interface GameBoardProps {
    board: GameState;
}

export function GameBoard({board}: GameBoardProps) {
    const {createGame, isPending: isRestarting} = useStartNewGame();
    const {requestMove, isPending: isPlacing} = usePlaceStone()
    const {requestAiMove, isPending: isAiPending} = useAiMove()
    const {requestPassTurn, isPending: isPassPending} = usePassTurn()

    useEffect(() => {
        if (!board?.atTurn && board) {
            console.log("Using the AI player.");
            requestAiMove(board.id);
        }
    }, [board, requestAiMove]);

    const handleRetry = () => {
        createGame({ size: board.size });
    };

    const isInteractingDisabled = !board.atTurn || isAiPending || isPlacing || isPassPending || isRestarting;

    return (
        <Stack direction="row" spacing={2} alignItems="flex-start">
            <Stack direction="row" spacing={0}>
                {board.board.map((col, colIdx) => (
                    <Stack
                        key={"gameboardCol" + colIdx}
                        direction="column"
                        spacing={0}
                        alignItems="center">
                        {col.map((cell, rowIdx) => (
                            <GoGameBoardPiece
                                onClick={() => {
                                    if (!isInteractingDisabled) {
                                        requestMove({gameId: board.id, moveRequest: {x: colIdx, y: rowIdx}})
                                    }
                                }}
                                key={"cell-" + colIdx + "-" + rowIdx}
                                pieceSize={board.size === 19 ? 50 : 60}
                                stoneVisible={cell != "_"}
                                stoneColor={cell === "B" ? "black" : "white"}
                                topVisible={rowIdx != 0}
                                bottomVisible={rowIdx != board.size - 1}
                                leftVisible={colIdx != 0}
                                rightVisible={colIdx !== board.size - 1}
                            />
                        ))}
                    </Stack>
                ))}
            </Stack>

            <Box sx={{minWidth: 260}}>
                {board.winner.toLowerCase() === "empty" ? (
                    <Paper elevation={3} sx={{p: 2}}>
                        <Stack spacing={1}>
                            {board.atTurn ? (
                                <Typography variant="h6" color="success.main">Your turn</Typography>
                            ) : (
                                <Stack direction="row" spacing={1} alignItems="center">
                                    {isAiPending && <CircularProgress size={20}/>}
                                    <Typography variant="h6">AI is thinking…</Typography>
                                </Stack>
                            )}
                            <Typography variant="body2">Game ID: {board.id}</Typography>
                            <Stack direction="row" spacing={1}>
                                <Button
                                    variant="contained"
                                    onClick={() => requestPassTurn(board.id)}
                                    disabled={!board.atTurn || isPassPending || isAiPending}
                                >
                                    Pass
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={handleRetry}
                                    disabled={isRestarting}
                                >
                                    Retry
                                </Button>
                            </Stack>
                        </Stack>
                    </Paper>
                ) : (
                    <Paper elevation={4} sx={{p: 2}}>
                        <Stack spacing={1}>
                            <Typography variant="h5">Winner</Typography>
                            <Typography variant="h6">{board.winner}</Typography>
                            <Typography variant="body1">Score: {board.score}</Typography>
                            <Button variant="contained" onClick={handleRetry} disabled={isRestarting}>
                                Play again
                            </Button>
                        </Stack>
                    </Paper>
                )}
            </Box>
        </Stack>
    )
}