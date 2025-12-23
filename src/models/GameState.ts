export type GameState = {
    id: string;
    board: string[][];
    size: number;
    winner: string;
    score: number;
    atTurn: boolean;
    isLastTurnPassed: boolean;
}