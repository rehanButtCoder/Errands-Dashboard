import React from "react"

function Notifications() {
  return (
    <div>
      <main>
        {/* <div className="row">
          <div className="col-12">
            <div className="topheader">
              <h2 className="topheader__title">Notification</h2>
              <div className="stats_btn"></div>
            </div>
          </div>
        </div> */}
        <div className="notification_heading">
          <h2 className="notification_hedading">Notifications</h2>
        </div>
        <div className="row card-row">
          <div className="col-md-12 classes-card__column classStats">
            <div className="card classes-card">
              <div className="tab-content">
                <div id="menu1" className="tab-pane active">
                  <div className="card-body_header">
                    {/* <h5 className="card-title">Notification</h5> */}
                    <div className="notification-main">
                      <div className="notification-body">
                        <div className="notification-img">
                          <img src="./img/Notification_profile.svg" alt="" />
                        </div>
                        <div className="notification-text">
                          <h5 className="">Notification</h5>
                          <p>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
                            aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                            sea takimata sanctus
                          </p>
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

export default Notifications
