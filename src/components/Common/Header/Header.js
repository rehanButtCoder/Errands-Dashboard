import moment from "moment"
import { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { compare } from "../../../shared/CompareTIme"
function Header() {
  //State
  const history = useHistory()
  const [userData, setUserData] = useState({})

  //UseEffect
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("errand_user"))) {
      setUserData(JSON.parse(localStorage.getItem("errand_user")).user)
    }
  }, [])
  //Functions
  // const logout = (evt) => {
  //   evt.preventDefault()
  //   localStorage.removeItem("user")
  //   history.push("/account/login")
  // }

  const removeClass = (e) => {
    e.preventDefault()
    e.stopPropagation()
    document.querySelectorAll(".main-menu li a").forEach((item) => {
      item.closest("li").classList.remove("active")
    })
    document.querySelector(".userdropdowncontainer").closest("li").classList.remove("active")
    document.querySelector(".navbar-right .dropdown-menu-right").classList.remove("show")
    history.push("/Profile")
  }

  const logout = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
    localStorage.removeItem("errand_user")
    // document.querySelector(".userdropdownmenu").remove()
    history.push("/account/login")
  }

  const toggleMenu = () => {
    document.querySelector(".menu .main-menu").classList.toggle("mainmenu_active")
    document.querySelector(".menu-button").classList.toggle("logo_active")
    // document.querySelector(".userdropdownmenu").classList.toggle("userdropdownmenu_sidebaractive")
    document.querySelector("main").classList.toggle("main_sidebaractive")
  }

  // const checkExpiryTime = () => {
  //   if (JSON.parse(localStorage.getItem("errand_user"))) {
  //     if (
  //       compare(
  //         moment(new Date()).format("HH:mm:ss"),
  //         moment(JSON.parse(localStorage.getItem("errand_user")).token.expiration).format("HH:mm:ss")
  //       ) === 1
  //     ) {
  //       localStorage.removeItem("errand_user")
  //       history.push("/account/login")
  //     }
  //   } else {
  //     localStorage.removeItem("errand_user")
  //     history.push("/account/login")
  //   }
  // }

  // setInterval(() => {
  //   checkExpiryTime()
  // }, 300000)

  return (
    <div>
      <div id="app-container" className="menu-default show-spinner">
        <nav className="navbar fixed-top">
          <div className="d-flex align-items-center navbar-left">
            <button className="menu-button d-none d-md-block">{/* <img src="./img/icon_progress.svg" alt="menu-list" /> */}</button>
            <Link className="navbar-logo" to="/">
              <img className="logo d-none d-xs-block" src="./img/logo.png" alt="logo" />
              <img className="logo-mobile d-block d-xs-none" src="./img/logo.png" alt="mobile-logo" />
            </Link>

            <button className="menu-button-mobile d-xs-block d-sm-block d-md-none">
              <img src="./img/icon_progress.svg" alt="menu-list" />
            </button>
          </div>

          <div className="navbar-right">
            <div class="navbar-items-use">
              <div class="use-icons">
                <Link to="/Queries">
                  <img src="./img/icon_Query.png" alt="" />
                </Link>
                <Link to="/Notifications">
                  <img src="./img/Notification.svg" alt="" />
                </Link>
              </div>
            </div>
            <div class="user d-inline-block">
              <button
                id="dropdownMenuButton"
                class="btn btn-empty p-0"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span class="name">{userData ? userData.firstName : "admin default"}</span>
                <span>
                  <img
                    alt="Profile_Picture"
                    src={userData ? "/img/img-login.png" : "http://3.120.158.132:82" + userData.ProfilePicture}
                    className="admin-pic"
                  />
                </span>
              </button>
              <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                {/* <a onClick={removeClass} class="dropdown-item" href="gotoprofile">
                  Profile
                </a> */}
                <a onClick={logout} class="dropdown-item" href="gotologin">
                  Sign out
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}
export default Header
