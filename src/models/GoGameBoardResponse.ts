type validSymbols = "_" | "W" |"B";

export interface GoGameBoardResponse{
    id:string;
    board:validSymbols[][];
    size:number;
}