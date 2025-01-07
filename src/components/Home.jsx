import { Copy, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updatePastes } from "../redux/pasteSlice";
import { useSearchParams } from "react-router-dom";
const Home = (theme) => {
  const [value, setValue] = useState(""); //for show update or create button on same route using paste id ,in parameters
  const [title, setTitle] = useState("");
  const [searchParams, setSearchParams] = useSearchParams(); // Destructure useSearchParams, it is paste id as parameter in url
  //we want query parameter which key value is paste id
  const pasteId = searchParams.get("pasteId"); // Get pasteId from the search params
  const pastes = useSelector((state) => state.paste.pastes);//all pastes
  const dispatch = useDispatch();

  const createPaste = () => {
    // create the data of paste ,and a new paste and forward it to slice where it will be verified and stores into localstorage
    const paste = {
      title: title,
      content: value,
      _id:
        pasteId || //old id
        Date.now().toString(36) + Math.random().toString(36).substring(2), //create new id if not old id,created new id on the basis of date
      createdAt: new Date().toISOString(), //save when paste was created that time
    };

    // update and create both logic written in slice and to use reducer we need to use dispathcer so use usedispatcher hook
    if (pasteId) {
      //update
      // If pasteId is present, update the paste//paste already is created
      dispatch(updatePastes(paste)); //paste is payload
    } else {
      //create
      dispatch(addToPastes(paste));
    }
    // after creation or updation of paste clean the title filed ,and textarea
    setTitle("");
    setValue("");

    // Remove the pasteId from the URL after creating/updating a paste
    setSearchParams({});
  };

  const resetPaste = () => {
    setTitle("");
    setValue("");
    setSearchParams({});
    // navigate("/");
  };

  // if paste id changed from paste to paste_id then build the logic so that we can edit 
  useEffect(() => {
    if (pasteId) {//if pasteid exist
      // search with the paste_id in the url with the paste_id of paste in the paste_list
      const paste = pastes.find((p) => p._id === pasteId);//find from list of paste ,p is argument and p.id is iterator which is searching with url paste id
      if (paste) {//if paste with url paste id exist 
        setTitle(paste.title);//set the title in input field
        setValue(paste.content);//set the content in the text area 
      }
    }
  }, [pasteId, pastes]);//rerender when pastes or paste_id changed

  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className="flex flex-col gap-y-5 items-start">
        <div className="w-full flex flex-row gap-x-4 justify-between items-center">
          <input
            //create input field for title
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)} //change the title as value get from input
            // Dynamic width based on whether pasteId is present
            className={`${
              pasteId ? "w-[80%]" : "w-[85%]"
            } text-white border border-input rounded-md p-2`}
          />

          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700"
            onClick={createPaste} //execute create paste,
          >
            {
              pasteId ? "Update Paste" : "Create My Paste" //its a conditional rendering mean show title on button when create or update
            }
          </button>

          {pasteId && (
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700"
              onClick={resetPaste}
            >
              <PlusCircle size={20} />
            </button>
          )}
        </div>

        <div
          className={`w-full flex flex-col items-start relative rounded bg-opacity-10 border border-[rgba(128,121,121,0.3)] backdrop-blur-2xl`}
        >
          <div
            className={`w-full rounded-t flex items-center justify-between gap-x-4 px-4 py-2 border-b border-[rgba(128,121,121,0.3)]`}
          >
            <div className="w-full flex gap-x-[6px] items-center select-none group">
              <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(255,95,87)]" />
              <div
                className={`w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(254,188,46)]`}
              />
              <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(45,200,66)]" />
            </div>

            {/* Circle and copy btn */}
            <div
              className={`w-fit rounded-t flex items-center justify-between gap-x-4 px-4`}
            >
              {/*Copy  button */}
              <button
                className={`flex justify-center items-center  transition-all duration-300 ease-in-out group`}
                onClick={() => {
                  navigator.clipboard.writeText(value);
                  toast.success("Copied to Clipboard", {
                    position: "top-right",
                  });
                }}
              >
                <Copy className="group-hover:text-sucess-500" size={20} />
              </button>
            </div>
          </div>

          {/* TextArea */}
          <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Write Your Content Here...."
        className="w-full p-3 focus-visible:ring-0"
        style={{
          backgroundColor: theme === "light" ? "#f8f9fa" : "#2e2e2e",
          color: theme === "light" ? "#000" : "#fff",
          caretColor: theme === "light" ? "#000" : "#fff",
          border: "1px solid",
          borderColor: theme === "light" ? "#ccc" : "#444",
          borderRadius: "4px",
          width: "100%",
          fontSize: "16px",
        }}
        rows={20}
      />
        </div>
      </div>
    </div>
  );
};

export default Home;
