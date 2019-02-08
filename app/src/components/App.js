import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Nav from './Nav'
import Dashboard from './Dashboard'
import Category from './CategoryPage'
import Post from './PostPage'
import Loading from './Loading'
import LoadingBar from 'react-redux-loading'
import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          {
            this.props.loading === true
              ? <Loading />
              :
              <div>
                <Nav />
                <Route path="/" exact component={Dashboard} />
                <Route path="/:category" exact component={Category} />
                <Route path="/:category/:postId" component={Post} />
              </div>
          }
        </Fragment>
      </Router>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  loadInitialData: () => dispatch(handleInitialData())
})

const mapStateToProps = ({ authedUser }) => ({
  loading: authedUser === null
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
