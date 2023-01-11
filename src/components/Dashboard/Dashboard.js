import DashBoardService from "../../services/DashBoardService"
import { useEffect, useState } from "react"
import Loader from "../../shared/Loader"
import "jspdf-autotable"
import jsPDF from "jspdf"
import downloadCSV from "../../shared/CSV"
import PerfectScrollbar from "perfect-scrollbar"
import moment from "moment"
import { Chart, DoughnutController } from "chart.js"
import { registerables } from "chart.js"

function Dashboard() {
  //Se

  Chart.register(...registerables)
  const dashboardService = new DashBoardService()
  const ctx = "myChart"
  const ctx1 = "myChart1"

  useEffect(() => {
    // const myChart1 = new Chart(ctx, {
    //   type: "doughnut",
    //   title: {
    //     display: true,
    //     text: "Chart Title",
    //   },
    //   data: {
    //     labels: ["Red", "Yellow", "Blue"],
    //     datasets: [
    //       {
    //         data: [
    //           { id: "Sales", nested: { value: 1500 } },
    //           { id: "Purchases", nested: { value: 500 } },
    //         ],
    //       },
    //     ],
    //   },
    //   options: {
    //     parsing: {
    //       key: "nested.value",
    //     },
    //   },
    // })

    const stackedLine = new Chart(ctx1, {
      type: "line",
      data: [],
      options: {
        scales: {
          y: {
            stacked: true,
          },
        },
      },
    })
    // when component unmounts
    // return () => {
    //   myChart1.destroy()
    // }
  }, [])

  return (
    <div>
      <main>
        <div class="row">
          <div class="col-12">
            <div class="topheader">
              <h2 class="topheader__title">Dashboard</h2>
              <div class="stats_btn"></div>
            </div>
          </div>
        </div>

        <div class="row card-row mrg-btm">
          <div class="col-md-12">
            <div class="row card-total__row">
              <div class="col-md-4 card-total__column">
                <div class="card card-total">
                  <div class="card-body">
                    <a href="#">
                      <h3>Total Users</h3>
                      <div class="card-total__info">
                        <div class="card-total__infoleft">
                          <h2 class="card-total__gain">6300</h2>
                          <h5>
                            {" "}
                            <img src="./img/DownArrow.svg" alt="" /> 8.8%
                          </h5>
                        </div>
                        <div class="card-total__inforight">
                          <img src="./img/Bar Chart.svg" alt="" />
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              <div class="col-md-4 card-total__column">
                <div class="card card-total">
                  <div class="card-body">
                    <a href="#">
                      <h3>Total Booking</h3>
                      <div class="card-total__info">
                        <div class="card-total__infoleft">
                          <h2 class="card-total__gain">200</h2>
                          <h5>
                            {" "}
                            <img src="./img/DownArrow.svg" alt="" /> 8.8%
                          </h5>
                        </div>
                        <div class="card-total__inforight">
                          <img src="./img/Bar Chart-1.svg" alt="" />
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              {/* <div class="col-md-3 card-total__column">
                <div class="card card-total">
                  <div class="card-body">
                    <a href="#">
                      <h3>Total Truckers</h3>
                      <div class="card-total__info">
                        <div class="card-total__infoleft">
                          <h2 class="card-total__gain">32</h2>
                          <h5>
                            {" "}
                            <img src="./img/DownArrow.svg" alt="" /> 20%
                          </h5>
                        </div>
                        <div class="card-total__inforight">
                          <img src="./img/Bar Chart-2.svg" alt="" />
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div> */}

              <div class="col-md-4 card-total__column">
                <div class="card card-total">
                  <div class="card-body">
                    <a href="#">
                      <h3>Total Drivers</h3>
                      <div class="card-total__info">
                        <div class="card-total__infoleft">
                          <h2 class="card-total__gain">32</h2>
                          <h5>
                            {" "}
                            <img src="./img/DownArrow.svg" alt="" /> 20%
                          </h5>
                        </div>
                        <div class="card-total__inforight">
                          <img src="./img/Bar Chart-3.svg" alt="" />
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row card-row">
          <div class="col-md-12 classes-card__column classStats">
            <div class="card classes-card" style={{ height: "100%s" }}>
              <div class="card-body">
                <h5 class="card-title">Orders Applications</h5>
                <canvas id="myChart1"></canvas>
              </div>
            </div>
          </div>

          {/* <div class="col-md-4 details-card__column classStats" style={{ height: "100%s" }}>
            <div class="card details-card">
              <div class="card-body">
                <h5 class="card-title">Total Invoices</h5>
                <div class="overdetails-section" style={{ display: "block", height: "100%", overflowY: "auto" }} id="overdetails-section"></div>
                <canvas id="myChart"></canvas>
              </div>
            </div>
          </div> */}
        </div>
      </main>
    </div>
  )
}
export default Dashboard
