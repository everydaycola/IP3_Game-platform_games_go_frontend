import {Button, Paper, Stack, Typography} from "@mui/material";

interface VictoryCardProps {
    winner: string,
    score: number,
    onClick: () => void,
    disabled: boolean
}

export function VictoryCard(
    {
        winner,
        score,
        onClick,
        disabled
    }: VictoryCardProps)
{
    return <Paper elevation={4} sx={{p: 2}}>
        <Stack spacing={1}>
            <Typography variant="h5">Winner</Typography>
            <Typography variant="h6">{winner}</Typography>
            <Typography variant="body1">Score: {score}</Typography>
            <Button variant="contained" onClick={onClick} disabled={disabled}>
                Play again
            </Button>
        </Stack>
    </Paper>;
}