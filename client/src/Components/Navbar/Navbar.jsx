











// ############# Only arrow up & down from top tobottom end Point ############# 


// import React, { useCallback, useEffect, useState } from 'react';
// import image_1212 from "/1212.png";
// import { RiSearchLine } from "react-icons/ri";
// import { RxCrossCircled } from "react-icons/rx";
// import { useDocContext } from '../../Context/DocContext';
// import { useLocation, useNavigate } from 'react-router-dom';
// import debounce from "lodash/debounce";
// import NavbarPopup from './NavbarPopup';

// const Navbar = () => {
//     const [toggle, setToggle] = useState(false);  // For search bar toggle
//     const [documents, setDocuments] = useState([]);  // Search results
//     const [searchDocs, setSearchDocs] = useState("");  // Input value
//     const [highlightedIndex, setHighlightedIndex] = useState(-1); // To track highlighted result
//     const { token, api } = useDocContext();  // For user token and API context
//     const navigate = useNavigate();
//     const location = useLocation();
//     const pathname = location.pathname;

//     useEffect(() => {
//         setToggle(false);  // Close search bar on route change
//     }, [pathname]);

//     // Debounced search function to avoid too many API calls
//     const debouncedUpdate = useCallback(
//         debounce((search) => {
//             if (search.trim() === "") {
//                 setDocuments([]);  // Clear results if search is empty
//                 setHighlightedIndex(-1);  // Reset highlighted index
//             } else {
//                 fetchSearch(search);  // Perform search
//             }
//         }, 500), []
//     );

//     // Fetch search results from the backend
//     const fetchSearch = async (search) => {
//         try {
//             const response = await api.post(`/docbox/search`, { search }, {
//                 headers: { 'Content-Type': 'application/json' }
//             });

//             if (response.data?.success) {
//                 setDocuments(response.data?.documents);  // Set the documents (search results)
//                 setHighlightedIndex(-1);  // Reset the highlighted index
//             }
//         } catch (error) {
//             console.error("Error fetching search results:", error);
//         }
//     };

//     // Handle keyboard navigation and selection
//     const handleKeyDown = (e) => {
//         if (documents.length === 0) return;

//         if (e.key === 'ArrowDown') {
//             // Move down the list (increase index)
//             setHighlightedIndex((prevIndex) => Math.min(prevIndex + 1, documents.length - 1));
//         } else if (e.key === 'ArrowUp') {
//             // Move up the list (decrease index)
//             setHighlightedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
//         } else if (e.key === 'Enter') {
//             // Navigate to the selected document on Enter
//             if (highlightedIndex >= 0) {
//                 navigate(`/view/${documents[highlightedIndex]._id}`);
//             }
//         }
//     };

//     // Handle change in the search input
//     const handleSearchChange = (e) => {
//         const value = e.target.value;
//         setSearchDocs(value);
//         debouncedUpdate(value);  // Trigger debounced search
//     };

//     return (
//         <>
//             <div className={`navbar z-[100] flex items-center px-3 sm:px-10 h-14 py-8 md:h-20 justify-between ${pathname === "/" ? "bg-[#02124f]" : "bg-[#fcc419]"} border-b-8 border-black backdrop-blur-sm z-50`}>
//                 {/* Logo and Title */}
//                 <div className='flex gap-3 items-center justify-start'>
//                     <img src={image_1212} className='h-12 cursor-pointer' alt="logo" onClick={() => navigate('/')} />
//                     <h2 className={`hidden sm:block text-3xl ${pathname === "/" ? "text-white" : "text-black"} font-bold cursor-pointer`} onClick={() => navigate('/')}>MDocs</h2>
//                 </div>

//                 {/* Search Bar & User Actions */}
//                 <div className="right flex justify-end items-center gap-4">
//                     <div className="search_icon w-[50vw] md:w-[35vw] relative">
//                         <i
//                             onClick={() => setToggle(prev => !prev)}
//                             className={`absolute cursor-pointer top-2 transition-transform duration-300 ease-in-out text-3xl ${toggle ? "left-8 transform -translate-x-[90%]" : "right-1 translate-x-0"} text-white`}>
//                             {toggle
//                                 ? <RxCrossCircled className='text-white bg-black rounded-full hover:rotate-180 transition-all duration-300' />
//                                 : <RiSearchLine />}
//                         </i>
//                         <input
//                             type="text"
//                             value={searchDocs}
//                             onChange={handleSearchChange}
//                             onKeyDown={handleKeyDown}  // Capture arrow and enter key events
//                             className={`pl-10 h-11 border-none outline-none text-xl rounded-md transition-transform duration-100 ease-in ${toggle ? "w-full" : "bg-transparent w-0 opacity-0"}`}
//                             placeholder='Search here...'
//                         />
//                         {toggle && searchDocs.trim() !== "" && documents.length > 0 && (
//                             <ul className={`absolute w-[65vw] sm:w-[55vw] md:w-[45vw] top-14 md:top-16 right-0 text-left bg-[rgba(0,0,0,0.7)] text-white rounded-md overflow-hidden overflow-y-auto max-h-[70vw]`}>
//                                 {documents.map((document, index) => (
//                                     <li
//                                         key={document._id}
//                                         onClick={() => navigate(`/view/${document._id}`)}
//                                         className={`border-b-4 border-[#808080] py-1 pl-2 w-full cursor-pointer hover:bg-gray-700 ${highlightedIndex === index ? "bg-gray-700" : ""}`}
//                                         style={{
//                                             backgroundColor: highlightedIndex === index ? 'rgba(255, 255, 255, 0.3)' : 'transparent',
//                                         }}>
//                                         {document.title}
//                                     </li>
//                                 ))}
//                             </ul>
//                         )}
//                     </div>
//                     {/* Login or Profile Popup */}
//                     {token ? (
//                         <NavbarPopup setToggle={setToggle} />
//                     ) : (
//                         <button onClick={() => navigate('/login')} className='login__btn'>Login</button>
//                     )}
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Navbar;
