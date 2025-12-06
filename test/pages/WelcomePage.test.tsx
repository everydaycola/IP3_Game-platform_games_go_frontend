import {describe, expect, it,vi} from "vitest";
import {fireEvent, render, screen} from "@testing-library/react";
import {WelcomeScreen} from "../../src/pages/WelcomeScreen";

vi.mock('axios')


describe("WelcomeScreen", () => {
    it("shows welcome content initially", () => {
        //Arrange
        //Act
        render(<WelcomeScreen />);
        //Assert
        expect(screen.getByText("Games")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /start a game/i })).toBeInTheDocument();
        expect(screen.queryByText("Size selector")).not.toBeInTheDocument();
    });

    it("shows SizeSelector after clicking Start a game", () => {
        render(<WelcomeScreen />);

        const startButton = screen.getByRole("button", { name: /start a game/i });
        fireEvent.click(startButton);

        expect(screen.queryByText("Welcome to Go!")).not.toBeInTheDocument();
        expect(screen.getByText("Size selector")).toBeInTheDocument();
    });

    it("calls onBack and returns to welcome when Back is clicked", () => {
        render(<WelcomeScreen />);

        // go to size selection
        fireEvent.click(screen.getByRole("button", { name: /start a game/i }));
        expect(screen.getByText("Size selector")).toBeInTheDocument();

        // trigger onBack from mocked SizeSelector
        fireEvent.click(screen.getByRole("button", { name: /back/i }));

        expect(screen.getByText("Welcome to Go!")).toBeInTheDocument();
        expect(screen.queryByText("Size selector")).not.toBeInTheDocument();
    });
});