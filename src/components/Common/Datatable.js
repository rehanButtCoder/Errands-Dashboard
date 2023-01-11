import DataTable from "react-data-table-component"

import Loader from "../../shared/Loader"
function Datatable({ incomingData, loader, columns }) {
  return (
    <div>
      {" "}
      {loader ? (
        Loader
      ) : (
        <>
          <DataTable title="" columns={columns} data={incomingData} pagination />
        </>
      )}
    </div>
  )
}

export default Datatable
