import React, {Component} from "react";
import {
    Modal,
    ModalHeader,
    ModalBody,
    Label,
    Button,
    Row,
    Col,
  } from "reactstrap";
  import { Control, LocalForm, Errors } from "react-redux-form";
import { Table } from 'reactstrap';
import  CircularIndeterminate  from "./LoadingComponent";
import {  Fade, Stagger } from 'react-animation-components';

function RenderExpenses({ comment}) {
    return (
        <>
         <Stagger in>
          <Fade in>
        <Table striped>
        <tbody>
          <tr>
            <th scope="row">{comment.id+1}</th>
            <td>{comment.expense}</td>
            <td>{comment.actual}</td>
            <td>{comment.ideal}</td>
          </tr>
        </tbody>
      </Table>
      </Fade>
      </Stagger>       
      </>
    );
  }

  class UserHome extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isModalOpen: false,
      };
  
      this.toggleModal = this.toggleModal.bind(this);
      this.handleAddExpense = this.handleAddExpense.bind(this);
    }
  
    toggleModal() {
      this.setState({
        isModalOpen: !this.state.isModalOpen,
      });
    }
  
    handleAddExpense(values) {
        this.props.postComment(
            this.props.leader.id,
          values.expense,
          values.ideal
        );
        this.toggleModal();
      }
      
  
    render() {
        const required = (val) => val && val.length;
        const expense = this.props.comments.comments.map((comment) => {
            return (
              <div className="col-12 col-md-5 m-1" key={comment.id}>
                <RenderExpenses comment={comment}  />
              </div>
               
            );
          });
    if (this.props.leaderLoading) {
        return (
          <div className="container">
            <div className="row">
              <CircularIndeterminate />
            </div>
          </div>
        );
      } else if (this.props.leaderErrMess) {
        return (
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h4>{this.props.leaderErrMess}</h4>
              </div>
            </div>
          </div>
        );
      }
      else {
        return (
            <div className="bgcolor">
            <div className="container">
            <div className="row">
              <div className="col-12">
                <h3>Home</h3>
                <hr />
              </div>
            </div>
            <div className="row row-content">
              <div className="col-12 ">
          <h3>Welcome: {this.props.leader.firstname} {this.props.leader.lastname}</h3>
          <br/>
          <br/>
          </div>
          <div className="col-12 col-sm-4 offset-sm-1">
          <h5>Income: {this.props.leader.income}</h5>
          </div>
          <div className="col-12 col-sm-6 offset-sm-1">
          <h5>Savings: {this.props.leader.savings}</h5>
          </div>
          </div>
          <div className="row row-content">
           <div className="col-12">
           <h3>Curent Expenses</h3> 
           </div>
           {expense}
          </div>
          <div
        style={{
          display: "flex",
          justifyContent: "left",
          alignItems: "left",
          padding:"20px 20px 20px 20px",
          margin:"0px auto"
        }}
      >
          <Button outline size="lg" color="info" onClick={this.toggleModal}>
                <span className="fa fa-plus fa-lg">Add Expenses</span> 
          </Button></div>
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
      <ModalHeader toggle={this.toggleModal}>New Expense</ModalHeader>
      <ModalBody>
        <LocalForm onSubmit={(values) => this.handleAddExpense(values)}>
          <Row className="form-group">
            <div className="col-12">
              <Label htmlFor="expense" md={2}>
                Expense
              </Label>
            </div>
            <div className="col-12 ">
              <Control.text
                model=".expense"
                id="expense"
                name="expense"
                placeholder="Expense"
                className="form-control"
                validators={{
                  required,
                }}
              />
              <Errors
                className="text-danger"
                model=".expense"
                show="touched"
                messages={{
                  required: "Required",
                }}
              />
            </div>
          </Row>
          <Row className="form-group">
            <div className="col-12">
              <Label htmlFor="ideal" md={12}>
                Estimated Expenditure on this particular expense
              </Label>
            </div>
            <div className="col-12 ">
              <Control.text 
                model=".ideal"
                id="ideal"
                name="ideal"
                placeholder="ideal"
                className="form-control"
                validators={{
                 required,
               }}
              />
              <Errors
                className="text-danger"
                model=".ideal"
                show="touched"
                messages={{
                  required: "Required",
                }}
              />
            </div>
          </Row>
          <Row className="form-group">
            <Col md={{ size: 10, offset: 1 }}>
            <div style={{ display: "flex" }}>
              <Button style={{ marginLeft: "auto" }} type="submit" color="primary">
                Add Expense
              </Button>
            </div>
            </Col>
          </Row>
      </LocalForm>
    </ModalBody>
  </Modal>
          </div>
            </div>
          );
      }
}}
export default UserHome;