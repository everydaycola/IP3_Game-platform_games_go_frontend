import {theme} from "./config/theme/theme.ts";
import {queryClient} from "./config/api";
import {QueryClientProvider} from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {CssBaseline, ThemeProvider} from '@mui/material';
import {WelcomeScreen} from "./pages/WelcomeScreen.tsx";

function App() {

  return (
    <>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <WelcomeScreen/>
                <CssBaseline/>
            </ThemeProvider>
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    </>
  )
}

export default App
