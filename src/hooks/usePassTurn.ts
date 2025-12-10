import {useMutation, useQueryClient} from "@tanstack/react-query";
import type {GameState} from "../models/GameState.ts";
import {gameQueryKeys} from "../config/api/querykeys";
import {passTurn} from "../services/gameService.ts";

export function usePassTurn() {
    const queryClient = useQueryClient();
    const {mutate, isPending, isError} = useMutation({
        mutationFn: (gameId: string) => passTurn(gameId),
        onSuccess: (gameState: GameState) => {
            queryClient.invalidateQueries({ queryKey: gameQueryKeys.currentWithGameId(gameState.id)});
        },
    })

    return {
        requestPassTurn: mutate,
        isPending,
        isError
    }
}