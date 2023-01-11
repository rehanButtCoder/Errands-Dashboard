import { Link } from 'react-router-dom'
function ViewHeaderEdit({ showButton , name, link}) {
  return (
    <div class="row">
      <div class="col-12">
        <div class="topheader">
          <Link to={link}>
            <h2 class="topheader__title">
              <img src="./img/icon_back.svg" alt="back_icon" />
              Edit {name}
            </h2>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ViewHeaderEdit
