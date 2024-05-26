"use client";
import { Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import Loading from "../components/Loading";

const UploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const buttonStyle = {
    backgroundColor: "#F43333",
    ":hover": { backgroundColor: "#F41111" },
  };

  const handleSubmit = () => {
    const body = new FormData();
    body.append("file", file);
    setIsLoading(true);
    axios
      .post("http://localhost:8001/uploadfile", body, {
        headers: { "content-type": "multipart/from-data" },
      })
      .then((response) => {
        if (!response.data.error) {
          window.location.href = "/" + response.data.id;
        } else {
          setIsLoading(false);
          alert(response.data.error_message);
        }
      });
  };
  const handleFileInput = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div
      style={{
        paddingLeft: "5vw",
        paddingTop: "5vh",
        paddingRight: "5vw",
      }}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: "18px" }}>
              PDFファイルをアップロードしてください
            </p>
          </div>

          <form style={{ display: "flex", flexDirection: "column" }}>
            <Image
              src={require("@/src/img/pdfIcon.png")}
              alt="imageOfPdf"
              height={120}
              style={{
                paddingTop: "10vh",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              sx={{
                width: "250px",
                margin: "auto",
                marginTop: "2vh",
                backgroundColor: "#F43333",
                ":hover": { backgroundColor: "#F41111" },
              }}
              startIcon={<CloudUploadIcon />}
            >
              ファイルアップロード
              <VisuallyHiddenInput
                type="file"
                name="uploadPdf"
                accept="application/pdf"
                required={true}
                onChange={handleFileInput}
              />
            </Button>
            <p style={{ margin: "auto", marginTop: "50px", fontSize: "18px" }}>
              {file ? file.name : "　"}
            </p>
            <Button
              variant="contained"
              sx={{
                width: "150px",
                height: "50px",
                fontSize: "20px",
                padding: "auto",
                margin: "auto",
                marginTop: "10vh",
                backgroundColor: "#F43333",
                ":hover": { backgroundColor: "#F41111" },
              }}
              onClick={handleSubmit}
            >
              送信
            </Button>
          </form>
        </>
      )}
    </div>
  );
};

export default UploadPage;
