import {useQuery} from "@tanstack/react-query";
import {gameQueryKeys} from "../config/api/querykeys";
import {getOngoingGame} from "../services/gameService.ts";
import {refetchInterval} from "../config/realtime";

export function useGameBoard() {
    const {data: gameState, isError, isPending} = useQuery({
        queryKey: gameQueryKeys.current,
        queryFn: () => getOngoingGame(),
        refetchInterval:refetchInterval
    });

    return {
        isError,
        isGamePending: isPending,
        gameState,
    };
}