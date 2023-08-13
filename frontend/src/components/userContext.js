import { useReducer, createContext, useContext } from "react";

const userStateContext = createContext();
const userDispatchContext = createContext();

function reducer (state,action) {
    switch (action.type) {
        case "login" : 
        return action.user;
        default : 
        return {}
    }
} 

export default function UserProvider({children}) {
    const [state,dispatch] = useReducer(reducer,{});

    return (
        <userDispatchContext.Provider value={dispatch}>
            <userStateContext.Provider value={state}>
                {children}
            </userStateContext.Provider>
        </userDispatchContext.Provider>
    )
}

export const useUserState = () => useContext(userStateContext);
export const useUserDispatch = () => useContext(userDispatchContext);



