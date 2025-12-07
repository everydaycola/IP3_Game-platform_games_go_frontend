import {describe, expect, it,vi} from "vitest";
import {render, screen, waitFor} from "@testing-library/react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {MemoryRouter, Route, Routes } from "react-router-dom";
import {testBoard, testBoardLarge, testBoardMedium} from "../data/testGameBoardStates";
import {GamePage} from "../../src/pages/GamePage";
import "@testing-library/jest-dom/vitest";

const mockUseStartNewGame = vi.fn();
vi.mock("../../src/hooks/useStartNewGame.ts", () => {
    return {
        useStartNewGame: () => mockUseStartNewGame(),
    };
});

describe("GamePage", () => {
    it("Correctly renders page when a 9x9 grid is provided.", async () => {
        // Arrange
        mockUseStartNewGame.mockReturnValue({
            createGame: vi.fn(),
            newGame: testBoard,
            isPending: false,
            isError: false,
        });

        const queryClient = new QueryClient();
        // Act
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={["/game/9"]}>
                    <Routes>
                        <Route path="/game/:size" element={<GamePage />} />
                    </Routes>
                </MemoryRouter>
            </QueryClientProvider>
        );

        // Assert
        // Wait for the GoGameBoardPieces to appear
        await waitFor(() => {
            const pieces = screen.getAllByTestId("go-game-board-piece");
            expect(pieces.length).toBe(9 * 9);
        });
    });

    it("Correctly renders page when a 13x13 grid is provided.", async () => {
        // Arrange
        mockUseStartNewGame.mockReturnValue({
            createGame: vi.fn(),
            newGame: testBoardMedium,
            isPending: false,
            isError: false,
        });

        const queryClient = new QueryClient();
        // Act
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={["/game/13"]}>
                    <Routes>
                        <Route path="/game/:size" element={<GamePage />} />
                    </Routes>
                </MemoryRouter>
            </QueryClientProvider>
        );

        // Assert
        // Wait for the GoGameBoardPieces to appear
        await waitFor(() => {
            const pieces = screen.getAllByTestId("go-game-board-piece");
            expect(pieces.length).toBe(13 * 13);
        });
    });

    it("Correctly renders page when a 19x19 grid is provided.", async () => {
        // Arrange
        mockUseStartNewGame.mockReturnValue({
            createGame: vi.fn(),
            newGame: testBoardLarge,
            isPending: false,
            isError: false,
        });

        const queryClient = new QueryClient();
        // Act
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={["/game/19"]}>
                    <Routes>
                        <Route path="/game/:size" element={<GamePage />} />
                    </Routes>
                </MemoryRouter>
            </QueryClientProvider>
        );

        // Assert
        // Wait for the GoGameBoardPieces to appear
        await waitFor(() => {
            const pieces = screen.getAllByTestId("go-game-board-piece");
            expect(pieces.length).toBe(19 * 19);
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