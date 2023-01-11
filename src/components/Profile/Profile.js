import React, { useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import Loader from "../../shared/Loader"
function Profile() {
  //State
  const history = useHistory()
  const [user, setUser] = useState({})
  const [loader, setLoader] = useState(true)
  //Fucntions
  const logout = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
    localStorage.removeItem("makhtabquser")
    document.querySelector(".userdropdownmenu").remove()
    history.push("/account/login")
  }

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("makhtabquser")))
    setLoader(false)
  }, [])
  return (
    <main>
      <div class="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="headertopbar">
              <Link to="/" className="headertopbar_title">
                {" "}
                <img className="headertopbar__arrowimage" alt="back arrow" src="./img/Icon ionic-ios-arrow-back.png" /> Profile
              </Link>
              <div className="superadmin-buttons">
                <Link class="superadmin-logout btn btn_primary" to="/account/login" onClick={logout}>
                  Log Out
                </Link>
              </div>
            </div>
          </div>
          <div className="col-12 column_margin">
            <div className="card_custom">
              {loader ? (
                Loader
              ) : (
                <div className="row align-items-center">
                  <div className="col-md-3">
                    <img
                      alt="Profile_Picture"
                      src={"http://3.120.158.132:82" + user.ProfilePicture}
                      style={{ width: "65%", height: "150px", borderRadius: "15px" }}
                    />
                  </div>
                  <div className="col-md-9">
                    <div className="row">
                      <div className="col-md-4">
                        <h3 className="view-profile-name">Full Name</h3>
                        <h4 className="view-profile-user-name">{user.Name}</h4>
                      </div>
                      <div className="col-md-4">
                        <h3 className="view-profile-name">Phone Number</h3>
                        <h4 className="view-profile-user-name">{user.Phone}</h4>
                      </div>
                      <div className="col-md-4">
                        <h3 className="view-profile-name">Email</h3>
                        <h4 className="view-profile-user-name">{user.Email}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Profile
