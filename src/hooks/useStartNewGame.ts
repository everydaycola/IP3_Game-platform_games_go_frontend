import {useMutation, useQueryClient} from "@tanstack/react-query";
import {gameQueryKeys} from "../config/api/querykeys";
import type {MatchRequest} from "../models/MatchRequest.ts";
import {startGameWithAi} from "../services/gameService.ts";
import type {GameState} from "../models/GameState.ts";
import {useCurrentPlayerSessionStore} from "../store/gameStore.ts";


export function useStartNewGame(){
    const queryClient = useQueryClient();
    const updateCurrentGameId = useCurrentPlayerSessionStore((state) => state.updateCurrentGameId)

    const{mutate,isPending,isError,data: newGame} = useMutation(
        {
            mutationFn: async(request: MatchRequest) => {
                return startGameWithAi(request);
            },
            onSuccess:(gameBoard: GameState) => {
                updateCurrentGameId(gameBoard.id);
                queryClient.invalidateQueries({queryKey: gameQueryKeys.current});
            }
        }
    )

    return {
        isPending: isPending,
        isError: isError,
        createGame: mutate,
        newGame
    };
}