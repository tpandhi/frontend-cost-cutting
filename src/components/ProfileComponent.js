import React from "react";
import {
    Breadcrumb,
  BreadcrumbItem,
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem ,
  Input,
  Form,
    Button,
    Row,
    Col,
  } from "reactstrap";
  import Avatar from 'react-avatar';
  import { Link } from "react-router-dom";
import  CircularIndeterminate  from "./LoadingComponent";
function Profile(props){
    if (props.leaders.isLoading) {
        return (
          <div className="container">
            <div className="row">
              <CircularIndeterminate />
            </div>
          </div>
        );
      } else if (props.leaders.errMess) {
        return (
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h4>{props.leaders.errMess}</h4>
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
              <Breadcrumb>
                <BreadcrumbItem>
                  <Link to="/home">Home</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>My Profile</BreadcrumbItem>
              </Breadcrumb>
              <div className="col-12">
                <h3>My Profile</h3>
                <hr />
              </div>
            </div>
            <Card small className="mb-4">
    <CardHeader className="border-bottom">
      <h3 className="m-0">My Details</h3>
    </CardHeader>
    <ListGroup flush>
      <ListGroupItem className="p-3">
        <Row>
          <Col>
            <Form>
              <Row form>
              <Col  md="12"className="mb-2 pt-3">
                  <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding:"20px 20px 20px 20px",
                     margin:"0px auto"
                      }} className="mb-2">
                  <Avatar color={Avatar.getRandomColor('sitebase', ['red', 'green', 'turquoise'])} size="200" name={props.leaders.leaders[0].firstname} />
                 </div>
                 </Col>
                 </Row>
                 <Row form>
                {/* First Name */}
                <Col md="6" className="form-group">
                  <label htmlFor="feFirstName">First Name</label>
                  <Input
                    id="feFirstName"
                    placeholder={props.leaders.leaders[0].firstname} 
                    onChange={() => {}}
                  />
                </Col>
                {/* Last Name */}
                <Col md="6" className="form-group">
                  <label htmlFor="feLastName">Last Name</label>
                  <Input
                    id="feLastName"
                    placeholder={props.leaders.leaders[0].lastname}
                    value={props.leaders.leaders[0].lastname}
                    onChange={() => {}}
                  />
                </Col>
                </Row>
                <Row form>
                {/* Email */}
                <Col md="6" className="form-group">
                  <label htmlFor="feEmail">Email</label>
                  <Input
                    type="email"
                    id="feEmail"
                    placeholder={props.leaders.leaders[0].email}
                    onChange={() => {}}
                    autoComplete="email"
                  />
                </Col>
                {/* Password */}
                <Col md="6" className="form-group">
                  <label htmlFor="fePassword">Password</label>
                  <Input
                    type="password"
                    id="fePassword"
                    placeholder={props.leaders.leaders[0].password}
                    onChange={() => {}}
                    autoComplete="current-password"
                  />
                </Col>
              </Row>
              <Row form>
                {/* City */}
                <Col md="6" className="form-group">
                  <label htmlFor="feIncome">Monthly Household Income</label>
                  <Input type="number"
                    id="feIncome"
                    placeholder={props.leaders.leaders[0].income}
                    onChange={() => {}}
                  />
                </Col>
                {/* State */}
                <Col md="6" className="form-group">
                  <label htmlFor="feFamilyMembers">No. of Family Members</label>
                  <Input type="number" 
                  id="fefamilymembers"
                  placeholder={props.leaders.leaders[0].familymembers}
                  value={props.leaders.leaders[0].familymember}
                  onChange={() => {}}>
                  </Input>
                </Col>
              </Row>
              <div style={{ display: "flex" }}>
              <Button style={{ marginLeft: "auto" }} theme="accent" color="info">Update Account</Button></div>
            </Form>
          </Col>
        </Row>
      </ListGroupItem>
    </ListGroup>
  </Card>
</div>
</div>
        );
}
}
export default Profile;