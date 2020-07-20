import React, { Component } from "react";
import Home from "./HomeComponent";
import Menu from "./MenuComponent";
import DishDetail from "./DishdetailComponent";
import Contact from "./ContactComponent";
import About from "./AboutComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import Header from "./HeaderComponent";
import Profile from "./ProfileComponent";
import Footer from "./FooterComponent";
import SignUp from "./SignUpFormComponent";
import UserHome from"./UserHome";
import ParticlesBg from "particles-bg";
import { connect } from "react-redux";
import {
  postComment,
  fetchDishes,
  fetchComments,
  fetchPromos,
  fetchLeaders,
  postFeedback,
  postDish,
} from "../redux/ActionCreators";
import { actions } from "react-redux-form";
import { TransitionGroup, CSSTransition } from "react-transition-group";



const mapDispatchToProps = (dispatch) => ({
  postComment: (leaderId, expense,ideal) =>
    dispatch(postComment(leaderId, expense,ideal)),
    postDish: (name, target,time) =>
    dispatch(postDish(name,target, time)),
  postFeedback: (
    firstname,
    lastname,
    telnum,
    email,
    agree,
    contactType,
    message
  ) =>
    dispatch(
      postFeedback(
        firstname,
        lastname,
        telnum,
        email,
        agree,
        contactType,
        message
      )
    ),
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
  resetFeedbackForm: () => {
    dispatch(actions.reset("feedback"));
  },
});

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  onLeaderSelect(dishId) {
    this.setState({ selectedLeader: dishId });
  }

  render() {
    const HomePage = () => {
      return (
        <Home
          dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishErrMess={this.props.dishes.errMess}
          promotion={
            this.props.promotions.promotions.filter(
              (promo) => promo.featured
            )[0]
          }
          promoLoading={this.props.promotions.isLoading}
          promoErrMess={this.props.promotions.errMess}
          leader={this.props.leaders.leaders.filter((lead) => lead.featured)[0]}
          leaderLoading={this.props.leaders.isLoading}
          leaderErrMess={this.props.leaders.errMess}
        />
      );
    };
    const UserHomePage = ({match}) => {
      return (
        <UserHome
        leader={this.props.leaders.leaders.filter((lead) => lead.featured)[0]}
        leaderLoading={this.props.leaders.isLoading}
        leaderErrMess={this.props.leaders.errMess}
        comments={this.props.comments}
        postComment={this.props.postComment}
        />
      );
    };

    const DishWithId = ({ match }) => {
      return (
        <DishDetail
          dish={
            this.props.dishes.dishes.filter(
              (dish) => dish.id === parseInt(match.params.dishId, 10)
            )[0]
          }
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.comments.filter(
            (comment) => comment.dishId === parseInt(match.params.dishId, 10)
          )}
          commentsErrMess={this.props.comments.errMess}
          postComment={this.props.postComment}
        />
      );
    };
    let config = {
      num: [4,10],
      rps: 2,
      radius: [200, 400],
      life: [4, 5],
      v: [2, 3],
      tha: [-40, 40],
      alpha: [0.6, 0],
      scale: [.1, 0.4],
      position: "all",
      color: ["random", "#ff0000"],
      cross: "dead",
      // emitter: "follow",
      random: null
    };

    if (Math.random() > 0.85) {
      config = Object.assign(config, {
        onParticleUpdate: (ctx, particle) => {
          ctx.beginPath();
          ctx.rect(
            particle.p.x,
            particle.p.y,
            particle.radius * 2,
            particle.radius * 2
          );
          ctx.fillStyle = particle.color;
          ctx.fill();
          ctx.closePath();
        }
      });
    }

    return (
      
      <div>
        <Header />
       
        <TransitionGroup>
          <CSSTransition
            key={this.props.location.key}
            classNames="page"
            timeout={300}
          >
            <Switch location={this.props.location}>
              <Route path="/home" component={HomePage} />
              <Route path="/userhome" component={UserHomePage} />
              <Route
                exact
                path="/aboutus"
                component={() => <About leaders={this.props.leaders} />}
              />
              <Route
                exact
                path="/signupform"
                component={() => <SignUp />}
              />
              <Route
                exact
                path="/profile"
                component={() => <Profile leaders={this.props.leaders}/>}
              />
              <Route
                exact
                path="/menu"
                component={() => <Menu dishes={this.props.dishes} postDish={this.props.postDish} />}
              />
              <Route path="/menu/:dishId" component={DishWithId} />
              <Route
                exact
                path="/contactus"
                component={() => (
                  <Contact
                    resetFeedbackForm={this.props.resetFeedbackForm}
                    postFeedback={this.props.postFeedback}
                  />
                )}
              />
             <Redirect to ="/home"/>
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
        <ParticlesBg type="custom" className="particles" config={config}   bg={true} />
        </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
