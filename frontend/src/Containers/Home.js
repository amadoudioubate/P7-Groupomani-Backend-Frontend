import React, { useContext } from "react";
import { UidContext } from "../context/UidContext";
import Thread from "../Components/Thread/Thread";
import LoginForm from "../Components/Log/LoginForm/LoginForm";
import LogoGroupomania from "../Components/LogoGroupomania/LogoGroupomania";


function Home() {
  const uid = useContext(UidContext);

  return (
    <>
        {uid ? (
            <div className="home">
                <Thread />
            </div>
          ) : (
            <>
                <LogoGroupomania />
                <LoginForm />
            </>
        )}
    </>
  );
};

export default Home;