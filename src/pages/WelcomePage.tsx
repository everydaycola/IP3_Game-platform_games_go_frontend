import {Stack, Typography, Button} from "@mui/material";
import {useState} from "react";
import {SizeSelector} from "../components/SizeSelector.tsx";

export function WelcomePage() {
    const [isSelectingSize, setIsSelectingSize] = useState(false);
    const sizes = [9,13,19];

    return (
        <>
            {!isSelectingSize &&
                <Stack justifyContent={"center"}
                       alignItems={"center"}
                       sx={{height: "100svh"}}>
                    <Typography variant={"h2"}>
                        Welcome to Go!
                    </Typography>
                    <Button
                        variant={"contained"}
                        sx={{mt: 2}}
                        onClick={() => setIsSelectingSize(true)}
                    >
                        Start a game
                    </Button>
                </Stack>
            }

            {isSelectingSize &&
                <SizeSelector
                    onBack={() => setIsSelectingSize(false)}
                    sizes={sizes}
                />
            }
        </>
    )
}