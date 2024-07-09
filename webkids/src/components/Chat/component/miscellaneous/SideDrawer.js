// import { Button } from "@chakra-ui/button";
// import { useDisclosure } from "@chakra-ui/hooks";
// import { Input } from "@chakra-ui/input";
// import { Box, Text } from "@chakra-ui/layout";
// import {
//   Menu,
//   MenuButton,
//   MenuDivider,
//   MenuItem,
//   MenuList,
// } from "@chakra-ui/menu";
// import {
//   Drawer,
//   DrawerBody,
//   DrawerContent,
//   DrawerHeader,
//   DrawerOverlay,
// } from "@chakra-ui/modal";
// import { Tooltip } from "@chakra-ui/tooltip";
// import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
// import { Avatar } from "@chakra-ui/avatar";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import ChatLoading from "../ChatLoading";
// import { Spinner } from "@chakra-ui/spinner";
// import ProfileModal from "./ProfileModal";
// import { ChatState } from "../../Context/ChatProvider";
// import UserListItem from "../userAvatar/UserListItem";

// import { useToast } from "@chakra-ui/react"; // Импортируем useToast из Chakra UI

// function SideDrawer() {
//   const [search, setSearch] = useState("");
//   const [searchResult, setSearchResult] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [loadingChat, setLoadingChat] = useState(false);

//   const { setSelectedChat, user, setNotification, chats, setChats } =
//     ChatState();

//   const toast = useToast(); // Используем хук useToast для отображения уведомлений
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const navigate = useNavigate();

//   const logoutHandler = () => {
//     localStorage.removeItem("userInfo");
//     navigate.push("/");
//   };

//   const handleSearch = async () => {
//     if (!search) {
//       toast({
//         title: "Please Enter something in search",
//         status: "warning",
//         duration: 5000,
//         isClosable: true,
//         position: "top-left",
//       });
//       return;
//     }

//     try {
//       setLoading(true);

//       const config = {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//       };

//       const response = await fetch(`/api/user?search=${search}`, {
//         method: "GET",
//         headers: config.headers,
//       });

//       if (!response.ok) {
//         throw new Error("Failed to Load the Search Results");
//       }

//       const data = await response.json();
//       setSearchResult(data);
//       setLoading(false);
//     } catch (error) {
//       toast({
//         title: "Error Occurred!",
//         description: "Failed to Load the Search Results",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom-left",
//       });
//       setLoading(false);
//     }
//   };

//   const accessChat = async (userId) => {
//     console.log(userId);

//     try {
//       setLoadingChat(true);
//       const config = {
//         headers: {
//           "Content-type": "application/json",
//           Authorization: `Bearer ${user.token}`,
//         },
//       };

//       const response = await fetch("/api/chat", {
//         method: "POST",
//         headers: config.headers,
//         body: JSON.stringify({ userId }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Failed to fetch the chat");
//       }

//       const data = await response.json();
//       if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
//       setSelectedChat(data);
//       setLoadingChat(false);
//       onClose();
//     } catch (error) {
//       toast({
//         title: "Error fetching the chat",
//         description: error.message,
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom-left",
//       });
//       setLoadingChat(false);
//     }
//   };

//   return (
//     <>
//       <Box
//         d="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         bg="white"
//         w="100%"
//         p="5px 10px 5px 10px"
//         borderWidth="5px"
//       >
//         <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
//           <Button variant="ghost" onClick={onOpen}>
//             <i className="fas fa-search"></i>
//             <Text d={{ base: "none", md: "flex" }} px={4}>
//               Search User
//             </Text>
//           </Button>
//         </Tooltip>
//         <Text fontSize="2xl" fontFamily="Work sans">
//           Talk-A-Tive
//         </Text>
//         <div>
//           <Menu>
//             <MenuButton p={1}>
//               <BellIcon fontSize="2xl" m={1} />
//             </MenuButton>
//             <MenuList pl={2}>
//               {notification.length === 0 && "No New Messages"}
//               {notification.map((notif) => (
//                 <MenuItem
//                   key={notif._id}
//                   onClick={() => {
//                     setSelectedChat(notif.chat);
//                     setNotification(notification.filter((n) => n !== notif));
//                   }}
//                 >
//                   {notif.chat.isGroupChat
//                     ? `New Message in ${notif.chat.chatName}`
//                     : `New Message from ${getSender(user, notif.chat.users)}`}
//                 </MenuItem>
//               ))}
//             </MenuList>
//           </Menu>
//           <Menu>
//             <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon />}>
//               <Avatar
//                 size="sm"
//                 cursor="pointer"
//                 name={user.name}
//                 src={user.pic}
//               />
//             </MenuButton>
//             <MenuList>
//               <ProfileModal user={user}>
//                 <MenuItem>My Profile</MenuItem>
//               </ProfileModal>
//               <MenuDivider />
//               <MenuItem onClick={logoutHandler}>Logout</MenuItem>
//             </MenuList>
//           </Menu>
//         </div>
//       </Box>

//       <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
//         <DrawerOverlay />
//         <DrawerContent>
//           <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
//           <DrawerBody>
//             <Box d="flex" pb={2}>
//               <Input
//                 placeholder="Search by name or email"
//                 mr={2}
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//               />
//               <Button onClick={handleSearch}>Go</Button>
//             </Box>
//             {loading ? (
//               <ChatLoading />
//             ) : (
//               searchResult?.map((user) => (
//                 <UserListItem
//                   key={user._id}
//                   user={user}
//                   handleFunction={() => accessChat(user._id)}
//                 />
//               ))
//             )}
//             {loadingChat && <Spinner ml="auto" d="flex" />}
//           </DrawerBody>
//         </DrawerContent>
//       </Drawer>
//     </>
//   );
// }

// export default SideDrawer;
