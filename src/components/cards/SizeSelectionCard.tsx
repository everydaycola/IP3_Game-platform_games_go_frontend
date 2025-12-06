import {Card, CardContent, CardMedia, Typography, Chip} from "@mui/material";

interface SizeSelectionCardProps{
    size:number;
}

export function SizeSelectionCard({size}:SizeSelectionCardProps){
    return(
        <Card
            sx={{
                height: 300,
                width:300,
                display: "flex",
                flexDirection: "column",
                mt: 4,
                m:2,
                cursor:"pointer"
            }}
            onClick={() => {console.log("size card clicked")}}
        >
            <CardMedia
                //Colors mapping should be removed from this in the future its just for testing purposes right now.
                sx={{height: "80%", background:"white", color:"black", position:"relative"}}
            >
                <Chip label="Difficulty" color={"secondary"}
                      sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            zIndex: 1,
                        }}
                />
                <Typography>Gameboard will be rendered here once the component is a thing.</Typography>
            </CardMedia>
            <CardContent sx={{
                height: "20%",
                display:"flex",
                justifyContent:"center"
            }}>
                <Typography variant={"h6"}>
                    {size}x{size}
                </Typography>
            </CardContent>
        </Card>
    )
}