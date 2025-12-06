import {theme} from "./config/theme/theme.ts";
import {queryClient} from "./config/api";
import {QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {CssBaseline, ThemeProvider} from '@mui/material';
import {WelcomeScreen} from "./pages/WelcomeScreen.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {GameScreen} from "./pages/GameScreen.tsx";
import SecurityContextProvider from "./context/SecurityContextProvider.tsx";
import {RouteGuard} from "./components/RouteGuard.tsx";

function App() {

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <CssBaseline/>
                <SecurityContextProvider>
                <ThemeProvider theme={theme}>
                    <BrowserRouter basename="/gamehosts/go">
                        <Routes>
                            <Route path={"/"} element={<RouteGuard><WelcomeScreen/></RouteGuard>}/>
                            <Route path={"/game/:size"} element={<GameScreen/>}/>
                        </Routes>
                    </BrowserRouter>
                </ThemeProvider>
                </SecurityContextProvider>
                <ReactQueryDevtools initialIsOpen={false}/>
            </QueryClientProvider>
        </>
    )
}

export default App
