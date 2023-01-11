import moment from "moment"
import React, { useState, useEffect } from "react"
import { Redirect, Route } from "react-router-dom"
import { compare } from "../../shared/CompareTIme"

// const PrivateRoute = ({ component: Component, ...rest }) => {
//   //UseState
//   const [isExpiredTime, setIsExpiredTime] = useState(false)
//   //UseEffect
//   useEffect(() => {
//     checkExpiryTime()
//   }, [Component])

//   const checkExpiryTime = () => {
//     debugger
//     if (JSON.parse(localStorage.getItem("errand_user"))) {
//       if (
//         compare(
//           moment(new Date()).format("HH:mm:ss"),
//           moment(JSON.parse(localStorage.getItem("errand_user")).token.expiration).format("HH:mm:ss")
//         ) === 1
//       ) {
//         localStorage.removeItem("errand_user")
//         setIsExpiredTime(true)
//       }
//     } else {
//       setIsExpiredTime(true)
//     }
//   }

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         !isExpiredTime ? <Component {...props} /> : <Redirect to={{ pathname: "/account/login", state: { from: props.location } }} />
//       }
//     />
//   )
// }

// export default PrivateRoute

const PrivateRoute = ({ component: Component, ...rest }) => {
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]))
    } catch (e) {
      return null
    }
  }

  if (JSON.parse(localStorage.getItem("errand_user")) === null) {
    return <Route {...rest} render={(props) => <Redirect to={{ pathname: "/account/login", state: { from: props.location } }} />} />
  }
  const user = JSON.parse(localStorage.getItem("errand_user")).token
  if (parseJwt(user.token).exp * 1000 < Date.now()) {
    return <Route {...rest} render={(props) => <Redirect to={{ pathname: "/account/login", state: { from: props.location } }} />} />
  } else {
    return <Route {...rest} render={(props) => <Component {...props} />} />
  }
}
export default PrivateRoute
