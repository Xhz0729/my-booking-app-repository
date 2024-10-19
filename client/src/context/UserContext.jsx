import { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create a new UserContext to manage the user state across the app
export const UserContext = createContext({});

// Define the UserContextProvider component,
// to provide access to the user state
export function UserContextProvider({ children }) {
  // Declare the user state variable and setUser function using useState, initialized as null
  const [user, setUser] = useState(null);

  // It checks if the user is not set, then makes an API call to retrieve the user profile
  useEffect(() => {
    if (!user) {
      // Make a GET request to the /profile endpoint to fetch the user data
      axios.get("/profile").then(({ data }) => {
        // Update the user state with the retrieved data
        setUser(data);
      });
    }
  }, [user]);
  // Return the UserContext provider that wraps the child components
  // Pass the user state and setUser function to the context value so that child components can access and update the user state
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
