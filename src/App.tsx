import {theme} from "./config/theme/theme.ts";
import {queryClient} from "./config/api";
import {QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {CssBaseline, ThemeProvider} from '@mui/material';
import {WelcomeScreen} from "./pages/WelcomeScreen.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {GameScreen} from "./pages/GameScreen.tsx";

function App() {

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <CssBaseline/>
                <ThemeProvider theme={theme}>
                    <BrowserRouter basename="/gamehosts/go">
                        <Routes>
                            <Route path={"/"} element={<WelcomeScreen/>}/>
                            <Route path={"/game/:size"} element={<GameScreen/>}/>
                        </Routes>
                    </BrowserRouter>
                </ThemeProvider>
                <ReactQueryDevtools initialIsOpen={false}/>
            </QueryClientProvider>
        </>
    )
}

export default App
