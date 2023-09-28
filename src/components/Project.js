import React from "react";
import { withRouter } from "react-router";
import Card from "./Card";
import ProjectCard from "./ProjectCard";
import axios from "axios";
import Sidebar from "./Sidebar";

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enableEdit:false,
      projectData:{}
    };
  }

  componentWillMount() {
    const getUserDataUrl = `http://localhost:8080/projectManagement/projectDetail/${this.props.match.params.id}`;
    axios.get(getUserDataUrl).then((res) => {
      let projectData = {};
      projectData.description = res.data.description;
      projectData.lastUpdatedTime = res.data.lastUpdatedTime;
      projectData.license = res.data.license;
      projectData.projectId = res.data.projectId;
      projectData.projectName = res.data.projectName;
      projectData.state = res.data.state;
      projectData.url = res.data.url;
      projectData.userId = res.data.userId;
      this.setState({
        projectData:projectData
      })
})
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
    const {projectData} = this.state;
    return (

<div className=" flex min-h-screen" style={{backgroundColor:'darkSlateBlue'}}>
      <Sidebar handleNewRequest={this.handleNewRequest} handleLogout={this.handleLogout}/>
        <div className="flex flex-col ml-52 justify-center w-full">
          <div style={{width:'50%',display:'flex'}}>
          <div style={{fontSize:'30px',color:'antiquewhite',flexGrow:'1'}}>Project Details</div>
      {(parseInt(localStorage.getItem('userId'))=== projectData.userId && projectData.state === "InProcess") && <button type="button" id='button_color' class=" font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mt-2 self-end" onClick={this.enableEdit}>Edit</button>}
          
          </div><div></div>
          {Object.keys(projectData).length > 0 &&<ProjectCard isEnableEdit={this.state.enableEdit} projectData={projectData}/>}
        </div>
  </div>

    );
  }
}

export default withRouter(Project);
