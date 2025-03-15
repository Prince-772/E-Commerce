import { createContext, useContext, useEffect, useState } from "react";
import { ProductList } from "./E-comm-store";
export const SearchTerm = createContext("");

export default function SearchTermProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredList,setFilteredList] = useState([])
  const [isSearching,setIsSearching] = useState(false)
  const {productList} = useContext(ProductList)
  useEffect (()=>{
    setIsSearching(true)
    setFilteredList(productList.filter(
      (product) =>
        product.body.toLowerCase().includes(searchTerm) ||
        product.category.some(
          (cat) =>
            cat.toLowerCase() === searchTerm ||
            searchTerm.trim() === cat.toLowerCase()
        )
    ))
    setIsSearching(false)
  },[searchTerm])
  return (
    <SearchTerm.Provider value={{ searchTerm, setSearchTerm ,filteredList,isSearching}}>
      {children}
    </SearchTerm.Provider>
  );
}
