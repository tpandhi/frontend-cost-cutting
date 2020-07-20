import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Media,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Button,
  Row,
  Col,
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Link } from "react-router-dom";
import CircularIndeterminate from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
import { FadeTransform, Fade, Stagger } from "react-animation-components";
class Dishdetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleEditGoal(values) {
    this.props.postComment(
      this.props.dish.id,
      values.rating,
      values.name,
      values.comm
    );
    this.toggleModal();
  }

  render() {
    const required = (val) => val && val.length;
    if (this.props.isLoading) {
      return (
        <div className="container">
          <div className="row">
            <CircularIndeterminate/>
          </div>
        </div>
      );
    } else if (this.props.errMess) {
      return (
        <div className="container">
          <div className="row">
            <h4>{this.props.errMess}</h4>
          </div>
        </div>
      );
    } else if (this.props.dish != null)
      return (
        <div className=" bgcolor">
          <div className="container">
          <div className="row">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/menu">My Goals</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
              <h3>{this.props.dish.name}</h3>
              <hr />
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-5 m-1">
              <FadeTransform
                in
                transformProps={{
                  exitTransform: "scale(0.5) translateY(-50%)",
                }}
              >
                <Card>
                  <CardImg
                    top
                    src={baseUrl + this.props.dish.image}
                    alt={this.props.dish.name}
                  />
                  <CardBody>
                    <CardTitle>{this.props.dish.name}</CardTitle>
                  </CardBody>
                </Card>
              </FadeTransform>
            </div>

            <div className="col-12 col-md-5 m-1">
            <Card>
          <CardTitle>
            <h1>Goal No. : {this.props.dish.id+1}
            </h1>
          <hr/>
          </CardTitle>
          <CardBody>
          <Stagger in>
            <Fade in>
              <Media>
                <Media body>
                  <h5> Target:
                  {this.props.dish.target}</h5>
                  <br />
                  <h5>Time: {this.props.dish.time}</h5>
                  <br/>
                  <h3>Target Plan</h3>
                  <br/>
                  {this.props.dish.description}
                </Media>
              </Media>
            </Fade>
          </Stagger>
         <br/>
         <br/>
         <div style={{ display: "flex" }}>
          <Button style={{ marginLeft: "auto" }} outline color="info" onClick={this.toggleModal}>
                <span className="fa fa-pencil fa-lg"></span> Edit
          </Button>
          </div>
          </CardBody>
         </Card>
            </div>
          </div>
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
              <ModalHeader toggle={this.toggleModal}>{this.props.dish.name}</ModalHeader>
            <ModalBody>
            <LocalForm onSubmit={(values) => this.handleEditGoals(values)}>
          <Row className="form-group">
            <div className="col-12">
              <Label htmlFor="name" md={2}>
                Name
              </Label>
            </div>
            <div className="col-12 ">
              <Control.text
                model=".name"
                id="name"
                name="name"
                placeholder="Name"
                className="form-control"
                validators={{
                  required,
                }}
              />
              <Errors
                className="text-danger"
                model=".name"
                show="touched"
                messages={{
                  required: "Required",
                }}
              />
            </div>
          </Row>
          <Row className="form-group">
            <div className="col-12">
              <Label htmlFor="target" md={2}>
                Target
              </Label>
            </div>
            <div className="col-12">
              <Control.text
                model=".target"
                id="target"
                name="target"
                placeholder="Target"
                className="form-control"
                validators={{
                 required,
               }}
              />
              <Errors
                className="text-danger"
                model=".target"
                show="touched"
                messages={{
                  required: "Required",
                }}
              />
            </div>
          </Row>
          <Row className="form-group">
            <div className="col-12">
              <Label htmlFor="time" md={2}>
                Time
              </Label>
            </div>
            <div className="col-12">
              <Control.text
                model=".time"
                id="time"
                name="time"
                placeholder="Time"
                className="form-control"
                validators={{
                 required,
               }}
              />
              <Errors
                className="text-danger"
                model=".time"
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
                Add Goal
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
}

export default Dishdetail;
