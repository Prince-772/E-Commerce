import { IoSearchSharp } from "react-icons/io5";
import { SearchTerm } from "../store/searchContext";
import { useContext } from "react";


function Search(){
  const { setSearchTerm } = useContext(SearchTerm);
  return (
    <div className="relative w-full md:max-w-md md:w-[75%]">
          <input
            type="text"
            className="h-8 md:h-10 rounded-md bg-sky-200 pr-4 pl-10 w-full focus:outline-none"
            placeholder="Search (eg. SmartPhone, Fashion, etc.)"
            // value={input.trim()}
            onChange={(e) => {
              setSearchTerm(e.target.value.toLocaleLowerCase().trim());
            }}
          />
          <IoSearchSharp className="absolute text-white bg-blue-500 left-1 top-1 w-6 h-6 md:w-8 md:h-8 p-1 rounded-md cursor-pointer" />
        </div>
  )
}
export default Search;