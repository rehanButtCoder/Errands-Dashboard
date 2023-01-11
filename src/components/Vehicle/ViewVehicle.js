import React from "react"
import { Link } from "react-router-dom"

function ViewVehicle() {
  return (
    <div>
      <main>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="topheader">
                <Link className="btnscontainer__btn" to="/Vehicles">
                  <h2 className="topheader__title">
                    <img src="./img/icon_back.svg" alt="" />
                    View vehicle
                  </h2>
                </Link>
              </div>
            </div>
          </div>
          <div className="row mb-12">
            <div className="col-lg-12 col-md-12 mb-4">
              <div className="card">
                <div className="card-body_view">
                  <div className="formwithimageview">
                    <div className="formwithimageview__column">
                      <div className="imgupload">
                        <img id="output" src="./img/truck_img.png" alt="" />
                      </div>
                    </div>
                    <div className="formwithimageview__column">
                      <div className="row">
                        <div className="form-group col-md-3 select_forms">
                          <label>Driver Name</label>
                          <input type="text" className="form-edit" value="Company" />
                        </div>
                        <div className="form-group col-md-3 select_forms">
                          <label>Mark</label>
                          <input type="text" className="form-edit" value="Honda" />
                          <p className="validate-error" id="error-last_name"></p>
                        </div>
                        <div className="form-group col-md-3 select_forms">
                          <label>Model </label>
                          <input type="text" className="form-edit" value="22333" />
                          <p className="validate-error" id="error-number"></p>
                        </div>
                        <div className="form-group col-md-3 select_forms">
                          <label>Year</label>
                          <input type="text" className="form-edit" value="2016" />
                          <p className="validate-error" id="error-password"></p>
                        </div>
                        <div className="form-group col-md-3 select_forms">
                          <label>License Plate</label>
                          <input type="text" className="form-edit" value="AS12fe" />
                          <p className="validate-error" id="error-password"></p>
                        </div>
                        <div className="form-group col-md-3 select_forms">
                          <label>Total Delivery</label>
                          <input type="text" className="form-edit" value="20" />
                          <p className="validate-error" id="error-password"></p>
                        </div>
                        <div className="form-group col-md-3 select_forms">
                          <label>Base price</label>
                          <input type="text" className="form-edit" value="20$" />
                          <p className="validate-error" id="error-password"></p>
                        </div>
                        <div className="form-group col-md-3 select_forms">
                          <label>Color</label>
                          <input type="text" className="form-edit" value="white" />
                          <p className="validate-error" id="error-password"></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ViewVehicle
