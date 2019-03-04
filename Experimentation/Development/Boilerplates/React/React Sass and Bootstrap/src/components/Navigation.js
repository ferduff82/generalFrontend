
import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import '../styles/Navigation.scss';

class Navigation extends React.Component {

   render() {
      return (
         <div className="navigation position-fixed">
            <div className="menu-wrapper d-flex">
               <Link to={"/" + this.props.userUrlParam.userIdA + "/" + this.props.userUrlParam.userIdB + "/index"} className=" background-secondary full-width">
                  <div className={this.props.selectedNavigation === ('userInfo') ? 'active p-2' : 'p-2'}>
                     <i className="material-icons">person</i>
                  </div>
               </Link>
               <Link to={"/" + this.props.userUrlParam.userIdA + "/" + this.props.userUrlParam.userIdB + "/historic"} className=" background-secondary full-width">
                  <div className={this.props.selectedNavigation === ('historic') ? 'active p-2' : 'p-2'}>
                     <i className="material-icons">description</i>
                  </div>
               </Link>
               <Link to={"/" + this.props.userUrlParam.userIdA + "/" + this.props.userUrlParam.userIdB + "/location"} className=" background-secondary full-width">
                  <div className={this.props.selectedNavigation === ('location') ? 'active p-2' : 'p-2'}>
                     <i className="material-icons">location_on</i>
                  </div>
               </Link>
            </div>
         </div>
      )
   }
}

export default Navigation;
