import {describe, expect, it,vi} from "vitest";
import {fireEvent, render, screen} from "@testing-library/react";
import {WelcomePage} from "../../src/pages/WelcomePage";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {MemoryRouter, Route, Routes } from "react-router-dom";

vi.mock('axios')

describe("WelcomePage", () => {
    it("shows welcome content initially", () => {
        //Arrange
        const queryClient = new QueryClient();
        //Act
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={[`/`]}>
                    <Routes>
                        <Route path="/" element={<WelcomePage/>}/>
                    </Routes>
                </MemoryRouter>
            </QueryClientProvider>
        );

        //Assert
        expect(screen.getByText("Welcome to Go!")).toBeInTheDocument();
        expect(screen.getByRole("button")).toBeInTheDocument();
        expect(screen.queryByText("Size selector")).not.toBeInTheDocument();
    });

    it("shows SizeSelector after clicking Start a game", () => {
        //Arrange
        const queryClient = new QueryClient();
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={[`/`]}>
                    <Routes>
                        <Route path="/" element={<WelcomePage/>}/>
                    </Routes>
                </MemoryRouter>
            </QueryClientProvider>
        );

        //Act
        const startButton = screen.getByRole("button", { name: /start a game/i });
        fireEvent.click(startButton);

        //Assert
        expect(screen.queryByText("Welcome to Go!")).not.toBeInTheDocument();
        expect(screen.queryByText("Select a board size")).toBeInTheDocument();
    });

    it("calls onBack and returns to welcome when Back is clicked", () => {
        //Arrange
        const queryClient = new QueryClient();
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={[`/`]}>
                    <Routes>
                        <Route path="/" element={<WelcomePage/>}/>
                    </Routes>
                </MemoryRouter>
            </QueryClientProvider>
        );
        fireEvent.click(screen.getByRole("button", { name: /start a game/i }));
        expect(screen.getByText("Select a board size")).toBeInTheDocument();

        //Act
        fireEvent.click(screen.getByRole("button", { name: /back/i }));

        // Assert
        expect(screen.getByText("Welcome to Go!")).toBeInTheDocument();
        expect(screen.queryByText("Select a board size")).not.toBeInTheDocument();
    });
});