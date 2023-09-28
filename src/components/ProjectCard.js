import React from "react";
import { withRouter } from "react-router";
import axios from "axios";

class ProjectCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        projectId : props.isNew ? '' : props.projectData.projectId ,
        projectName: props.isNew ? '' : props.projectData.projectName ,
        description: props.isNew ? '' : props.projectData.description ,
        license: props.isNew ? '' : props.projectData.license ,
        url: props.isNew ? '' : props.projectData.url ,
        status: props.isNew ? '' : props.projectData.state ,
        lastUpdatedTime: props.isNew ? '' : props.projectData.lastUpdatedTime ,
        userId: props.isNew ? '' : props.projectData.userId ,

    };
  }

  updateProjectData = () =>{
      if(!this.props.isEnableEdit){
          return;
      }
    const {projectId,userId,projectName, description, license, url, status, lastUpdatedTime} = this.state;
    const {
        history: { push },
      } = this.props;
    let reqUrl = "http://localhost:8080/projectManagement/updateProject";
    const json={
        projectId : projectId,
        userId : userId,
        projectName: projectName,
        description: description,
        license: license,
        url: url,
        state: status
    }
    axios.put(reqUrl,json).then((res) => {
          push(`/home`);
})
  }

  createProjectData = () =>{
    const {projectId,userId,projectName, description, license, url, status, lastUpdatedTime} = this.state;
    const {
        history: { push },
      } = this.props;
    let reqUrl = "http://localhost:8080/projectManagement/newProject";
    const json={
        userId : parseInt(localStorage.getItem('userId')),
        projectName: projectName,
        description: description,
        license: license,
        url: url,
        state: 'InProcess',
    }
    axios.post(reqUrl,json).then((res) => {
          push(`/home`);
})
  }

  render() {
      const {projectId, projectName, description, license, url, status, lastUpdatedTime,userId} = this.state;
      const {isEnableEdit,isNew} = this.props;
    return (
     <div style={{width:'25%'}}>
<form style={{width: '200%'}}>
    <div class="grid gap-6 mb-6 lg:grid-cols-1 mt-7">
                 {!isNew && <div style={{display:'flex'}}>
                    <label id="projectDetailsText" for="project_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">PROJECT ID</label>
                    <input type="text" id="project_id" value={projectId} class="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required disabled/>
                </div>}
                <div style={{display:'flex'}}>
                    <label id="projectDetailsText" for="project_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">PROJECT NAME</label>
                    <input type="text" id="project_name" value={projectName} onChange={(e) => {this.setState({projectName: e.target.value})}} class={`${isEnableEdit ? 'bg-gray-50' : 'bg-gray-300'} border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 `} required disabled={!isEnableEdit}/>
                </div>
                <div style={{display:'flex'}}>
                    <label id="projectDetailsText" for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">PROJECT DESCRIPTION</label>
                    <textarea value={description} onChange={(e) => {this.setState({description: e.target.value})}} 
                   class={`${isEnableEdit ? 'bg-gray-50' : 'bg-gray-300'} form-control block w-full px-3 py-1.5 text-base font-normal text-gray-900 bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:ring-gray-900  focus:border-gray-900 `}
                    id="exampleFormControlTextarea1" rows="3" placeholder="Description of project" disabled={!isEnableEdit}></textarea>
                </div>  
                <div style={{display:'flex'}}>
                    <label id="projectDetailsText" for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">PROJECT LICENSE</label>
                    <input type="text" id="phone" value={license} onChange={(e) => {this.setState({license: e.target.value})}} class={`${isEnableEdit ? 'bg-gray-50' : 'bg-gray-300'} border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 `}  required disabled={!isEnableEdit}/>
                </div>
                <div style={{display:'flex'}}>
                    <label id="projectDetailsText" for="website" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">PROJECT URL</label>
                    <input type="url" id="website" value={url} onChange={(e) => {this.setState({url: e.target.value})}} class={`${isEnableEdit ? 'bg-gray-50' : 'bg-gray-300'} border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 `} placeholder="http://" required disabled={!isEnableEdit}/>
                </div>
                {!isNew && <div style={{display:'flex'}}>
                    <label id="projectDetailsText" for="visitors" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">PROJECT STATUS</label>
                    <input type="text" id="visitors" value={status} onChange={(e) => {this.setState({status: e.target.value})}} class="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" required disabled/>
                </div>}
            </div>
            {!isNew &&<div class="mb-6" style={{display:'flex'}}>
                <label id="projectDetailsText" for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">LAST UPDATED AT</label>
                <input type="text" id="email" value={lastUpdatedTime} onChange={(e) => {this.setState({lastUpdatedTime: e.target.value})}} class="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder='2022-06-06 22:16:18' required disabled/>
            </div> }
            {/* <div class="flex items-start mb-6">
                <div class="flex items-center h-5">
                <input id="remember" type="checkbox" value="" class="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required/>
                </div>
                <label for="remember" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-400">I agree with the <a href="#" class="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
            </div> */}
            {isNew ? <button type="button" id='button_color' class=" bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={this.createProjectData}>Create</button>
            : (parseInt(localStorage.getItem('userId'))===userId && status === "InProcess") ? <button type="button" id='button_color' class=" bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={this.updateProjectData}>Update</button>:<></>}
        </form>
     </div>
    );
  }
}

export default withRouter(ProjectCard);
