import {Button, CircularProgress, Paper, Stack, Typography} from "@mui/material";

interface TurnCardProps {
    atTurn: boolean,
    aiPending: boolean,
    size: number,
    id: string,
    onClick: () => void,
    passPending: boolean,
    isLastTurnPassed: boolean
}

export function TurnCard(
    {
        atTurn,
        aiPending,
        size,
        id,
        onClick,
        passPending,
        isLastTurnPassed
    }: TurnCardProps) {
    return <Paper elevation={3} sx={{p: 2}}>
        <Stack spacing={1}>
            {atTurn ? (
                <Stack spacing={0.5}>
                    <Typography variant="h6" color="success.main">Your turn</Typography>
                    {isLastTurnPassed && (
                        <Typography variant="caption" color="info.main">
                            Opponent passed their turn
                        </Typography>
                    )}
                </Stack>
            ) : (
                <Stack direction="row" spacing={1} alignItems="center">
                    {aiPending && <CircularProgress size={20}/>}
                    <Typography variant="h6">AI is thinking…</Typography>
                </Stack>
            )}
            <Typography variant="body2">{size}x{size} - game: {id}</Typography>
            <Stack direction="row" spacing={1}>
                <Button
                    variant="contained"
                    onClick={onClick}
                    disabled={!atTurn || passPending || aiPending}
                >
                    Pass
                </Button>
            </Stack>
        </Stack>
    </Paper>;
}