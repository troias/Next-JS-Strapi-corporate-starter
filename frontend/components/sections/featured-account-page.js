import React, { useContext } from "react";
import AuthContext from "../../context/authContext";
import ButtonLink from "../elements/button-link";
import { getButtonAppearance } from "../../utils/button";
import { useRouter } from "next/router"

const featuredAccountPage = ({ data }) => {
    const router = useRouter()
    console.log("featuredAccountPageData", data);
    const { user } = useContext(AuthContext);
    let loginButton;
    let signupButton;
    let logoutButton;

    loginButton = data.authBtns.find((button) => button.text === "Login");
    signupButton = data.authBtns.find((button) => button.text === "Signup");
    logoutButton = data.authBtns.find((button) => button.text === "Logout");

    console.log("loginbtn", loginButton);
    console.log("accountUser", user)
    return (
        <div className="flex-col justify-center">

            <div className="flex justify-center mt-10 mb-10">
            
            {!user && (
              < div className="flex">
                <div className=" sm:mr-2 ml-2 ">
                  <ButtonLink
                    appearance={getButtonAppearance(loginButton)}
                    button={loginButton}
                    locale={router.locale}
                    onClick={() => {
                      router.push("/login")
                    }}
                  />
                </div>
                <div className="sm:mr-2">
                  <ButtonLink
                    appearance={getButtonAppearance(signupButton)}
                    button={signupButton}
                    locale={router.locale}
                    onClick={() => {
                      router.push("/signup")
                    }}
                  />
                </div>
              </div>
            )}

            </div>



            {user && <ButtonLink button={logoutButton} appearance={getButtonAppearance(logoutButton)} />}

        </div>
    );
};

export default featuredAccountPage;
