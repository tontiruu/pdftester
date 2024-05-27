import { Chip } from "@mui/material";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import AutoModeIcon from "@mui/icons-material/AutoMode";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import FollowTheSignsIcon from "@mui/icons-material/FollowTheSigns";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { grey } from "@mui/material/colors";
import { createTheme, ThemeProvider, Theme } from "@mui/material";

const theme: Theme = createTheme({
  palette: {
    primary: {
      main: "#FFFFFF",
      contrastText: "#ffffff",
      dark: "#58928C",
      light: "#CDFFFA",
    },
  },
});

const NewQuestionChip = ({
  accCount,
  missCount,
}: {
  accCount: number;
  missCount: number;
}) => {
  const primary = grey[50];
  return (
    <>
      {accCount + missCount == 0 ? (
        <Chip
          icon={<AutoAwesomeIcon fill="#FFFFFF" />}
          label="新規問題"
          sx={{ backgroundColor: "#22BFFF", color: "white", margin: "5px" }}
        />
      ) : (
        <div></div>
      )}
    </>
  );
};

const VeryNeedEffort = ({
  accCount,
  missCount,
}: {
  accCount: number;
  missCount: number;
}) => {
  return (
    <>
      {missCount >= 2 && accCount / (accCount + missCount) <= 0.4 ? (
        <Chip
          icon={<ReportProblemIcon fill="#FFFFFF" />}
          label="重度の苦手"
          sx={{ backgroundColor: "#000000", color: "white", margin: "5px" }}
        />
      ) : (
        <div></div>
      )}
    </>
  );
};

const NeedEffort = ({
  accCount,
  missCount,
}: {
  accCount: number;
  missCount: number;
}) => {
  return (
    <>
      {accCount + missCount > 0 && accCount / (accCount + missCount) < 0.6 ? (
        <Chip
          icon={<FitnessCenterIcon fill="#FFFFFF" />}
          label="苦手克服"
          sx={{ backgroundColor: "#F43333", color: "white", margin: "5px" }}
        />
      ) : (
        <div></div>
      )}
    </>
  );
};

const OneMoreStep = ({
  accCount,
  missCount,
}: {
  accCount: number;
  missCount: number;
}) => {
  return (
    <>
      {accCount + missCount > 0 &&
      accCount / (accCount + missCount) >= 0.6 &&
      accCount / (accCount + missCount) < 0.75 ? (
        <Chip
          icon={<FollowTheSignsIcon fill="#FFFFFF" />}
          label="定着まで後一歩"
          sx={{ backgroundColor: "#FF5F17", color: "white", margin: "5px" }}
        />
      ) : (
        <div></div>
      )}
    </>
  );
};

const Established = ({
  accCount,
  missCount,
}: {
  accCount: number;
  missCount: number;
}) => {
  return (
    <>
      {accCount >= 2 && accCount / (accCount + missCount) >= 0.75 ? (
        <Chip
          icon={<WorkspacePremiumIcon fill="#FFFFFF" />}
          label="記憶定着"
          sx={{ backgroundColor: "#00BB00", color: "white", margin: "5px" }}
        />
      ) : (
        <div></div>
      )}
    </>
  );
};

const Perfect = ({
  accCount,
  missCount,
}: {
  accCount: number;
  missCount: number;
}) => {
  return (
    <>
      {accCount > 0 && missCount == 0 ? (
        <Chip
          icon={<ThumbUpAltIcon fill="#FFFFFF" />}
          label="正答率100%"
          sx={{ backgroundColor: "#BBBB00", color: "white", margin: "5px" }}
        />
      ) : (
        <div></div>
      )}
    </>
  );
};

const Chips = ({
  accCount,
  missCount,
}: {
  accCount: number;
  missCount: number;
}) => {
  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: "flex",
          margin: "auto",
          justifyContent: "center",
          marginTop: "2vh",
        }}
      >
        <NewQuestionChip accCount={accCount} missCount={missCount} />
        <VeryNeedEffort accCount={accCount} missCount={missCount} />
        <NeedEffort accCount={accCount} missCount={missCount} />
        <OneMoreStep accCount={accCount} missCount={missCount} />
        <Established accCount={accCount} missCount={missCount} />
        <Perfect accCount={accCount} missCount={missCount} />
      </div>
    </ThemeProvider>
  );
};

export default Chips;
