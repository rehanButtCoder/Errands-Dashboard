import Swal from "sweetalert2"

const deleteItem = async (id, data, service, title, setLoader, removeItem) => {
  Swal.fire({
    title: "Are you sure, you want to delete " + title + "?",
    showCancelButton: true,
    confirmButtonText: `Delete`,
    showCloseButton: true,
    closeButtonHtml: '<img src="./img/Icon material-cancel.png" alt="crossicon" className="popupcrossimage"/>',
    reverseButtons: true,
  }).then(async (result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      debugger
      setLoader(true)
      let removeIndex = data
        .map((item) => {
          if (removeItem === "PromoCode") {
            return item.promoCodeId
          } else if (title === "Feature") {
            return item.FeatureId
          } else if (title === "Booking") {
            return item.BookingId
          } else if (title === "Event") {
            return item.EventId
          } else if (title === "Ad") {
            return item.AdId
          } else if (title === "Subscription") {
            return item.SubscriptionId
          } else if (title === "Query") {
            return item.QueryId
          } else if (title === "Vehicle") {
            return item.vehicleTypeId
          }
        })
        .indexOf(id)
      data.splice(removeIndex, 1)
      try {
        const response = await service.delete(id)
        if (response.data.code === 1) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: title + " deleted!",
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

export default deleteItem
