import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import aiImg from "@/assets/AI.jpg";
import { useRouter } from "next/router";

export default function Post({ data }) {
  const router = useRouter();
  return (
    <Card
      sx={{
        //maxWidth: 345,
        marginTop: "20px",
        borderRadius: "10px",
        overflow: "hidden",
        border: "1px solid #d4d4e3",
        backgroundColor: "#fdf9ff",
        height: "350px",
        position: "relative",
      }}
      onClick={() => router.push("/posts/" + data.id)}
    >
      <CardMedia
        sx={{ height: 210, position: "relative", overflow: "hidden" }}
        image={data.imageUrl}
        title="green iguana"
      >
        <Typography
          component="p"
          sx={{
            position: "absolute",
            padding: "4px 10px",
            borderRadius: "5px",
            color: "#ffffff",
            fontWeight: "600",
            fontSize: "14px",
            left: "15px",
            bottom: "15px",
            backgroundColor: "var(--main-color)",
          }}
        >
          {new Date(data.date).toLocaleString("en-US", { dateStyle: "medium" })}
        </Typography>
      </CardMedia>
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            fontSize: "18px",
            fontWeight: "700",
            color: "#302e4d",
            textTransform: "capitalize",
            marginBottom: "10px",
          }}
        >
          {data.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontSize: "16px",
            lineHeight: "25px",
            color: "#504e70",
            fontWeight: "400",
          }}
        >
          {data.description.length > 40
            ? data.description.substring(0, 40).concat("...")
            : data.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ position: "absolute", bottom: "10px" }}>
        <Typography
          component="div"
          sx={{
            fontSize: "14px",
            lineHeight: "25px",
            color: "#504e70",
            fontWeight: "400",
            textTransform: "capitalize",
            marginLeft: "8px",
          }}
        >
          Tags :{" "}
          <Typography
            component="a"
            sx={{
              fontWeight: "600",
              color: "var(--main-color)",
            }}
          >
            {data.tags[0]}
          </Typography>
          ,{" "}
          <Typography
            component="a"
            sx={{
              fontWeight: "600",
              color: "var(--main-color)",
            }}
          >
            {data.tags[1]}
          </Typography>
          ,{" "}
          <Typography
            component="a"
            sx={{
              fontWeight: "600",
              color: "var(--main-color)",
            }}
          >
            {data.tags[2]} {data.tags.length > 3 ? "..." : ""}
          </Typography>
        </Typography>
      </CardActions>
    </Card>
  );
}
