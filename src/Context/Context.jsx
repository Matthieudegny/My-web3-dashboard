import { createContext, useState, useEffect } from "react";

export const DashBoardContext = createContext();

const DashBoardContextProvider = (props) => {

    const [width, setWidth] = useState(window.innerWidth);
    const [mobileVersion, setMobileVersion] = useState(false)

    const breakpoint = 600;

    //find the width of the window
    useEffect(()=> {
        const handleResizeWindow = () => setWidth(window.innerWidth);
        // subscribe to window resize event "onComponentDidMount"
        window.addEventListener("resize", handleResizeWindow);
        return () => {
        // unsubscribe "onComponentDestroy"
        window.removeEventListener("resize", handleResizeWindow);
        };
    },[])

    //version mobile is true or not
    useEffect(() => {
        
        if (width>breakpoint) setMobileVersion(false)
        else setMobileVersion(true)
    
    }, [width])
  
    return(
        <DashBoardContext.Provider value={{mobileVersion}}>
            { props.children }
        </DashBoardContext.Provider>
    )
}

export default DashBoardContextProvider;

