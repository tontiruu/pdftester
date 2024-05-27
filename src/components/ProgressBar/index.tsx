import {
  Box,
  LinearProgress,
  LinearProgressProps,
  Typography,
} from "@mui/material";

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box
      sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 50, marginLeft: "0px" }}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={props.value >= 100 ? { fontSize: "20px", color: "#F43333" } : {}}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

const ProgressBar = ({ value }: { value: number }) => {
  return (
    <Box
      sx={{
        "@media(min-width: 700px)": {
          width: "680px",
        },
        margin: "auto",
      }}
    >
      <Typography sx={{ fontSize: "18px" }}>
        目標：全問題正答率75％以上
      </Typography>
      <LinearProgressWithLabel
        value={value}
        sx={{
          marginTop: "5vh",
          height: "12px",
          borderRadius: "5px",
          backgroundColor: "#FFCCCC",
          color: "#FF0000",
          "& .MuiLinearProgress-bar": {
            backgroundColor: "#F43333", // プログレスバーの色
          },
        }}
      />
    </Box>
  );
};

export default ProgressBar;
