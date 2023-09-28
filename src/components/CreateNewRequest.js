import React from "react";
import { withRouter } from "react-router";
import Card from "./Card";
import ProjectCard from "./ProjectCard";
import Sidebar from "./Sidebar";

class CreateNewRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enableEdit:false
    };
  }


  handleLogout = () => {
    localStorage.removeItem("username");
    const {
      history: { push },
    } = this.props;
    push("/");
  };

  enableEdit = () =>{
    this.setState({enableEdit:true});
  }

  render() {
    return (

<div className=" flex min-h-screen" style={{backgroundColor:'darkSlateBlue'}}>
      <Sidebar handleNewRequest={this.handleNewRequest} handleLogout={this.handleLogout}/>
      <div className="flex flex-col relative w-full" style={{marginTop:'80px',marginLeft:'200px'}}>
          <ProjectCard isEnableEdit={true} isNew/>
        </div>
  </div>

    );
  }
}

export default withRouter(CreateNewRequest);
