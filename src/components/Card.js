import React from "react";
import { withRouter } from "react-router";
import ActionStatus from "./ActionStatus";
import FormDialog from './FormDialog';
import axios from "axios";

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openCancelDailog: false
    };
  }

  handleCardClick = (e) =>{
    e.preventDefault();
      const {
        history: { push } , projectData
      } = this.props;
      push({
        pathname: `/project/${projectData.projectId}`,
        projectData: projectData
      });
  }

  handleCancel = (e) =>{
    e.stopPropagation();
    this.setState({openCancelDailog:true})

  }

  handleCancelClose = (e) =>{
    e.stopPropagation();
    this.setState({openCancelDailog:false})
  }

  handleCancelDone = (e) =>{
    e.stopPropagation();
    let reqUrl = `http://localhost:8080/projectManagement/cancelProject/${this.props.projectData.projectId}`;
    axios.delete(reqUrl).then((res) => {
          this.setState({openCancelDailog:false})
          console.log("Request Cancelled Successfully")
          this.props.updateInProjectArray(this.props.projectData);
    })

  }




  render() {
    const {userId,userRole,projectData,index} = this.props;
    const {openCancelDailog} = this.state;
    return (

          <div style={{minWidth:'800px',backgroundColor:'lavender'}} class="flex flex-col p-6 max-h-72  max-w-xs bg-white rounded-lg border border-gray-200 shadow-md mr-4 mb-4 cursor-pointer transition ease-in-out hover:bg-gray-100 duration-300"  >
          <div style={{display:'flex',alignItems:'center',marginBottom:'8px'}}>
            <div class="text-lg font-bold tracking-tight text-gray-900 dark:text-white">Project Name : </div>
          <h5 class=" text-lg ml-2" onClick={this.handleCardClick}>{projectData.projectName}</h5>
          </div>
          <p id='card_desc' class="flex-1 mb-3 font-normal text-gray-700 dark:text-gray-400" onClick={this.handleCardClick}>{projectData.description}</p>
          <div className="flex justify-between">
               { (userRole === 'Approver' && projectData.state === 'InProcess' && userId !== projectData.userId)? <ActionStatus projectData={projectData} index={index} updateProjectArrayStatus={this.props.updateProjectArrayStatus}/> : 
                <div style={{display:'flex',alignItems:'center'}}>
                <div style={{fontSize:18,fontWeight:500}}>Status : </div>
                {/* <div id='status' class="inline-flex items-center py-2 px-3 text-sm font-bold text-centerrounded-lg rounded-lg uppercase"> {projectData.state}</div> */}
                <div style={{marginTop:'4px',marginLeft:'8px',
                color:projectData.state==="InProcess"?'cornflowerblue':projectData.state==="Approved"?'green':'red'}}class="inline-flex items-center font-bold text-centerrounded-lg rounded-lg uppercase"> {projectData.state}</div>
                </div>
                }
              {(projectData.state === 'InProcess' && userId === projectData.userId) && <div id='button_color' class="inline-flex items-center py-2 px-3 text-sm font-medium text-centerrounded-lg rounded-lg" onClick={this.handleCancelDone}>Cancel Request</div>}
          </div>
          {/* <FormDialog open={openCancelDailog} handleClose={this.handleCancelClose} handleDone={this.handleCancelDone} isCancel/> */}
          </div>

    );
  }
}

export default withRouter(Card);
