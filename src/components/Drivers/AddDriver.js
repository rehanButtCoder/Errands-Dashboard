import React from 'react'
import { Link } from 'react-router-dom'
function AddDriver() {
    return (
        <div>
            <main>
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-12">
                            <div class="topheader">
                                <Link class="btnscontainer__btn" to="/Users">
                                    <h2 class="topheader__title">
                                        <img src="./img/icon_back.svg" />
                                        Add User
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
                                            <div class="formwithimageupload__column">
                                                <div class="row">
                                                    <div class="form-group col-md-6 select_forms">
                                                        <label>Name</label>
                                                        <input class="form-control" type="text" id="fname" name="full name" placeholder="Name" />
                                                        <p class="validate-error" id="error-first_name"></p>
                                                    </div>
                                                    <div class="form-group col-md-6 select_forms">
                                                        <label>Email</label>
                                                        <input class="form-control" type="text" id="" name="email" placeholder="Email" />
                                                        <p class="validate-error" id="error-last_name"></p>
                                                    </div>
                                                    <div class="form-group col-md-6 select_forms">
                                                        <label>Phone number</label>
                                                        <input class="form-control" type="number" id="" name="number" placeholder="Number" />
                                                        <p class="validate-error" id="error-number"></p>
                                                    </div>
                                                    <div class="form-group col-md-6 select_forms">
                                                        <label>Password</label>
                                                        <input class="form-control" type="password" id="" name="password" placeholder="password" />
                                                        <p class="validate-error" id="error-password"></p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="formwithimageupload__column">
                                                <div class="imgupload">
                                                    <img id="output" src="./img/icon_upload_complete.svg" alt="" />
                                                    <input hidden type="file" accept="image/*" name="file" id="file" />
                                                    <input hidden type="text" name="ProfilePicture" />
                                                    <span class="validate-error" id="error-profile_picture"></span>
                                                    <label for="file" style={{ cursor: "pointer" }} class="btn btn-primary">Upload Picture</label>
                                                    <p>Photo should not exceed size of 5 MB.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="btnscontainer">
                                            <a class="btnscontainer__btn" href="#"><button type="submit" class="btn btn-primary">Save</button></a>
                                            <Link class="btnscontainer__btn" to="/Users"><button type="button" class="btn btn-secondary">Cancel</button></Link>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>


        </div>
    )
}

export default AddDriver
