import { useState, useContext, useEffect } from "react"
import PropTypes from "prop-types"
import Link from "next/link"
import { useRouter } from "next/router"
import AuthContext from "../../context/authContext"
import { getButtonAppearance } from "utils/button"
import { mediaPropTypes, linkPropTypes, buttonLinkPropTypes } from "utils/types"
import { MdMenu } from "react-icons/md"
import MobileNavMenu from "./mobile-nav-menu"
import Button from "./button"
import ButtonLink from "./button-link"
import NextImage from "./image"
import CustomLink from "./custom-link"
import LocaleSwitch from "../locale-switch"

const Navbar = ({ navbar, pageContext }) => {
  const { user, logOutUser, checkIsLoggedIn } = useContext(AuthContext)

  useEffect(() => {
    const inLocalStorage = localStorage.getItem("user")
    if (inLocalStorage) {
      const loggedIn = checkIsLoggedIn()
      if (!loggedIn) {
        logOutUser()
      }
    }
  }, [])
 
  const logOut = () => {
    logOutUser()
   localStorage.removeItem("user") 
   console.log("userLogOutfunc", user)
  }

  console.log("userContext", user)
  console.log("checkIsLoggedIn", checkIsLoggedIn())
  const router = useRouter()
  const [mobileMenuIsShown, setMobileMenuIsShown] = useState(false)


  let loginButton;
  let signupButton;
  let logoutButton;


  logoutButton = navbar.auth.authLinks.find(button => button.text === "Logout")
  loginButton = navbar.auth.authLinks.find((button) => button.text === "Login");
  signupButton = navbar.auth.authLinks.find((button) => button.text === "Signup");

  console.log("logoutButton", logoutButton)
  
  const isLoggedIn = checkIsLoggedIn()

  // isLoggedIn ? (loginButton = null) : (signupButton = null)

  let authButtons

  if ( user && isLoggedIn && logoutButton) {

    console.log("userLogOutfunc", user)
    console.log("isLoggedIn", isLoggedIn)
 

    authButtons = (   < div className="hidden lg:flex">
      <Button
      button={logoutButton}
        appearance={getButtonAppearance("secondary", "light")}
        handleClick={logOut}
      />
     
    </div>)

      {/* <button onClick={() => {
        logOutUser()
      
        localStorage.removeItem("user")

      }
      }>Logout</button> */}
  
    
  }
 


  
  if (!user && !checkIsLoggedIn()) {
    authButtons =  < div className="hidden lg:flex">
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
  }



  return (
    <>
      {/* The actual navbar */}
      <nav className="border-gray-200 border-b-2 py-6 sm:py-2 bg-white">
        <div className="container flex flex-row items-center justify-between">
          {/* Content aligned to the left */}
          <div className="flex flex-row items-center">
            <Link href="/">
              <a className="h-8 w-32">
                <NextImage width="120" height="33" media={navbar.logo} />
              </a>
            </Link>
            {/* List of links on desktop */}
            <ul className="hidden list-none md:flex flex-row gap-4 items-baseline ml-10">
              {navbar.links.map((navLink) => (
                <li key={navLink.id}>
                  <CustomLink link={navLink} locale={router.locale}>
                    <div className="hover:text-white px-2 py-1">
                      {navLink.text}
                    </div>
                  </CustomLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex">
            {/* Locale Switch Mobile */}
            {/* {pageContext.localizedPaths && (
              <div className="md:hidden">
                <LocaleSwitch pageContext={pageContext} />
              </div>
            )} */}
            {/* Hamburger menu on mobile */}
            <button
              onClick={() => setMobileMenuIsShown(true)}
              className="p-1 block lg:hidden"
            >
              <MdMenu className="h-8 w-auto" />
            </button>
            {/* CTA button on desktop */}
            {authButtons}
            {/* Locale Switch Desktop */}
            {/* {pageContext.localizedPaths && (
              <div className="hidden md:block">
                <LocaleSwitch pageContext={pageContext} />
              </div>
            )} */}
          </div>
        </div>
      </nav>

      {/* Mobile navigation menu panel */}
      {mobileMenuIsShown && (
        <MobileNavMenu
          navbar={navbar}
          closeSelf={() => setMobileMenuIsShown(false)}
        />
      )}
    </>
  )
}

Navbar.propTypes = {
  navbar: PropTypes.shape({
    logo: PropTypes.shape({
      image: mediaPropTypes,
      url: PropTypes.string,
    }),
    links: PropTypes.arrayOf(linkPropTypes),
    button: buttonLinkPropTypes,
  }),
  initialLocale: PropTypes.string,
}

export default Navbar
