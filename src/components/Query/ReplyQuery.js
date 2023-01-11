import React from "react"
import { Link } from "react-router-dom"

function ReplyQuery() {
  return (
    <div>
      <main>
        <div class="container-fluid">
          <div class="row">
            <div class="col-12">
              <div class="topheader">
                <Link class="btnscontainer__btn" to="/Queries">
                  <h2 class="topheader__title">
                    <img src="./img/icon_back.svg" alt="" />
                    Reply Query
                  </h2>
                </Link>
              </div>
            </div>
          </div>
          <div class="row mb-12">
            <div class="col-lg-12 col-md-12 mb-4">
              <div class="card">
                <form id="form">
                  <div class="card-body rply-query">
                    <div class="formwithimageupload">
                      <div class="formwithimageupload__column">
                        <div class="row">
                          <div class="form-group col-md-12 select_forms">
                            <label>Query</label>
                            <p>
                              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
                              magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
                              gubergren, no sea takimata sanctus
                            </p>
                          </div>
                          <div class="form-group col-md-12 select_forms">
                            <label>Reply</label>
                            <textarea class="form-control" name="" id="" placeholder="Reply"></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div class="btnscontainer" style={{ paddingTop: "70px" }}>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
                <Link to="/Users" className="btn_primary_outline cancelbtn">
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ReplyQuery
