import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getNumberAfterBrowse } from "../utils";
import toast from "react-hot-toast";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_WEB_BASE_URL;

export default function SampleForm() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const [requiredForm, setRequiredForm] = useState(null);

  useEffect(() => {
    async function getSampleForm() {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${BASE_URL}/search?number=${getNumberAfterBrowse(location.pathname, "browse")}`,
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
            <p>{requiredForm.first_name}</p>
            <p>{requiredForm.last_name}</p>
            <p>{requiredForm.issue_state}</p>
            <p>{requiredForm.number}</p>
            <p>{requiredForm.dob}</p>
            <p>{requiredForm.expiration_date}</p>
            <p>{requiredForm.issue_date}</p>
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
            <p>{requiredForm.personal_details.date}</p>
            <p>{requiredForm.personal_details.city}</p>
            <p>{requiredForm.personal_details.state}</p>
            <p>{requiredForm.personal_details.zip_code}</p>
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
            <p>{requiredForm.line_text_parser.Line_text_1}</p>
            <p>{requiredForm.line_text_parser.Line_text_2}</p>
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
            <p>{requiredForm.paragraph_text_parser.para_text}</p>
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
                <p className="font-medium text-md">
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
              return <p className="">{requiredForm.numerical_parser[title]}</p>;
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
                <p className="font-medium text-md">
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
                <p className="">{requiredForm.numerical_parser_2[title]}</p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
