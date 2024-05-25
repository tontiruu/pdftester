"use client";
import PsychologyIcon from "@mui/icons-material/Psychology";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
const Loading = () => {
  const [isDisplay, setIsDisplay] = useState(false);

  return (
    <div style={{ textAlign: "center", margin: "auto" }}>
      <p style={{ marginTop: "10vh", fontSize: "18px" }}>問題を作成中です...</p>

      <motion.div
        className="figure2"
        initial={{ opacity: 1, x: -250 }}
        animate={{ opacity: 0, x: 0 }}
        transition={{ duration: 1, repeat: Infinity, repeatDelay: 1.5 }}
        style={{
          display: "inline-block",
          margin: "auto",
          position: "absolute",
          x: 0,
          y: "150px",
        }}
      >
        <Image
          src={require("@/src/img/pdfIcon.png")}
          alt="imageOfPdf"
          height={60}
          style={{
            paddingTop: "10vh",
            margin: "auto",
          }}
        />
      </motion.div>

      <PsychologyIcon
        sx={{
          // position: "absolute",
          width: "120px",
          margin: "auto",
          paddingTop: "10vh",
          height: "450px",
        }}
      />
      <motion.div
        className="figure2"
        initial={{ opacity: 0, x: 0 }}
        animate={{ opacity: [0, 1, 1, 0], x: [-50, 200] }}
        transition={{
          delay: 1,
          duration: 1,
          repeat: Infinity,
          repeatDelay: 1.5,
        }}
        style={{
          display: "inline-block",
          margin: "auto",
          position: "absolute",
          x: "50vw",
          y: "150px",
        }}
      >
        <Image
          src={require("@/src/img/testicon.png")}
          alt="imageOfPdf"
          height={60}
          style={{
            paddingTop: "10vh",
            margin: "atuo",
          }}
        />
      </motion.div>
    </div>
  );
};

export default Loading;
