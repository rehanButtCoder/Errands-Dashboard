import { Link } from "react-router-dom"
import DriverService from "../services/DriverService"
import { documentTypeId } from "../shared/Constants"

export const Datacolumns = (data, setLoader, setData) => {
  const driverService = new DriverService()

  return [
    {
      name: "Sr#",
      cell: (row, index) => index + 1,
      sortable: true,
      width: "150px",
      grow: 0,
    },

    {
      name: "Name",
      cell: (row) => (
        <div>
          {row.documentTypeId === documentTypeId.insurance
            ? "Vehicle Insurance"
            : row.documentTypeId === documentTypeId.driverlicense
            ? "Driver License"
            : row.documentTypeId === documentTypeId.driverbadge
            ? " Driver Badge"
            : row.documentTypeId === documentTypeId.roadworthiness
            ? "Road Worthiness"
            : row.documentTypeId === documentTypeId.vehiclelicense
            ? "Vehicle License"
            : ""}
        </div>
      ),

      sortable: true,
    },
    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <div className="action-icons">
          {row.documentTypeId === documentTypeId.insurance ? (
            <Link to={row.filePath} target="_blank" download={row.filePath}>
              {" "}
              <img className="tableactions_image" src="./img/icon_edit_complete.svg" alt="table-action" />
            </Link>
          ) : row.documentTypeId === documentTypeId.driverlicense ? (
            <Link to={row.filePath} target="_blank" download={row.filePath}>
              {" "}
              <img className="tableactions_image" src="./img/icon_edit_complete.svg" alt="table-action" />
            </Link>
          ) : row.documentTypeId === documentTypeId.driverbadge ? (
            <Link to={row.filePath} target="_blank" download={row.filePath}>
              {" "}
              <img className="tableactions_image" src="./img/icon_edit_complete.svg" alt="table-action" />
            </Link>
          ) : row.documentTypeId === documentTypeId.roadworthiness ? (
            <Link to={row.filePath} target="_blank" download={row.filePath}>
              {" "}
              <img className="tableactions_image" src="./img/icon_edit_complete.svg" alt="table-action" />
            </Link>
          ) : row.documentTypeId === documentTypeId.vehiclelicense ? (
            <Link to={row.filePath} target="_blank" download={row.filePath}>
              {" "}
              <img className="tableactions_image" src="./img/icon_edit_complete.svg" alt="table-action" />
            </Link>
          ) : (
            ""
          )}
        </div>
      ),
    },
  ]
}
