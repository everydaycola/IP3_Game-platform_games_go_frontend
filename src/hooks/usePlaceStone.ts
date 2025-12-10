import {useMutation, useQueryClient} from "@tanstack/react-query";
import type {MoveRequest} from "../models/MoveRequest.ts";
import {makeMove} from "../services/gameService.ts";
import type {GameState} from "../models/GameState.ts";
import {gameQueryKeys} from "../config/api/querykeys";

interface MoveVariables{
    gameId: string;
    moveRequest: MoveRequest;
}

export function usePlaceStone() {
    const queryClient = useQueryClient();

    const { mutate, isPending, isError } = useMutation({
        mutationFn: async ({ gameId, moveRequest }: MoveVariables) => {
            return makeMove(gameId, moveRequest);
        },
        onSuccess: (gameState: GameState) => {
            queryClient.invalidateQueries({ queryKey:gameQueryKeys.currentWithGameId(gameState.id) });
        },
    });

    return {
        isPending,
        isError,
        requestMove: mutate,
    };
}