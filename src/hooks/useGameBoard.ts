import {useQuery} from "@tanstack/react-query";
import {gameQueryKeys} from "../config/api/querykeys";
import {useCurrentPlayerSessionStore} from "../store/gameStore.ts";
import {getGame} from "../services/gameService.ts";

export function useGameBoard() {
    const currentGameId = useCurrentPlayerSessionStore((state) => state.currentGameId);

    const {data: gameState, isError, isPending} = useQuery({
        queryKey: gameQueryKeys.currentWithGameId(currentGameId!),
        queryFn: () => getGame(currentGameId),
        enabled: !!currentGameId,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
    });

    return {
        isError,
        isGamePending: isPending,
        gameState,
    };
}