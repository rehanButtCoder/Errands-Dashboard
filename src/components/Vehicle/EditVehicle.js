import React from "react"
import { Link } from "react-router-dom"

function EditVehicle() {
  return (
    <div>
      <main>
        <div class="container-fluid">
          <div class="row">
            <div class="col-12">
              <div class="topheader">
                <Link class="btnscontainer__btn" to="/Vehicles">
                  <h2 class="topheader__title">
                    <img src="./img/icon_back.svg" alt="" />
                    Edit Vehicle
                  </h2>
                </Link>
              </div>
            </div>
          </div>
          <div class="row mb-12">
            <div class="col-lg-12 col-md-12 mb-4">
              <div class="card">
                <form id="form">
                  <div class="card-body">
                    <div class="formwithimageupload">
                      <div class="formwithimageupload__column_L">
                        <div class="imgupload">
                          <img id="output" src="./img/truck_img.png" alt="" />
                          <input hidden type="file" accept="image/*" name="file" id="file" />
                          <input hidden type="text" name="ProfilePicture" />
                          <span class="validate-error" id="error-profile_picture"></span>
                          <label for="file" style={{ cursor: "pointer" }} class="btn btn-primary btn_upload">
                            Upload Picture
                          </label>
                          <p className="picture_para">Photo should not exceed size of 5 MB.</p>
                        </div>
                      </div>
                      <div class="formwithimageupload__column_R">
                        <div class="row">
                          <div class="form-group col-md-5 select_forms">
                            <label>Driver type</label>
                            <input class="form-control" type="text" id="fname" name="full name" placeholder="Name" />
                            <p class="validate-error" id="error-first_name"></p>
                          </div>
                          <div class="form-group col-md-5 select_forms">
                            <label>Mark</label>
                            <input class="form-control" type="text" id="" name="email" placeholder="Email" />
                            <p class="validate-error" id="error-last_name"></p>
                          </div>
                          <div class="form-group col-md-5 select_forms">
                            <label>Model</label>
                            <input class="form-control" type="number" id="" name="number" placeholder="Model" />
                            <p class="validate-error" id="error-number"></p>
                          </div>
                          <div class="form-group col-md-5 select_forms">
                            <label>Year</label>
                            <input class="form-control" type="number" id="" name="number" placeholder="Year" />
                            <p class="validate-error" id="error-number"></p>
                          </div>
                          <div class="form-group col-md-5 select_forms">
                            <label>License Plate</label>
                            <input class="form-control" type="text" id="" name="email" placeholder="Number" />
                            <p class="validate-error" id="error-last_name"></p>
                          </div>
                          <div class="form-group col-md-5 select_forms">
                            <label>Color</label>
                            <input class="form-control" type="text" id="" name="email" placeholder="Color" />
                            <p class="validate-error" id="error-last_name"></p>
                          </div>
                          <div class="form-group col-md-5 select_forms">
                            <label>Base price</label>
                            <input class="form-control" type="text" id="" name="email" placeholder="Enter" />
                            <p class="validate-error" id="error-last_name"></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div class="btnscontainer" style={{ paddingTop: "70px" }}>
                <Link class="btn btn-primary" to="#">
                  <button type="submit" class="btn btn-primary">
                    Save
                  </button>
                </Link>
                <Link class="btnscontainer__btn" to="/Vehicles">
                  <button type="button" class="btn_primary_outline cancelbtn">
                    Cancel
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default EditVehicle
