import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chats from './pages/Chats';
import SingleChat from "./pages/SingleChat";


const myTheme = extendTheme({
  fonts:{
    body: "lato, san-serif",
    heading: "Playfair Display, serif"
  },
  colors:{
    primary:{
      50: "#f5f8e9",
      100: "#ebf0d4",
      200: "#e1e9be",
      300:"#d7e1a9",
      400:"#ceda93",
      500:"#c4d27d",
      600:"#bacb68",
      700:"#b0c352",
      800:"#a6bc3d",
      900:"#9cb427",
    },
    accent:{
      50: "#e9e8ef",
      100: "#d3d0df",
      200: "#bdb9cf",
      300:"#a7a1bf",
      400:"#918ab0",
      500:"#7a73a0",
      600:"#645b90",
      700:"#4e4480",
      800:"#382c70",
      900:"#221560",
    },
    secondary: {
      50: "#b0eed9",
      100: "#9ed6c3",
      200: "#8dbeae",
      300:"#7ba798",
      400:"#6a8f82",
      500:"#58776d",
      600:"#465f57",
      700:"#354741",
      800:"#23302b",
      900:"#121816",
    }
  }
})

const router = createBrowserRouter([
  { path: "/", element: <Login/>, errorElement: <ErrorPage /> },
  { path: "/register", element:<Register/>, errorElement: <ErrorPage /> },
  { path: "/profile", element: <h1>Login</h1>, errorElement: <ErrorPage /> },
  { path: "/chats", element: <Chats/>, errorElement: <ErrorPage /> },
  {
    path: "/chats/:chat_id",
    element: <SingleChat/>,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return (
    <ChakraProvider theme={myTheme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
