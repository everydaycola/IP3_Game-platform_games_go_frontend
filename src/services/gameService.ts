import type {MatchRequestAi} from "../models/MatchRequestAi.ts";
import axios from "axios";
import type {GoGameBoardResponse} from "../models/GoGameBoardResponse.ts";


export async function startGameWithAi(data: MatchRequestAi) {
    const {data: newGame} = await axios.post<GoGameBoardResponse>('/matches', data)
    return newGame
}