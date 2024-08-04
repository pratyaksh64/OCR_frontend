import { Button, Input, Select, Space, Table } from "antd";
import Column from "antd/es/table/Column";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_WEB_BASE_URL;

export default function Browse() {
  const [searchBy, setSearchBy] = useState("first_name");
  const [searchValue, setSearchValue] = useState("");
  const [rows, setRows] = useState([]);

  const deleteRecord = async (number) => {
    const url = `${BASE_URL}/delete-form?number=${number}`;
    try {
      await axios.delete(url);
    } catch (e) {
      toast.error("Unable to delete row");
    } finally {
      await getLoanApplications();
    }
  };

  async function getLoanApplications() {
    const url = `${BASE_URL}/search?${searchBy}=${searchValue}`;
    try {
      const response = await axios.get(url);
      setRows(response.data.data);
    } catch (e) {
      toast.error("Unable to fetch data");
      setRows([]);
    }
  }

  useEffect(() => {
    getLoanApplications();
  }, [searchBy, searchValue]);

  return (
    <div className="pt-32 mx-auto max-w-screen-2xl">
      <div className="flex mb-8">
        <Select
          className="mr-2"
          onChange={(value) => setSearchBy(value)}
          showSearch
          defaultValue={"first_name"}
          placeholder="Select Field to search by"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={[
            { value: "first_name", label: "First Name" },
            { value: "last_name", label: "Last Name" },
            { value: "number", label: "License Number" },
            { value: "dob", label: "Date of Birth" },
          ]}
        />
        <Input
          placeholder="Search for Document"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
      </div>
      <div>
        <Table dataSource={rows}>
          <Column title="First Name" dataIndex="first_name" key="firstName" />
          <Column title="Last Name" dataIndex="last_name" key="lastName" />
          <Column
            title="License Number"
            dataIndex="number"
            key="licenseNumber"
          />
          <Column
            title="Action"
            key="action"
            render={(_, record) => (
              <Space size="middle">
                <Link
                  to={`/browse/${record.number}`}
                  className="text-blue-500 hover:text-blue-800 hover:underline hover:underline-offset-2"
                  href="/"
                >
                  Go to Form
                </Link>
                <Button
                  type="primary"
                  danger
                  onClick={() => deleteRecord(record.number)}
                >
                  Delete
                </Button>
                <Link
                  to={`/edit/${record.number}`}
                  className="text-blue-500 hover:text-blue-800 hover:underline hover:underline-offset-2"
                  href="/"
                >
                  Edit
                </Link>
              </Space>
            )}
          />
        </Table>
      </div>
    </div>
  );
}
