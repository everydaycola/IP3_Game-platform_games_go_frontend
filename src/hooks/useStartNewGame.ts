import {useMutation, useQueryClient} from "@tanstack/react-query";
import {gameQueryKeys} from "../config/api/querykeys";
import type {MatchRequestAi} from "../models/MatchRequestAi.ts";
import {startGameWithAi} from "../services/gameService.ts";
import type {GoGameBoardResponse} from "../models/GoGameBoardResponse.ts";
import {useCurrentPlayerSessionStore} from "../store/gameStore.ts";


export function useStartNewGame(){
    const queryClient = useQueryClient();
    const updateCurrentGameId = useCurrentPlayerSessionStore((state) => state.updateCurrentGameId)

    const{mutate,isPending,isError,data: newGame} = useMutation(
        {
            mutationFn: async(request: MatchRequestAi) => {
                return startGameWithAi(request);
            },
            onSuccess:(gameBoard: GoGameBoardResponse) => {
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
