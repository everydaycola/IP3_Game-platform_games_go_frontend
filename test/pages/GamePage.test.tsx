import {beforeEach, describe, expect, it, vi} from "vitest";
import {render, screen, waitFor} from "@testing-library/react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {MemoryRouter, Route, Routes} from "react-router-dom";
import {testBoard, testBoardLarge, testBoardMedium} from "../data/testGameBoardStates";
import {GamePage} from "../../src/pages/GamePage";
import "@testing-library/jest-dom/vitest";

const mockUseStartNewGame = vi.fn();
const mockUseGameBoard = vi.fn();
vi.mock("../../src/hooks/useStartNewGame.ts", () => {
    return {
        useStartNewGame: () => mockUseStartNewGame(),
    };
});
vi.mock("../../src/hooks/useGameBoard.ts", () => {
    return {
        useGameBoard: () => mockUseGameBoard(),
    };
});

describe("GamePage", () => {
    beforeEach(() => {
        // arrange
        mockUseStartNewGame.mockReturnValue({
            createGame: vi.fn(),
            newGame: testBoard,
            isPending: false,
            isError: false,
        });
        mockUseGameBoard.mockReturnValue({
            gameState: testBoard,
            isGamePending: false,
            isError: false,
        });
    });

    it.each([9, 13, 19])("Correctly renders page when a %ix%i grid is provided.", async (size) => {
        // Arrange
        const queryClient = new QueryClient();

        // Make sure mocks return a board matching the requested size for this test case
        const boardBySize = {
            9: testBoard,
            13: testBoardMedium,
            19: testBoardLarge,
        } as const;

        const selected = boardBySize[size as 9 | 13 | 19];

        mockUseStartNewGame.mockReturnValueOnce({
            createGame: vi.fn(),
            newGame: selected,
            isPending: false,
            isError: false,
        });
        mockUseGameBoard.mockReturnValueOnce({
            gameState: selected,
            isGamePending: false,
            isError: false,
        });

        // Act
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={[`/game/${size}`]}>
                    <Routes>
                        <Route path="/game/:size" element={<GamePage />} />
                    </Routes>
                </MemoryRouter>
            </QueryClientProvider>
        );

        // Assert
        await waitFor(() => {
            const pieces = screen.getAllByTestId("go-game-board-piece");
            expect(pieces.length).toBe(size * size);
        });
    });

    it("renders ErrorCard when a non-existent size is requested", () => {
        //Arrange
        const queryClient = new QueryClient();
        const invalidSize = 17;

        //Act
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={[`/game/${invalidSize}`]}>
                    <Routes>
                        <Route path="/game/:size" element={<GamePage />} />
                    </Routes>
                </MemoryRouter>
            </QueryClientProvider>
        );

        //Assert
        expect(screen.getByText(/Oeps\?!/i)).toBeInTheDocument();
        expect(
            screen.getByText(`${invalidSize} is geen geldig spelformaat...`)
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: /Naar het startmenu/i })
        ).toBeInTheDocument();
    });

});