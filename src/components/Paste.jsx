import { Calendar, Copy, Eye, PencilLine, Share, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react"; // Import useState
import { removeFromPastes } from "../redux/pasteSlice";
import { FormatDate } from "../utlis/formatDate";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes); //all paste data from central store
  const dispatch = useDispatch(); //dispatch action
  const [searchTerm, setSearchTerm] = useState(""); // State to hold the search term

  const handleDelete = (id) => {
    dispatch(removeFromPastes(id));
  };

  // Filter pastes based on search term (by title or content)//fetch all data of paste
  const filteredPastes = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    //return always having ui mean this below is ui which will render on the browser
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className="flex flex-col gap-y-3">
        {/* Search */}
        <div className="w-full flex gap-3 px-4 py-2  rounded-[0.3rem] border border-[rgba(128,121,121,0.3)]  mt-6">
          <input
            type="search"
            placeholder="Search paste here..."
            className="focus:outline-none w-full bg-transparent"
            value={searchTerm} // Bind the input to searchTerm state
            onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
          />
        </div>

        {/* All Pastes */}
        <div className="flex flex-col border border-[rgba(128,121,121,0.3)] py-4 rounded-[0.4rem]">
          <h2 className="px-4 text-4xl font-bold border-b border-[rgba(128,121,121,0.3)] pb-4">
            All Pastes
          </h2>
          <div className="w-full px-4 pt-4 flex flex-col gap-y-5">
            {filteredPastes.length > 0 ? ( //all paste based on search term
              filteredPastes.map((paste) => (//here we are using map then we have to the key unique value
                // id of the paste ise unique then use key for this
                <div
                  //                 paste?._id Explanation
                  // paste: This is the object you are trying to access.
                  // ?: The optional chaining operator checks whether paste is not null or undefined.
                  // _id: If paste exists (i.e., it's not null or undefined), then _id is accessed. Otherwise, the entire expression evaluates to undefined.

                  key={paste?._id} //if paste exist use its id otherwise return undefined ,its called option chaining
                  className="border border-[rgba(128,121,121,0.3)] w-full gap-y-6 justify-between flex flex-col sm:flex-row p-4 rounded-[0.3rem]"
                >
                  {/* heading and Description */}
                  <div className="w-[50%] flex flex-col space-y-3">
                    <p className="text-4xl font-semibold ">{paste?.title}</p>
                    <p className="text-sm font-normal line-clamp-3 max-w-[80%] text-[#707070]">
                      {paste?.content}
                    </p>
                  </div>
                  {/* icons */}
                  <div className="flex flex-col gap-y-4 sm:items-end">
                    <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                      {/* edit button  */}
                      <button
                        // use pasteid to update the paste if paste id exist in url then it will go to update route
                        className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-blue-500"
                        // onClick={() => toast.error("Not working")}
                      >
                        <a
                          href={`/?pasteId=${paste?._id}`} //paste id in url
                        >
                          <PencilLine
                            className="text-black group-hover:text-blue-500"
                            size={20}
                          />
                        </a>
                      </button>
                      {/* delete button  */}
                      <button
                        className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-pink-500"
                        onClick={() => handleDelete(paste?._id)}
                      >
                        <Trash2
                          className="text-black group-hover:text-pink-500"
                          size={20}
                        />
                      </button>
                      {/* view button  */}
                      <button className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-orange-500">
                        {/* we can use (link to) instead of anchor tag a */}
                        <a href={`/pastes/${paste?._id}`} target="_blank">
                          <Eye
                            className="text-black group-hover:text-orange-500"
                            size={20}
                          />
                        </a>
                      </button>

                      {/* copy button  */}
                      <button
                        className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-green-500"
                        onClick={() => {
                          // Clipboard API
                          navigator.clipboard.writeText(paste?.content);
                          toast.success("Copied to Clipboard");
                        }}
                      >
                        <Copy
                          className="text-black group-hover:text-green-500"
                          size={20}
                        />
                      </button>

{/* share button  by myself*/}
                      <button
                        className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-yellow-500"
                        onClick={() => {
                          const id = paste?._id; // Replace with your dynamic ID
  const baseUrl = window.location.origin; // Current domain, e.g., "https://example.com"
  // const link = `${baseUrl}/?pasteId=${id}`;//query parameter you can pass any link between them
  const link = `${baseUrl}/pastes/${id}`;
  navigator.clipboard.writeText(link);
                          toast.success("Link is Copied");
                        }}
                      >
                        <Share
                          className="text-black group-hover:text-yellow-500"
                          size={20}
                        />
                      </button>
                    </div>
{/* show date */}
                    <div className="gap-x-2 flex ">
                      <Calendar className="text-white" size={20} />
                      {FormatDate(paste?.createdAt)}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-2xl text-center w-full text-chileanFire-500">
                No Data Found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paste;
