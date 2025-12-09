import type {MatchRequestAi} from "../models/MatchRequestAi.ts";
import axios from "axios";
import type {GameState} from "../models/GameState.ts";

async function getOngoingGame() {
    try {
        const {data} = await axios.get<GameState>(`/matches/playing`)
        return data as GameState;
    }catch (err) {
        //If it's 404, it's not an error its just that there is no active game going on.
        if (axios.isAxiosError(err) && err.response?.status === 404) {
            return null;
        }
        throw err;
    }
}

export async function startGameWithAi(data: MatchRequestAi) {
    const ongoingGame = await getOngoingGame();
    if (ongoingGame === null) {
        const {data: newGame} = await axios.post<GameState>('/matches', data)
        return newGame
    }
    return ongoingGame;
}

// export async function getGame(gameId: string) {
//     if (gameId === null) {
//         return null;
//     }
//     const {data: gameboard} = await axios.get<GameState>(`/matches/${gameId}`)
//     return gameboard;
// }