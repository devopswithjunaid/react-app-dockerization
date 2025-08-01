import './App.css';
import Navbar from './components/Navbar';
import News from './components/News'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from 'react'
import LoadingBar from 'react-top-loading-bar'

export default function App() {
  const Api = process.env.REACT_APP_NEWS_API;
  const [progress, setProgress] = useState(0);

  return (
    <BrowserRouter>
      <div>
        <LoadingBar color='red' progress={progress} shadow={true} loaderSpeed={1500} transitionTime={1500} height={2} />
        <Navbar />
        <Routes>
          <Route exact path="/" element={<News API={Api} setProgress={setProgress} key="general" country="in" category="general" />} />
          <Route exact path="/business" element={<News API={Api} setProgress={setProgress} key="business" country="in" category="business" />} />
          <Route exact path="/entertainment" element={<News API={Api} setProgress={setProgress} key="entertainment" country="in" category="entertainment" />} />
          <Route exact path="/health" element={<News API={Api} setProgress={setProgress} key="health" country="in" category="health" />} />
          <Route exact path="/science" element={<News API={Api} setProgress={setProgress} key="science" country="in" category="science" />} />
          <Route exact path="/sports" element={<News API={Api} setProgress={setProgress} key="sports" country="in" category="Sports" />} />
          <Route exact path="/technology" element={<News API={Api} setProgress={setProgress} key="technology" country="in" category="technology" />} />

        </Routes>
      </div >
    </BrowserRouter>
  )
}
