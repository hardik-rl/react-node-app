// import { createContext, useState } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [role, setRole] = useState("user");
//   const permissions = {
//     admin: ["view:dashboard", "edit:user"],
//     user: ["view:dashboard"],
//   };

//   return (
//     <AuthContext.Provider value={{ role, permissions: permissions[role] }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState("user"); 
  const permissionsMap = {
    admin: ["view:dashboard", "edit:user"],
    user: ["view:dashboard"],
  };

  const value = {
    role,
    permissions: permissionsMap[role],
    setRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
