import React from 'react'
import { Link } from 'react-router-dom'
function ForgotPassword() {
    return (
        <div>
            <body class=" no-footer">
                <div class="Slogin">
                    <main>
                        <div class="container">
                            <div class="row h-100">
                                <div class="col-12 col-md-10 mx-auto my-auto">
                                    <div class="card auth-card forgotpasswordcard">
                                        <div class="form-side">
                                            <div class="login-logo">
                                                <img src="/img/Logo.png" alt="" />
                                                <h6 class ="form-side__title mb_40">Forgot Password?</h6>
                                            </div>
                                            <form action="#" method="post" id="myform">
                                                <div class="form-row">
                                                    <label class="form-side__form-group  form-group col-md-12">
                                                        <input class="form-control" type="text" id="fname" name="email" placeholder="Email" />
                                                    </label>
                                                </div>


                                                <div class="d-flex justify-content-between align-items-center">
                                                    <button id="send-button" class="btn btn-primary form-side__btn" type="submit">
                                                        Send
                                                    </button>
                                                </div>
                                                <div class="form-side__password mt_20">
                                                    <h6>Already have an account? <Link to="/account/login">Login</Link></h6>
                                                </div>
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
        </div>
    )
}

export default ForgotPassword
