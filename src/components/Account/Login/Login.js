import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import Swal from "sweetalert2"
import AuthService from "../../../services/AuthService"
import Loader from "../../../shared/Loader"

const Login = () => {
  //Services
  const authservice = new AuthService()

  //State
  const [login, setLogin] = useState({
    email: "",
    password: "",
  })
  const [loader, setloader] = useState(true)
  const [btnLock, setBtnLock] = useState(false)
  const [emptyValidation, setEmptyValidation] = useState({
    emailEmpty: "",
    passwordEmpty: false,
  })
  const history = useHistory()
  // //UseEffect
  useEffect(() => {
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    if (JSON.parse(localStorage.getItem("errand_user"))) {
      history.push("/")
    } else {
      setloader(false)
    }
  }, [])

  //Functions
  const handleSubmit = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    let validCount = 0
    const c = { ...emptyValidation }

    if (login.email === "") {
      c.emailEmpty = "Email is required"
      validCount++
    } else {
      c.emailEmpty = ""
    }

    if (login.password === "") {
      c.passwordEmpty = true
      validCount++
    } else {
      c.passwordEmpty = false
    }

    setEmptyValidation(c)

    if (validCount > 0) {
      return
    }

    setBtnLock(true)

    try {
      const response = await authservice.login(login)

      if (response.data.code === 1) {
        setBtnLock(false)
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Logged In",
          showConfirmButton: true,
          timer: 5000,
        })
        localStorage.setItem("errand_user", JSON.stringify(response.data.data))
        history.push("/")
        window.location.reload()
      }

      if (response.data.code === 0) {
        setBtnLock(false)
        Swal.fire({
          position: "center",
          icon: "error",
          title: response.data.data.message,
          showConfirmButton: true,
          timer: 5000,
        })
      }
    } catch (error) {
      debugger
      console.log(error)
      // setBtnLock(true)
      // if (response.data.code === 0) {
      //   setBtnLock(false)
      //   Swal.fire({
      //     position: "center",
      //     icon: "error",
      //     title: response.data.data.message,
      //     showConfirmButton: true,
      //     timer: 5000,
      //   })
      // }
    }
  }

  return (
    <>
      {loader ? (
        <div className="loadercontainer">
          <div class="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
      <body class=" no-footer">
        <div class="Slogin">
          <main class="default-transition login-transition">
            <div class="container">
              <div class="row h-100">
                <div class="col-12 col-md-10 mx-auto my-auto">
                  <div class="card auth-card">
                    <div class="form-side">
                      <div class="login-logo">
                        <img src="./img/Logo.png" alt="" />
                        <h6 class="form-side__title mb_40">Login</h6>
                      </div>

                      <form method="post" onSubmit={handleSubmit}>
                        <div class="form-row">
                          <label class="form-side__form-group  form-group col-md-12">
                            <div>
                              <input
                                type="email"
                                name="uname"
                                placeholder="randy.hudson@mail.com"
                                className="form-control"
                                onChange={(e) => {
                                  const c = { ...login }
                                  c.email = e.target.value
                                  setLogin(c)
                                }}
                                id="email-address"
                              />
                            </div>
                            {emptyValidation.emailEmpty.length !== 0 ? (
                              <p style={{ marginTop: "5px", color: "red" }}>{emptyValidation.emailEmpty} </p>
                            ) : (
                              ""
                            )}
                          </label>
                          <label class="form-side__form-group form-group col-md-12">
                            <div>
                              <input
                                type="password"
                                name="uname"
                                className="form-control"
                                placeholder="Enter Password"
                                onChange={(e) => {
                                  const c = { ...login }
                                  c.password = e.target.value
                                  setLogin(c)
                                }}
                                id="password"
                              />
                            </div>
                            {emptyValidation.passwordEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Password is required </p> : ""}
                          </label>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                          <button disabled={btnLock} type="submit" className="btn btn-primary form-side__btn ">
                            Login
                            {btnLock ? <div class="btnloader">{Loader}</div> : ""}
                          </button>
                        </div>
                        <div class="form-side__password mt_20">
                          <h6>
                            Don't remember your password? <Link to="/account/forgotpassword">Forgot Password</Link>
                          </h6>
                        </div>
                        {/* <div class="form-side__register mt_10">
                          <h6>Don't have an account? <Link to="/account/register">Register Now</Link></h6>

                        </div> */}
                      </form>
                    </div>
                    <div class="position-relative image-side "></div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </body>
    </>
  )
}

export default Login
