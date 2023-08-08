import { useReducer, useContext, createContext } from "react";


const searchStateContext = createContext();
const searchDispatchContext = createContext();

function reducer (state , action) {
    switch (action.type) {
        case "search" : 
        return {status : true , id : action.id}
        default : 
        return state;
    }
}

export default function SearchProvider({children}) {
    
    const [state,dispatch] = useReducer(reducer,{status : false, id : ""});

    return (
        <searchDispatchContext.Provider value={dispatch}>
            <searchStateContext.Provider value={state}>
                {children}
            </searchStateContext.Provider>
        </searchDispatchContext.Provider>
    )

}

export const searchState = () => useContext(searchStateContext);
export const searchDispatch = () => useContext(searchDispatchContext);