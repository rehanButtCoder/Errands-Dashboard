import { Link } from "react-router-dom"

export const Vehiclescolumns = (vehicleData, setLoader, setData) => {
  return [
    {
      name: "Sr#",
      cell: (row, index) => index + 1,
      sortable: true,
    },

    {
      name: "Name",
      selector: "vehicleTypeTitle",
      sortable: true,
    },

    {
      name: "Vehicle Model",
      selector: "model",
      sortable: true,
    },
    {
      name: "Color",
      selector: "color",
      sortable: true,
    },
    {
      name: "Year",
      selector: "year",
      sortable: true,
    },
    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <div className="action-icons">
          <Link to={`/EditDriverVehicle/${row.vehicleId}/${row.userId}`} className="TableEdit">
            <img className="tableactions_image" src="./img/icon_edit_complete.svg" alt="table-action" />
          </Link>
          {/* <Link to="/ViewVehicle" className="TableEdit">
            <img alt="table-action" className="tableactions_image" src="./img/icon_view_complete.svg" />
          </Link>
          <button
            type="button"
            data-toggle="modal"
            class="tableactions_action"
            // onClick={() => deleteItem(row["id"], data, userService, "Users", setLoader)}
          >
            <img alt="table-action" class="tableactions_image" src="./img/icon_delete_complete.svg" />
          </button> */}
        </div>
      ),
    },
  ]
}
