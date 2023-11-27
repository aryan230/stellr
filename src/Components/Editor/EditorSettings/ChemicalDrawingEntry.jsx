import React, { useEffect, useState } from "react";
import BasicModalTailwind from "../../../UI/MainModals/BasicModalTailwind";
import MainLoaderWithText from "../../Loaders/MainLoaderWithText";
import InputWithLabel from "../../../UI/Input/InputWithLabel";
import DefaultButton from "../../../UI/Button/DefaultButton";
import Select from "react-select";
import axios from "axios";
import { useSelector } from "react-redux";
import URL from "./../../../Data/data.json";
import { toast } from "sonner";

function ChemicalDrawingEntry({ open, setOpen, quill, setCreateDrawingModal }) {
  const [loader, setLoader] = useState(false);
  const [cd, setCD] = useState();
  const [data, setData] = useState();
  const userLogin = useSelector((state) => state.userLogin);
  let { loading, error, userInfo } = userLogin;

  const submitHandler = async (e) => {
    e.preventDefault();
    const editor = quill.current.editor;
    const value = await data.find((d) => d._id === cd);
    const imageUrl = await value.data[0].image;
    console.log(value);
    if (imageUrl) {
      editor.insertEmbed(quill.current.getSelection(), "image", imageUrl);
    } else {
      toast.error("The image cannot be created for this drawing.", {
        description: "Try changing the chemical drawing",
      });
    }
    setOpen(false);
  };

  const entryOptions = [
    {
      value: "Lab Notebook",
      label: "Lab Notebook",
    },
    {
      value: "Lab Sheet",
      label: "Lab Sheet",
    },
  ];

  const getMyCDs = async () => {
    var config = {
      method: "get",
      url: `${URL}api/cd`,
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
      data: data,
    };

    axios(config)
      .then(function(response) {
        console.log(JSON.stringify(response.data));
        if (response.data && response.data.length > 0) {
          // response.data.map(({ _id: value, name: label }) => ({
          //     value,
          //     label,
          //   }))
          setData(response.data);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  console.log(data);
  useEffect(() => {
    if (!data) {
      getMyCDs();
    }
  }, [data]);

  return (
    <BasicModalTailwind open={open} setOpen={setOpen}>
      {loader && <MainLoaderWithText text="Saving" />}
      {data && data.length > 0 ? (
        <form onSubmit={submitHandler} className="w-full pt-5">
          <h2 className="text-xl font-extrabold">Add Chemical Drawing</h2>
          <div className="margin-maker"></div>
          <select
            id="large"
            required="true"
            onChange={(e) => setCD(e.target.value)}
            className="block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          >
            <option selected="">Choose a drawing</option>
            {data.map((d) => (
              <option value={d._id}>{d.name}</option>
            ))}
          </select>

          <DefaultButton label="Add" />
        </form>
      ) : (
        <>
          No Chemical Drawings Found <br />{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
              setCreateDrawingModal(true);
            }}
            className="text-indigo-700"
          >
            Create new drawing
          </a>
        </>
      )}
    </BasicModalTailwind>
  );
}

export default ChemicalDrawingEntry;
