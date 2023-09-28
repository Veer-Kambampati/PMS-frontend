import React from "react";
import { withRouter } from "react-router";
import FormDialog from "./FormDialog";
import ProjectCard from "./ProjectCard";
import axios from "axios";

class ActionStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openConfirmationDialog: false,
      selectedStatus:'Status'
    };
  }

  componentWillMount() {

  }

  handleSelectChange = (e) => {
    e.stopPropagation();
    console.log(e);
    this.setState({openConfirmationDialog:true,selectedStatus:e.target.value});
  };

  handleClose = (e) => {
    e.stopPropagation();
    this.setState({openConfirmationDialog:false,selectedStatus:'Status'});
  }

  handleDone = (e) =>{
    const {selectedStatus} = this.state;
    e.stopPropagation();
    let reqUrl = "http://localhost:8080/projectManagement/updateStatus";
    const json={
        projectId : this.props.projectData.projectId,
        state: selectedStatus
    }
    axios.put(reqUrl,json).then((res) => {
          console.log("Status updated successfully")
          this.setState({openConfirmationDialog:false});
          this.props.updateProjectArrayStatus(this.props.index,selectedStatus);
})
    //call api & disbale the status field
  }

  render() {
    const {openConfirmationDialog,selectedStatus} = this.state;
    return (
      <>
        <select id="small" class="block p-2 w-36 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " onChange={this.handleSelectChange} value={selectedStatus}>
          <option value="Status">Action</option>
          <option value="Approved">Approved</option>
          <option value="Denied">Denied</option>
        </select>
        {/* {openConfirmationDialog &&  */}
        <FormDialog open={openConfirmationDialog} handleClose={this.handleClose} handleDone={this.handleDone}/>
        {/* } */}
      </>
    );
  }
}

export default withRouter(ActionStatus);
