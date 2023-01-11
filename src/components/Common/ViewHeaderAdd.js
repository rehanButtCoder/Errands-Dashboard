import { Link } from 'react-router-dom'
function ViewHeader({ showButton, name }) {
    return (
        <div class="row">
            <div class="col-12">
                <div class="class-index">
                    <h2>{name} Management</h2>
                    {showButton ? <Link to="/AddUser" ><button type="submit" class="btn btn-primary btn-sm mt-3">Add</button></Link> : ""}
                </div>
                <div class="separator mb-5"></div>
            </div>
            <div class="col-sm-4">
            </div>
        </div>
    )
}

export default ViewHeader
