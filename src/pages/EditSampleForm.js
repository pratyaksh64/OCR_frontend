import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getNumberAfterBrowse } from "../utils";
import toast from "react-hot-toast";
import axios from "axios";
import { Button } from "antd";

const BASE_URL = process.env.REACT_APP_WEB_BASE_URL;

export default function EditSampleForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [requiredForm, setRequiredForm] = useState(null);

  useEffect(() => {
    async function getSampleForm() {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${BASE_URL}/search?number=${getNumberAfterBrowse(location.pathname, "edit")}`,
        );
        const sampleForm = response.data;
        if (sampleForm.success && sampleForm.data.length > 0) {
          setRequiredForm(sampleForm.data[0]);
        }
      } catch (error) {
        toast.error("Unable to fetch");
      } finally {
        setIsLoading(false);
      }
    }
    getSampleForm();
  }, [location]);

  const updateForm = async () => {
    try {
      const url = `${BASE_URL}/edit-form?number=${getNumberAfterBrowse(location.pathname, "edit")}`;
      const payload = { ...requiredForm };
      delete payload["_id"];
      const response = await axios.put(url, { ...payload });
      toast.success(
        "Record updated successfully, you will be redirected in 5 seconds",
      );
      navigate(`/browse/${getNumberAfterBrowse(location.pathname, "edit")}`);
    } catch (error) {
      toast.error("Unable to update record");
    } finally {
    }
  };

  const handleChange = (section, key, value) => {
    setRequiredForm((prev) => {
      if (section === "requiredForm") {
        return { ...prev, [key]: value };
      }
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [key]: value,
        },
      };
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-[75vh] grid place-items-center">Loading...</div>
    );
  }

  if (!requiredForm) {
    return (
      <div className="min-h-[75vh] grid place-items-center">
        No Data Available
      </div>
    );
  }

  return (
    <div className="pt-32 mx-16 md:mx-60  xl:mx-96">
      <div className="">
        <h3 className="text-2xl font-semibold underline underline-offset-1">
          License Information
        </h3>
        <div className="flex items-center">
          <div className="mr-2">
            <p className="font-medium text-md">First Name:</p>
            <p className="font-medium text-md">Last Name: </p>
            <p className="font-medium text-md">Issued State: </p>
            <p className="font-medium text-md">License Number: </p>
            <p className="font-medium text-md">Date of Birth: </p>
            <p className="font-medium text-md">Expiration Date: </p>
            <p className="font-medium text-md">Issue Date: </p>
          </div>
          <div>
            <input
              className="block"
              type="text"
              value={requiredForm.first_name}
              onChange={(e) =>
                handleChange("requiredForm", "first_name", e.target.value)
              }
            />
            <input
              type="text"
              className="block"
              value={requiredForm.last_name}
              onChange={(e) =>
                handleChange("requiredForm", "last_name", e.target.value)
              }
            />
            <input
              type="text"
              className="block"
              value={requiredForm.issue_state}
              onChange={(e) =>
                handleChange("requiredForm", "issue_state", e.target.value)
              }
            />
            <input
              type="text"
              className="block"
              value={requiredForm.number}
              onChange={(e) =>
                handleChange("requiredForm", "number", e.target.value)
              }
            />
            <input
              type="text"
              className="block"
              value={requiredForm.dob}
              onChange={(e) =>
                handleChange("requiredForm", "dob", e.target.value)
              }
            />
            <input
              type="text"
              className="block"
              value={requiredForm.expiration_date}
              onChange={(e) =>
                handleChange("requiredForm", "expiration_date", e.target.value)
              }
            />
            <input
              type="text"
              className="block"
              value={requiredForm.issue_date}
              onChange={(e) =>
                handleChange("requiredForm", "issue_date", e.target.value)
              }
            />
          </div>
        </div>
      </div>

      <br />
      <br />
      <div className="">
        <h3 className="text-2xl font-semibold underline underline-offset-1">
          Personal Details
        </h3>
        <div className="flex items-center">
          <div className="mr-2">
            <p className="font-medium text-md">Date:</p>
            <p className="font-medium text-md">City: </p>
            <p className="font-medium text-md">State: </p>
            <p className="font-medium text-md">Zip Code: </p>
          </div>
          <div>
            <input
              type="text"
              className="block"
              value={requiredForm.personal_details.date}
              onChange={(e) =>
                handleChange("personal_details", "date", e.target.value)
              }
            />
            <input
              type="text"
              className="block"
              value={requiredForm.personal_details.city}
              onChange={(e) =>
                handleChange("personal_details", "city", e.target.value)
              }
            />
            <input
              type="text"
              className="block"
              value={requiredForm.personal_details.state}
              onChange={(e) =>
                handleChange("personal_details", "state", e.target.value)
              }
            />
            <input
              type="text"
              className="block"
              value={requiredForm.personal_details.zip_code}
              onChange={(e) =>
                handleChange("personal_details", "zip_code", e.target.value)
              }
            />
          </div>
        </div>
      </div>

      <br />
      <br />
      <div className="">
        <h3 className="text-2xl font-semibold underline underline-offset-1">
          Line Text
        </h3>
        <div className="flex items-center">
          <div className="mr-2">
            <p className="font-medium text-md">Handwriting Text 1:</p>
            <p className="font-medium text-md">Handwriting Text 2: </p>
          </div>
          <div>
            <input
              className="block"
              type="text"
              value={requiredForm.line_text_parser.Line_text_1}
              onChange={(e) =>
                handleChange("line_text_parser", "Line_text_1", e.target.value)
              }
            />
            <input
              className="block"
              type="text"
              value={requiredForm.line_text_parser.Line_text_2}
              onChange={(e) =>
                handleChange("line_text_parser", "Line_text_2", e.target.value)
              }
            />
          </div>
        </div>
      </div>

      <br />
      <br />
      <div className="">
        <h3 className="text-2xl font-semibold underline underline-offset-1">
          Paragraph Text
        </h3>
        <div className="flex ">
          <div className="mr-2">
            <p className="font-medium text-md">Handwritten Paragraph:</p>
          </div>
          <div>
            <input
              className="block"
              type="text"
              value={requiredForm.paragraph_text_parser.para_text}
              onChange={(e) =>
                handleChange(
                  "paragraph_text_parser",
                  "para_text",
                  e.target.value,
                )
              }
            />
          </div>
        </div>
      </div>

      <br />
      <br />
      <div className="">
        <h3 className="text-2xl font-semibold underline underline-offset-1">
          Numerical Text
        </h3>
        <div className="flex ">
          <div className="mr-2">
            {Object.keys(requiredForm.numerical_parser).map((title) => {
              return (
                <p className="font-medium text-md" key={title}>
                  {title
                    .replaceAll("_", " ")
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                  :
                </p>
              );
            })}
          </div>
          <div>
            {Object.keys(requiredForm.numerical_parser).map((title) => {
              return (
                <input
                  type="text"
                  className="block"
                  key={title}
                  value={requiredForm.numerical_parser[title]}
                  onChange={(e) =>
                    handleChange("numerical_parser", title, e.target.value)
                  }
                />
              );
            })}
          </div>
        </div>
      </div>

      <br />
      <br />
      <div className="">
        <h3 className="text-2xl font-semibold underline underline-offset-1">
          Long Numerical Text
        </h3>
        <div className="flex ">
          <div className="mr-2">
            {Object.keys(requiredForm.numerical_parser_2).map((title) => {
              return (
                <p className="font-medium text-md" key={title}>
                  {title
                    .replaceAll("_", " ")
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                  :
                </p>
              );
            })}
          </div>
          <div>
            {Object.keys(requiredForm.numerical_parser_2).map((title) => {
              return (
                <input
                  className="block"
                  type="text"
                  key={title}
                  value={requiredForm.numerical_parser_2[title]}
                  onChange={(e) =>
                    handleChange("numerical_parser_2", title, e.target.value)
                  }
                />
              );
            })}
          </div>
        </div>
        <Button type="primary" className="w-full" onClick={updateForm}>
          Save
        </Button>
      </div>
    </div>
  );
}
