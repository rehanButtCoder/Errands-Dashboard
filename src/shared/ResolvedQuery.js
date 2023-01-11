import Swal from "sweetalert2"

const ResolvedQuery = async (id, service, title, setLoader) => {
  Swal.fire({
    title: "Are you sure, you want to resolve " + title + " query ?",
    showCancelButton: true,
    confirmButtonText: `Resolve`,
    showCloseButton: true,
    closeButtonHtml: '<img src="./img/Icon material-cancel.png" alt="crossicon" className="popupcrossimage"/>',
    reverseButtons: true,
  }).then(async (result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      debugger
      setLoader(true)
      try {
        const response = await service.resolveQuery(id)
        if (response.data.code === 1) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: title + " query is resolved!",
          })
          setLoader(false)
        }

        if (response.data.code === 0) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          })
          setLoader(false)
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        })
        setLoader(false)
      }
    } else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info")
      setLoader(false)
    }
  })
}

export default ResolvedQuery
