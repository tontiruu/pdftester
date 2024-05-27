import { Chip } from "@mui/material";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import AutoModeIcon from "@mui/icons-material/AutoMode";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import FollowTheSignsIcon from "@mui/icons-material/FollowTheSigns";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

const NewQuestionChip = ({
  accCount,
  missCount,
}: {
  accCount: number;
  missCount: number;
}) => {
  return (
    <>
      {accCount + missCount == 0 ? (
        <Chip
          icon={<AutoAwesomeIcon />}
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
          icon={<ReportProblemIcon />}
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
          icon={<FitnessCenterIcon />}
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
          icon={<FollowTheSignsIcon />}
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
          icon={<WorkspacePremiumIcon />}
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
          icon={<ThumbUpAltIcon />}
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
  );
};

export default Chips;
