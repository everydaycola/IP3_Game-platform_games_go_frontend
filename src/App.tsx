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
import {FallbackWrapper} from "./components/FallbackWrapper.tsx";
import {ErrorCard} from "./components/ErrorCard.tsx";
import {WelcomePageFallback} from "./pages/fallbacks/WelcomePageFallback.tsx";
import {GamePageLoadingFallback} from "./pages/fallbacks/GamePageLoadingFallback.tsx";

function App() {

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <CssBaseline/>
                <SecurityContextProvider>
                <ThemeProvider theme={theme}>
                    <BrowserRouter basename="/gamehosts/go">
                        <Routes>
                            <Route path={"/"} element={
                                <RouteGuard>
                                    <FallbackWrapper
                                        loadingFallback={<WelcomePageFallback/>}
                                        errorFallback={<ErrorCard title={"Er ging iets mis"} description={"Probeer het nog een keer."}/>}
                                    >
                                        <WelcomeScreen/>
                                    </FallbackWrapper>
                                </RouteGuard>
                            }/>
                            <Route path={"/game/:size"} element={
                                <RouteGuard>
                                <FallbackWrapper
                                    loadingFallback={<GamePageLoadingFallback/>}
                                       errorFallback={<ErrorCard title={"Er ging iets mis"} description={"Probeer het nog een keer."}/>}
                                >
                                    <GameScreen/>
                                </FallbackWrapper>
                            </RouteGuard>

                            }/>
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
