import React from "react";
import { withRouter } from "react-router";
import Card from "./Card";
import axios from "axios";
import Sidebar from "./Sidebar";

const url = "http://localhost:8080/projectManagement/allProject";
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId:  localStorage.getItem("userId"),
      userRole: localStorage.getItem("userRole"),
      projectDatas : []
    };
  }

  componentWillMount() {
    axios.get(url).then((res) => {
      this.setState({
        projectDatas:res.data
      })
})
  }

  handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    const {
      history: { push },
    } = this.props;
    push("/");
  };


  handleNewRequest = () =>{
    const {userId} = this.state;
    const {
      history: { push },
    } = this.props;
    push(`/createNewRequest/${userId}`);

  }

  updateInProjectArray = (projectData) => {
    this.setState({projectDatas: this.state.projectDatas.filter(function(data) { 
      return data.projectId !== projectData.projectId
  })});
  }

  updateProjectArrayStatus = (index,status) => {
    this.setState(({projectDatas}) => ({
      projectDatas: [
          ...projectDatas.slice(0,index),
          {
              ...projectDatas[index],
              state: status,
          },
          ...projectDatas.slice(index+1)
      ]
  }));

  }

  render() {
    const {userId,userRole,projectDatas} = this.state;
    return (

<div className=" flex" style={{backgroundColor:'darkSlateBlue',minHeight:'100vh'}}>
      <Sidebar handleNewRequest={this.handleNewRequest} handleLogout={this.handleLogout}/>
      <div className="flex flex-col relative w-full" style={{marginTop:'80px',marginLeft:'150px'}}>
      {projectDatas.map((projectData,index) => {
          return(
              <Card  projectData={projectData} userRole={userRole} userId={parseInt(userId)} key={index} index={index} updateInProjectArray={this.updateInProjectArray} updateProjectArrayStatus={this.updateProjectArrayStatus}/>
              );
        })}
  </div>
  </div>
    );


      {/* <div className="h-screen flex flex-col  flex-1">
        <div style={{background:'linear-gradient(90.05deg, rgb(9, 17, 37) -2.5%, rgb(33, 61, 133) 100.83%)',color:'rgb(0, 179, 122)'}} className="flex justify-between items-center h-16 shadow-xl sticky top-0 px-3">
          <div className="font-semibold text-4xl flex-1 flex justify-center">Online Tracking System</div>
          <div className='flex font-bold space-x-4'>
            <div className='underline cursor-pointer' onClick={this.handleNewRequest}>Add New Request</div>
            <div className='underline cursor-pointer' onClick={this.handleLogout}>Logout</div>
          </div>
        </div>

        <div className='m-6 flex flex-wrap'>
        {projectDatas.map((projectData,index) => {
          return(
              <Card  projectData={projectData} userRole={userRole} userId={parseInt(userId)} key={index} index={index} updateInProjectArray={this.updateInProjectArray} updateProjectArrayStatus={this.updateProjectArrayStatus}/>
              );
        })}
        </div>
      </div> */}
    // );
  }
}

export default withRouter(HomePage);
