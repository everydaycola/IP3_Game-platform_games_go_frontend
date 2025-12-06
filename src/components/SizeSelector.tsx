import {Button, Stack, Typography} from "@mui/material";
import {SizeSelectionCard} from "./cards/SizeSelectionCard.tsx";

interface SizeSelectorProps{
    sizes:number[]
}

export function SizeSelector({sizes}:SizeSelectorProps){
    return(
        <>
            <Stack
                sx={{p: 4}}
            >
                <Stack direction={"row"}>
                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{mr: 4, width: 100}}
                    >
                        Back
                    </Button>
                    <Typography variant={"h2"}>
                        Select a board size
                    </Typography>
                </Stack>

                <Stack sx={{mt:4}} direction={"row"} justifyContent={"center"} flexWrap={"nowrap"}>
                    {sizes.map((size) =>
                        <SizeSelectionCard
                            size={size}
                        />
                    )}
                </Stack>

            </Stack>
        </>
    )
}