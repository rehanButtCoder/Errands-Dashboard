import { Switch, Route, HashRouter } from "react-router-dom"
import PrivateRoute from "./components/Common/PrivateRoute"
import Login from "./components/Account/Login/Login"
import AuthLayout from "./layouts/AuthLayout"
import WebLayout from "./layouts/WebLayout"
import Register from "./components/Account/Register/Register"
import Dashboard from "./components/Dashboard/Dashboard"
import "jquery/dist/jquery.min.js"
//Datatable Modules
import "datatables.net/js/jquery.dataTables.min.js"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import "datatables.net-buttons/js/buttons.colVis"
import "datatables.net-buttons/js/buttons.html5"
import "datatables.net-buttons/js/buttons.flash"
import "datatables.net-buttons/js/buttons.print"
import Profile from "./components/Profile/Profile"
import ForgotPassword from "./components/Account/ForgotPassword/ForgotPassword"
import Users from "./components/Users/Users"
import ErrandOrder from "./components/Orders/ErrandOrder"
import AddUser from "./components/Users/AddUser"
import EditUser from "./components/Users/EditUser"
import ViewUser from "./components/Users/ViewUser"
import Drivers from "./components/Drivers/Drivers"
import AddDriver from "./components/Drivers/AddDriver"
import EditDriver from "./components/Drivers/EditDriver"
import ViewDriver from "./components/Drivers/ViewDriver"
import LineOrder from "./components/Orders/LineOrder"
import TruckingOrder from "./components/Orders/TruckingOrder"
import DeliveryOrder from "./components/Orders/DeliveryOrder"
import Vehicles from "./components/Vehicle/Vehicles"
import EditVehicle from "./components/Vehicle/EditVehicle"
import ViewVehicle from "./components/Vehicle/ViewVehicle"
import PromoCodes from "./components/Promo Codes/PromoCodes"
import Referals from "./components/Referals/Referals"
import UserCardDetails from "./components/User card Details/UserCardDetails"
import DriverAccountDetails from "./components/Driver account Details/DriverAccountDetails"
import DeliveryTransaction from "./components/Delivery Transaction/DeliveryTransaction"
import Warnings from "./components/Warning/Warnings"
import Support from "./components/Support/Support"
import ViewSupport from "./components/Support/ViewSupport"
import Notifications from "./components/Notification/Notifications"
import Queries from "./components/Query/Queries"
import ReplyQuery from "./components/Query/ReplyQuery"
import ViewQuery from "./components/Query/ViewQuery"
import EditDriverVehicle from "./components/Drivers/EditDriverVehicles"
import AddPromoCode from "./components/Promo Codes/AddPromoCode"
import VehiclesConfig from "./components/Configuration.js/Vehicle/VehiclesConfig"
import AddVehicleConfig from "./components/Configuration.js/Vehicle/AddVehicleConfig"
import EditVehicleConfig from "./components/Configuration.js/Vehicle/EditVehicleConfig"
import ManageConstants from "./components/constantsConfig/ManageConstants"
import EditConstants from "./components/constantsConfig/EditConstants"

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/account/:path?">
          <AuthLayout>
            <Switch>
              <Route path={"/account/login"} exact component={Login} />
              <Route path={"/account/register"} component={Register} />
              <Route path={"/account/forgotpassword"} component={ForgotPassword} />
            </Switch>
          </AuthLayout>
        </Route>
        {/* <Route> */}
        <Route>
          <WebLayout>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute path="/Profile" component={Profile} />
              <PrivateRoute path="/Users" component={Users} />
              <PrivateRoute path="/AddUser" component={AddUser} />
              <PrivateRoute path="/User/Edit/:userId" component={EditUser} />
              <PrivateRoute path="/User/:userId" component={ViewUser} />
              <PrivateRoute path="/Drivers" component={Drivers} />
              <PrivateRoute path="/AddDriver" component={AddDriver} />
              <PrivateRoute path="/Driver/Edit/:driverId" component={EditDriver} />
              <PrivateRoute path="/Driver/:driverId" component={ViewDriver} />
              <PrivateRoute path="/Order/Line/:lineId" component={LineOrder} />
              <PrivateRoute path="/Order/Errand/:errandId" component={ErrandOrder} />
              <PrivateRoute path="/Order/Trucking/:truckingId" component={TruckingOrder} />
              <PrivateRoute path="/Order/Delivery/:deliveryId" component={DeliveryOrder} />
              <PrivateRoute path="/Vehicles" component={Vehicles} />
              <PrivateRoute path="/EditVehicle" component={EditVehicle} />
              <PrivateRoute path="/ViewVehicle" component={ViewVehicle} />
              <PrivateRoute path="/PromoCodes" component={PromoCodes} />
              <PrivateRoute path="/Referals" component={Referals} />
              <PrivateRoute path="/UserCardDetails" component={UserCardDetails} />
              <PrivateRoute path="/DriverAccountDetails" component={DriverAccountDetails} />
              <PrivateRoute path="/DeliveryTransaction" component={DeliveryTransaction} />
              <PrivateRoute path="/Warnings" component={Warnings} />
              <PrivateRoute path="/Support" component={Support} />
              <PrivateRoute path="/ViewSupport/:supportQueryId" component={ViewSupport} />
              <PrivateRoute path="/Notifications" component={Notifications} />
              <PrivateRoute path="/Queries" component={Queries} />
              <PrivateRoute path="/ReplyQuery" component={ReplyQuery} />
              <PrivateRoute path="/ViewQuery" component={ViewQuery} />
              <PrivateRoute path="/EditDriverVehicle/:vehicleId/:userId" component={EditDriverVehicle} />
              <PrivateRoute path="/AddPromoCode" component={AddPromoCode} />
              <PrivateRoute path="/VehicleConfig" component={VehiclesConfig} />
              <PrivateRoute path="/EditVehicleConfig/:id" component={EditVehicleConfig} />
              <PrivateRoute path="/AddVehicleConfig/:VehicleName" component={AddVehicleConfig} />
              <PrivateRoute path="/ManageConstants" component={ManageConstants} />
              <PrivateRoute path="/EditConstant/:id" component={EditConstants} />
            </Switch>
          </WebLayout>
        </Route>
      </Switch>
    </HashRouter>
  )
}

export default App
