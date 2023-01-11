import { NavLink, useHistory, Link } from "react-router-dom"
import React, { useState, useEffect } from "react"
import PerfectScrollbar from "perfect-scrollbar"
function Sidebar() {
  //State
  const [myUrl, setMyUrl] = useState(false)

  //Functions

  const addClass = (e) => {
    e.stopPropagation()
    if (window.location.href.split("#")[1] === "/") {
      setMyUrl(true)
    } else {
      setMyUrl(false)
    }
    document.querySelectorAll(".main-menu li a").forEach((item) => {
      item.closest("li").classList.remove("active")
    })
    // document.querySelector(".userdropdowncontainer").closest("li").classList.remove("active")
    e.target.closest("li").className = "active"
  }

  //UseEffect

  useEffect(() => {
    document.querySelectorAll(".main-menu li a").forEach((item) => {
      if (item.classList.contains("active")) {
        item.closest("li").classList.add("active")
      }
    })
    document.querySelectorAll(".userdropdownitem").forEach((item) => {
      if (item.classList.contains("active")) {
        document.querySelector(".userdropdowncontainer").closest("li").classList.add("active")
      }
    })
  }, [myUrl])

  useEffect(() => {
    //To initialise:

    const container = document.querySelector("#menuScroll")
    const ps = new PerfectScrollbar(container)
  })

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-1">
            <div className="menu">
              <div className="main-menu">
                <div id="menuScroll" className="scroll">
                  <ul className="list-unstyled">
                    <li onClick={addClass}>
                      <NavLink exact to="/">
                        <svg id="icon_user_info" xmlns="http://www.w3.org/2000/svg" width="13.594" height="13.596" viewBox="0 0 13.594 13.596">
                          <path
                            id="Path_19275"
                            data-name="Path 19275"
                            d="M5.24,0H.991A.992.992,0,0,0,0,.991V3.541a.992.992,0,0,0,.991.991H5.24a.992.992,0,0,0,.991-.991V.991A.992.992,0,0,0,5.24,0Zm0,0"
                            fill="#cbcbcb"
                          />
                          <path
                            id="Path_19276"
                            data-name="Path 19276"
                            d="M5.24,213.332H.991a.992.992,0,0,0-.991.991v5.948a.992.992,0,0,0,.991.991H5.24a.992.992,0,0,0,.991-.991v-5.948A.992.992,0,0,0,5.24,213.332Zm0,0"
                            transform="translate(0 -207.667)"
                            fill="#cbcbcb"
                          />
                          <path
                            id="Path_19277"
                            data-name="Path 19277"
                            d="M282.572,341.332h-4.249a.992.992,0,0,0-.991.991v2.549a.992.992,0,0,0,.991.991h4.249a.992.992,0,0,0,.991-.991v-2.549A.992.992,0,0,0,282.572,341.332Zm0,0"
                            transform="translate(-269.968 -332.268)"
                            fill="#cbcbcb"
                          />
                          <path
                            id="Path_19278"
                            data-name="Path 19278"
                            d="M282.572,0h-4.249a.992.992,0,0,0-.991.991V6.939a.992.992,0,0,0,.991.991h4.249a.992.992,0,0,0,.991-.991V.991A.992.992,0,0,0,282.572,0Zm0,0"
                            transform="translate(-269.968)"
                            fill="#cbcbcb"
                          />
                        </svg>
                        <span>Dashboards</span>
                      </NavLink>
                    </li>

                    <li onClick={addClass}>
                      <NavLink to="/Users">
                        <svg id="icon_user_info" xmlns="http://www.w3.org/2000/svg" width="16.988" height="14.823" viewBox="0 0 16.988 14.823">
                          <circle
                            id="Ellipse_238"
                            data-name="Ellipse 238"
                            cx="2.887"
                            cy="2.887"
                            r="2.887"
                            transform="translate(5.607)"
                            fill="#c1c1c1"
                          />
                          <circle
                            id="Ellipse_239"
                            data-name="Ellipse 239"
                            cx="1.825"
                            cy="1.825"
                            r="1.825"
                            transform="translate(12.509 2.123)"
                            fill="#c1c1c1"
                          />
                          <circle
                            id="Ellipse_240"
                            data-name="Ellipse 240"
                            cx="1.825"
                            cy="1.825"
                            r="1.825"
                            transform="translate(0.83 2.123)"
                            fill="#c1c1c1"
                          />
                          <path
                            id="Path_19171"
                            data-name="Path 19171"
                            d="M4.452,241.042a2.951,2.951,0,0,0-2.2-.511A2.249,2.249,0,0,0,0,242.771v3.624a.975.975,0,0,0,.976.972c2.323,0,2.044.042,2.044-.1C3.019,244.7,2.715,242.816,4.452,241.042Z"
                            transform="translate(0 -233.63)"
                            fill="#c1c1c1"
                          />
                          <path
                            id="Path_19172"
                            data-name="Path 19172"
                            d="M125.481,239.889a4.926,4.926,0,0,0-3.8.9c-1.82,1.458-1.47,3.421-1.47,5.822a1.164,1.164,0,0,0,1.162,1.162c7,0,7.282.226,7.7-.694.136-.311.1-.212.1-3.188A4.023,4.023,0,0,0,125.481,239.889Z"
                            transform="translate(-116.197 -232.974)"
                            fill="#c1c1c1"
                          />
                          <path
                            id="Path_19173"
                            data-name="Path 19173"
                            d="M380.01,240.533a2.949,2.949,0,0,0-2.2.511c1.724,1.76,1.433,3.515,1.433,6.224,0,.143-.232.1,2.009.1a1.01,1.01,0,0,0,1.011-1.007v-3.589A2.249,2.249,0,0,0,380.01,240.533Z"
                            transform="translate(-365.274 -233.632)"
                            fill="#c1c1c1"
                          />
                        </svg>

                        <span>User</span>
                      </NavLink>
                    </li>
                    <li onClick={addClass} className="expand_sidebar">
                      <NavLink to="/Drivers">
                        <svg id="icon_user_info" xmlns="http://www.w3.org/2000/svg" width="16.988" height="20" viewBox="0 0 20 20">
                          <path
                            id="Path_19826"
                            data-name="Path 19826"
                            d="M18.452,2.176a2.176,2.176,0,1,0-2.176,2.176A2.178,2.178,0,0,0,18.452,2.176Z"
                            fill="#c1c1c1"
                          />
                          <path
                            id="Path_19827"
                            data-name="Path 19827"
                            d="M16.276,4.352a3.728,3.728,0,0,0-3.724,3.724v.669a.586.586,0,0,0,.586.586h6.276A.586.586,0,0,0,20,8.745V8.075A3.728,3.728,0,0,0,16.276,4.352Z"
                            fill="#c1c1c1"
                          />
                          <path
                            id="Path_19828"
                            data-name="Path 19828"
                            d="M5.9,12.845a2.176,2.176,0,1,0-2.176,2.176A2.178,2.178,0,0,0,5.9,12.845Z"
                            fill="#c1c1c1"
                          />
                          <path
                            id="Path_19829"
                            data-name="Path 19829"
                            d="M3.724,15.021A3.728,3.728,0,0,0,0,18.745v.669A.586.586,0,0,0,.586,20H6.862a.586.586,0,0,0,.586-.586v-.669a3.728,3.728,0,0,0-3.724-3.724Z"
                            fill="#c1c1c1"
                          />
                          <path
                            id="Path_19830"
                            data-name="Path 19830"
                            d="M10.414,1.427,9.159.172A.586.586,0,0,0,8.33,1l.257.257A7.5,7.5,0,0,0,1.255,8.745a.586.586,0,0,0,1.172,0A6.325,6.325,0,0,1,8.583,2.429l-.253.253a.586.586,0,0,0,.829.829l1.255-1.255A.586.586,0,0,0,10.414,1.427Z"
                            fill="#c1c1c1"
                          />
                          <path
                            id="Path_19831"
                            data-name="Path 19831"
                            d="M18.159,10.669a.586.586,0,0,0-.586.586,6.325,6.325,0,0,1-6.156,6.316l.253-.253a.586.586,0,1,0-.829-.829L9.586,17.745a.586.586,0,0,0,0,.829l1.255,1.255A.586.586,0,0,0,11.67,19l-.257-.257a7.5,7.5,0,0,0,7.332-7.488.586.586,0,0,0-.586-.586Z"
                            fill="#c1c1c1"
                          />
                        </svg>
                        <span className="sidebar_text">Driver</span>
                      </NavLink>
                    </li>
                    {/* <li onClick={addClass}>
                <NavLink to="/Vehicles">
                  <svg id="icon_user_info" xmlns="http://www.w3.org/2000/svg" width="16.988" height="21" viewBox="0 0 20.918 21">
                    <g id="gear_1_" data-name="gear (1)" transform="translate(-0.041)">
                      <g id="Group_19448" data-name="Group 19448">
                        <path
                          id="Path_19835"
                          data-name="Path 19835"
                          d="M10.5,4.922a5.543,5.543,0,0,0-5.537,5.537v.615h1.23a.615.615,0,0,0,.615-.615,3.691,3.691,0,0,1,7.383,0,.615.615,0,0,0,.615.615h1.23v-.615A5.543,5.543,0,0,0,10.5,4.922Z"
                          fill="#cbcbcb"
                        />
                        <path
                          id="Path_19836"
                          data-name="Path 19836"
                          d="M20.344,7.383H19.2a9.214,9.214,0,0,0-.371-.9l.808-.808a.615.615,0,0,0,0-.87l-3.48-3.48a.615.615,0,0,0-.87,0l-.808.808a9.209,9.209,0,0,0-.9-.371V.615A.615.615,0,0,0,12.961,0H8.039a.615.615,0,0,0-.615.615V1.76a9.215,9.215,0,0,0-.9.371l-.808-.808a.615.615,0,0,0-.87,0L1.364,4.8a.615.615,0,0,0,0,.87l.808.808a9.21,9.21,0,0,0-.371.9H.656A.615.615,0,0,0,.041,8v2.461a.615.615,0,0,0,.615.615H3.732v-.615a6.768,6.768,0,0,1,13.535,0v.615h3.076a.615.615,0,0,0,.615-.615V8a.615.615,0,0,0-.615-.615Z"
                          fill="#cbcbcb"
                        />
                      </g>
                      <g id="Group_19449" data-name="Group 19449">
                        <path
                          id="Path_19837"
                          data-name="Path 19837"
                          d="M5.324,16.863a3.275,3.275,0,0,1-4.414,0,2.048,2.048,0,0,0-.869,1.676v1.846A.615.615,0,0,0,.656,21H5.578a.615.615,0,0,0,.615-.615V18.539A2.048,2.048,0,0,0,5.324,16.863Z"
                          fill="#cbcbcb"
                        />
                        <circle
                          id="Ellipse_489"
                          data-name="Ellipse 489"
                          cx="2.051"
                          cy="2.051"
                          r="2.051"
                          transform="translate(1.066 12.387)"
                          fill="#cbcbcb"
                        />
                        <path
                          id="Path_19838"
                          data-name="Path 19838"
                          d="M20.09,16.863a3.275,3.275,0,0,1-4.414,0,2.048,2.048,0,0,0-.869,1.676v1.846a.615.615,0,0,0,.615.615h4.922a.615.615,0,0,0,.615-.615V18.539A2.048,2.048,0,0,0,20.09,16.863Z"
                          fill="#cbcbcb"
                        />
                        <circle
                          id="Ellipse_490"
                          data-name="Ellipse 490"
                          cx="2.051"
                          cy="2.051"
                          r="2.051"
                          transform="translate(15.832 12.387)"
                          fill="#cbcbcb"
                        />
                        <path
                          id="Path_19839"
                          data-name="Path 19839"
                          d="M12.707,16.863a3.275,3.275,0,0,1-4.414,0,2.048,2.048,0,0,0-.869,1.676v1.846A.615.615,0,0,0,8.039,21h4.922a.615.615,0,0,0,.615-.615V18.539A2.048,2.048,0,0,0,12.707,16.863Z"
                          fill="#cbcbcb"
                        />
                        <circle
                          id="Ellipse_491"
                          data-name="Ellipse 491"
                          cx="2.051"
                          cy="2.051"
                          r="2.051"
                          transform="translate(8.449 12.387)"
                          fill="#cbcbcb"
                        />
                      </g>
                    </g>
                  </svg>
                  <span>Vehicle</span>
                </NavLink>
              </li> */}
                    <li className="hover_tab">
                      <div className="sideBarCard">
                        <div className="menu">
                          <ul>
                            <li className="">
                              <Link to="/VehicleConfig" className="sidebar_outer">
                                <span className="sidebar_heading heading_title_side">Vehicle </span>
                              </Link>
                            </li>
                            <li className="">
                              <Link to="/ManageConstants" className="sidebar_outer">
                                <span className="sidebar_heading heading_title_side">Constants </span>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <a>
                        <svg id="icon_user_info" xmlns="http://www.w3.org/2000/svg" width="16.988" height="24" viewBox="0 0 24 24">
                          <path
                            id="Path_19820"
                            data-name="Path 19820"
                            d="M3.516,21.188H6.375a.7.7,0,0,0,.7-.7V13.359a.7.7,0,0,0-.7-.7H3.516a.7.7,0,0,0-.7.7v7.125A.7.7,0,0,0,3.516,21.188Zm.7-7.125H5.672v5.719H4.219Z"
                            fill="#c1c1c1"
                          />
                          <path
                            id="Path_19821"
                            data-name="Path 19821"
                            d="M9.188,7.031a.7.7,0,0,0-.7.7v12.75a.7.7,0,0,0,.7.7H12a.7.7,0,0,0,.7-.7V7.734a.7.7,0,0,0-.7-.7ZM11.3,19.781H9.891V8.438H11.3Z"
                            fill="#c1c1c1"
                          />
                          <path
                            id="Path_19822"
                            data-name="Path 19822"
                            d="M14.813,9.844a.7.7,0,0,0-.7.7v9.938a.7.7,0,0,0,.7.7h2.813a.7.7,0,0,0,.7-.7V10.547a.7.7,0,0,0-.7-.7Zm2.109,9.938H15.516V11.25h1.406Z"
                            fill="#c1c1c1"
                          />
                          <path
                            id="Path_19823"
                            data-name="Path 19823"
                            d="M20.438,5.625a.7.7,0,0,0-.7.7V20.484a.7.7,0,0,0,.7.7H23.3a.7.7,0,0,0,.7-.7V6.328a.7.7,0,0,0-.7-.7Zm2.156,14.156H21.141V7.031h1.453Z"
                            fill="#c1c1c1"
                          />
                          <path
                            id="Path_19824"
                            data-name="Path 19824"
                            d="M4.969,11.25A2.108,2.108,0,0,0,6.843,8.175L9.52,5.33a2.1,2.1,0,0,0,2.536-.3l2.069,1.035A2.109,2.109,0,1,0,18.232,5.7l2.444-1.833a2.1,2.1,0,0,0,1.168.354A2.148,2.148,0,0,0,24,2.109,2.148,2.148,0,0,0,21.844,0a2.11,2.11,0,0,0-2.013,2.74L17.387,4.573a2.1,2.1,0,0,0-2.631.238L12.686,3.776a2.109,2.109,0,1,0-4.073.466L5.819,7.211a2.1,2.1,0,0,0-.851-.18,2.11,2.11,0,1,0,0,4.219ZM21.844,1.406a.747.747,0,0,1,.75.7.747.747,0,0,1-.75.7.7.7,0,0,1,0-1.406ZM16.219,5.625a.7.7,0,1,1-.7.7A.7.7,0,0,1,16.219,5.625ZM10.594,2.813a.7.7,0,1,1-.7.7A.7.7,0,0,1,10.594,2.813ZM4.969,8.438a.7.7,0,0,1,0,1.406.7.7,0,1,1,0-1.406Z"
                            fill="#c1c1c1"
                          />
                          <path
                            id="Path_19825"
                            data-name="Path 19825"
                            d="M.7,24H23.3a.7.7,0,0,0,0-1.406H1.406V.7A.7.7,0,0,0,0,.7V23.3A.7.7,0,0,0,.7,24Z"
                            fill="#c1c1c1"
                          />
                        </svg>

                        <span>Configurations</span>
                      </a>
                    </li>
                    <li onClick={addClass}>
                      <NavLink to="/PromoCodes">
                        <svg id="icon_user_info" xmlns="http://www.w3.org/2000/svg" width="16.988" height="24" viewBox="0 0 24 24">
                          <path
                            id="Path_19832"
                            data-name="Path 19832"
                            d="M18.411,9.566a.7.7,0,1,0,0,.994A.7.7,0,0,0,18.411,9.566Zm0,0"
                            fill="#c1c1c1"
                          />
                          <path
                            id="Path_19833"
                            data-name="Path 19833"
                            d="M10.456,9.566a.7.7,0,1,0,0,.994A.7.7,0,0,0,10.456,9.566Zm0,0"
                            fill="#c1c1c1"
                          />
                          <path
                            id="Path_19834"
                            data-name="Path 19834"
                            d="M15.428.617a2.112,2.112,0,0,0-2.983,0L3.4,9.66a.7.7,0,0,0,0,.994l1.989,1.989a.7.7,0,0,1-.994.994L2.408,11.649a.7.7,0,0,0-.994,0l-.8.8a2.111,2.111,0,0,0,0,2.983l7.955,7.955a2.111,2.111,0,0,0,2.983,0l.8-.8a.7.7,0,0,0,0-.994L10.363,19.6a.7.7,0,1,1,.994-.994L13.346,20.6a.7.7,0,0,0,.994,0l9.043-9.043a2.112,2.112,0,0,0,0-2.983Zm-6.06,17a.7.7,0,0,1-.994,0L6.385,15.626a.7.7,0,0,1,.994-.994L9.368,16.62A.7.7,0,0,1,9.368,17.615Zm2.082-6.06a2.109,2.109,0,1,1,0-2.983A2.111,2.111,0,0,1,11.451,11.555Zm3.618,4.17a.7.7,0,0,1-.827-.552L12.253,5.229a.7.7,0,1,1,1.379-.276L15.621,14.9a.7.7,0,0,1-.552.827Zm4.337-4.17a2.109,2.109,0,1,1,0-2.983A2.112,2.112,0,0,1,19.406,11.555Zm0,0"
                            fill="#c1c1c1"
                          />
                        </svg>
                        <span>Promo Codes</span>
                      </NavLink>
                    </li>
                    <li onClick={addClass}>
                      <NavLink to="/Referals">
                        <svg id="icon_user_info" xmlns="http://www.w3.org/2000/svg" width="16.988" height="17.297" viewBox="0 0 17.297 17.297">
                          <path
                            id="Path_19189"
                            data-name="Path 19189"
                            d="M210.1,3.885a1.607,1.607,0,0,0,1.6-1.6V1.6a1.6,1.6,0,1,0-3.209,0V2.28A1.607,1.607,0,0,0,210.1,3.885Z"
                            transform="translate(-201.456)"
                            fill="#c1c1c1"
                          />
                          <path
                            id="Path_19190"
                            data-name="Path 19190"
                            d="M183.534,423.6a2.276,2.276,0,0,1-1.748-.818,2.526,2.526,0,0,0-.786,1.832v.676a.507.507,0,0,0,.507.507h4.054a.507.507,0,0,0,.507-.507v-.676a2.526,2.526,0,0,0-.786-1.832A2.276,2.276,0,0,1,183.534,423.6Z"
                            transform="translate(-174.885 -408.502)"
                            fill="#c1c1c1"
                          />
                          <path
                            id="Path_19191"
                            data-name="Path 19191"
                            d="M38.767,129.472a1.268,1.268,0,0,0,1.267-1.267v-.676a1.269,1.269,0,0,0-.76-1.161v-.309a.846.846,0,0,1,.845-.845h4.257v1.153a1.269,1.269,0,0,0-.76,1.161v.676a1.267,1.267,0,1,0,2.534,0v-.676a1.269,1.269,0,0,0-.76-1.161v-1.153h4.257a.846.846,0,0,1,.845.845v.309a1.269,1.269,0,0,0-.76,1.161v.676a1.267,1.267,0,0,0,2.534,0v-.676a1.269,1.269,0,0,0-.76-1.161v-.309a1.86,1.86,0,0,0-1.858-1.858H45.388v-1.047h2.2a.507.507,0,0,0,.507-.507v-.676a3.206,3.206,0,0,0-1.267-2.553,2.614,2.614,0,0,1-3.884,0,3.206,3.206,0,0,0-1.267,2.553v.676a.507.507,0,0,0,.507.507h2.2V124.2H40.118a1.86,1.86,0,0,0-1.858,1.858v.309a1.269,1.269,0,0,0-.76,1.161v.676A1.268,1.268,0,0,0,38.767,129.472Z"
                            transform="translate(-36.233 -115.385)"
                            fill="#c1c1c1"
                          />
                          <path
                            id="Path_19192"
                            data-name="Path 19192"
                            d="M2.534,423.6a2.276,2.276,0,0,1-1.748-.818A2.526,2.526,0,0,0,0,424.617v.676a.507.507,0,0,0,.507.507H4.561a.507.507,0,0,0,.507-.507v-.676a2.526,2.526,0,0,0-.786-1.832A2.276,2.276,0,0,1,2.534,423.6Z"
                            transform="translate(0 -408.502)"
                            fill="#c1c1c1"
                          />
                          <path
                            id="Path_19193"
                            data-name="Path 19193"
                            d="M366.282,422.785a2.277,2.277,0,0,1-3.5,0,2.526,2.526,0,0,0-.786,1.832v.676a.507.507,0,0,0,.507.507h4.054a.507.507,0,0,0,.507-.507v-.676A2.526,2.526,0,0,0,366.282,422.785Z"
                            transform="translate(-349.771 -408.502)"
                            fill="#c1c1c1"
                          />
                        </svg>
                        <span>Referrals</span>
                      </NavLink>
                    </li>

                    {/* <li onClick={addClass}>
                <NavLink to="/UserCardDetails">
                  <svg id="icon_user_info" xmlns="http://www.w3.org/2000/svg" width="23.133" height="18.505" viewBox="0 0 23.133 18.505">
                    <path
                      id="Icon_material-payment"
                      data-name="Icon material-payment"
                      d="M23.819,6H5.313a2.3,2.3,0,0,0-2.3,2.313L3,22.192a2.305,2.305,0,0,0,2.313,2.313H23.819a2.305,2.305,0,0,0,2.313-2.313V8.313A2.305,2.305,0,0,0,23.819,6Zm0,16.192H5.313v-6.94H23.819Zm0-11.566H5.313V8.313H23.819Z"
                      transform="translate(-3 -6)"
                      fill="#c1c1c1"
                    />
                  </svg>
                  <span>User Card Details</span>
                </NavLink>
              </li> */}
                    <li onClick={addClass}>
                      <NavLink to="/DriverAccountDetails">
                        <svg xmlns="http://www.w3.org/2000/svg" id="icon_user_info" width="16.988" height="14.823" viewBox="0 0 23.133 18.505">
                          <path
                            id="Icon_material-payment"
                            data-name="Icon material-payment"
                            d="M23.819,6H5.313a2.3,2.3,0,0,0-2.3,2.313L3,22.192a2.305,2.305,0,0,0,2.313,2.313H23.819a2.305,2.305,0,0,0,2.313-2.313V8.313A2.305,2.305,0,0,0,23.819,6Zm0,16.192H5.313v-6.94H23.819Zm0-11.566H5.313V8.313H23.819Z"
                            transform="translate(-3 -6)"
                            fill="#c1c1c1"
                          />
                        </svg>
                        <span>Driver Account Details</span>
                      </NavLink>
                    </li>
                    <li onClick={addClass}>
                      <NavLink to="/DeliveryTransaction">
                        <svg id="icon_user_info" xmlns="http://www.w3.org/2000/svg" width="16.988" height="21.957" viewBox="0 0 22 21.957">
                          <g id="transaction_1_" data-name="transaction (1)" transform="translate(0 -0.021)">
                            <g id="Group_19451" data-name="Group 19451">
                              <g id="Group_19450" data-name="Group 19450">
                                <path
                                  id="Path_19842"
                                  data-name="Path 19842"
                                  d="M7.548,12.672v.858a3.524,3.524,0,0,0,2.573,3.359v1.831h1.715V16.892a3.5,3.5,0,0,0,2.573-3.348,2.932,2.932,0,0,0-1.08-2.258,9.66,9.66,0,0,0-1.938-1.21l-.016-.009c-1.193-.622-1.726-1.058-1.726-2a1.33,1.33,0,0,1,2.659.016v.858h1.715V8.084A3.013,3.013,0,0,0,11.836,5.2V3.281H10.121V5.2A3,3,0,0,0,7.934,8.068c0,2.14,1.658,3,2.648,3.52l.016.009c1.3.677,2.1,1.134,2.1,1.947a1.753,1.753,0,0,1-1.715,1.744A1.783,1.783,0,0,1,9.263,13.53v-.858H7.548Z"
                                  fill="#cbcbcb"
                                />
                                <path
                                  id="Path_19843"
                                  data-name="Path 19843"
                                  d="M11.021,20.263a9.2,9.2,0,0,1-7.978-4.546H6V14H0v6H1.715V16.83a10.985,10.985,0,0,0,9.306,5.149A10.942,10.942,0,0,0,21.957,11H20.242A9.252,9.252,0,0,1,11.021,20.263Z"
                                  fill="#cbcbcb"
                                />
                                <path
                                  id="Path_19844"
                                  data-name="Path 19844"
                                  d="M20.285,1.994V5.17A10.98,10.98,0,0,0,0,11H1.715A9.267,9.267,0,0,1,18.956,6.283H16V8h6v-6Z"
                                  fill="#cbcbcb"
                                />
                              </g>
                            </g>
                          </g>
                        </svg>
                        <span>Delivery Transaction</span>
                      </NavLink>
                    </li>
                    <li onClick={addClass}>
                      <NavLink to="/Warnings">
                        <svg id="icon_user_info" xmlns="http://www.w3.org/2000/svg" width="16.988" height="21.286" viewBox="0 0 22.924 21.286">
                          <path
                            id="Icon_ionic-md-warning"
                            data-name="Icon ionic-md-warning"
                            d="M2.25,24.661H25.173L13.712,3.375Zm12.69-3.275H12.483V18.93H14.94Zm0-4.093H12.483V12.38H14.94Z"
                            transform="translate(-2.25 -3.375)"
                            fill="#c1c1c1"
                          />
                        </svg>
                        <span>Warning</span>
                      </NavLink>
                    </li>
                    <li onClick={addClass}>
                      <NavLink to="/Support">
                        <img src="img/Support-icon.png" alt="sidebar-icon" />
                        <span>Support</span>
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
