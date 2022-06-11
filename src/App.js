import './App.css';
import Navbar from './components/Navbar';
import News from './components/News'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import React, { Component } from 'react'
import LoadingBar from 'react-top-loading-bar'

// require("dotenv").config();


export default class App extends Component {
  pageSize = 6;
  Api = process.env.REACT_APP_NEWS_API;

  state = {
    progress: 0
  }

  setProgress = (prog) => {
    this.setState({ progress: prog })
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <LoadingBar color='red' progress={this.state.progress} shadow={true} loaderSpeed={1500} transitionTime={1500} height={2} />
          <Navbar />
          <Routes>
            <Route exact path="/" element={<News API={this.Api} setProgress={this.setProgress} key="general" pageSize={this.pageSize} country="in" category="general" />} />
            <Route exact path="/business" element={<News API={this.Api} setProgress={this.setProgress} key="business" pageSize={this.pageSize} country="in" category="business" />} />
            <Route exact path="/entertainment" element={<News API={this.Api} setProgress={this.setProgress} key="entertainment" pageSize={this.pageSize} country="in" category="entertainment" />} />
            <Route exact path="/health" element={<News API={this.Api} setProgress={this.setProgress} key="health" pageSize={this.pageSize} country="in" category="health" />} />
            <Route exact path="/science" element={<News API={this.Api} setProgress={this.setProgress} key="science" pageSize={this.pageSize} country="in" category="science" />} />
            <Route exact path="/sports" element={<News API={this.Api} setProgress={this.setProgress} key="sports" pageSize={this.pageSize} country="in" category="Sports" />} />
            <Route exact path="/technology" element={<News API={this.Api} setProgress={this.setProgress} key="technology" pageSize={this.pageSize} country="in" category="technology" />} />

          </Routes>
        </div >
      </BrowserRouter>
    )
  }
}