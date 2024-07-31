import { Button } from "antd";
import axios from "axios";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import toast from "react-hot-toast";

const allowedFiletypes = ["PDF"];
const BASE_URL = process.env.REACT_APP_WEB_BASE_URL;

function App() {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (file) => {
    setFile(file);
  };

  const submitToUploadApi = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("pdf", file);

    try {
      setIsLoading(true);
      const response = await axios.post(`${BASE_URL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("File uploaded successfully:", response.data);
      toast.success("Uploaded Successfully");
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Upload Error");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="grid place-items-center min-h-[75vh]">
      <form onSubmit={submitToUploadApi}>
        <h1 className="text-lg font-medium">
          Upload your handwritten document here
        </h1>

        <FileUploader
          handleChange={handleChange}
          name="file"
          types={allowedFiletypes}
        />
        <Button className="w-full mt-2" type="primary" htmlType="submit">
          Submit
        </Button>
        {isLoading && <p className="text-center mt-2">Loading...</p>}
        <p className="text-center mt-2">{file ? `File name: ${file.name}` : "no files uploaded yet"}</p>
      </form>
    </div>
  );
}

export default App;
