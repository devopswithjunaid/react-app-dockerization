import React, { useState, useEffect } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {

  //function that capitalize First Letter of the NavTabs
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  //state variable declaration
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  //updateNews function - fetches news from the external API
  const updateNews = async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.API}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(50);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults)
    setLoading(false);
    props.setProgress(100);
  }
  document.title = `${props.category !== "general" ? capitalizeFirstLetter(props.category) + " Headlines" : "Home"} - NewsToday`


  useEffect(() => {
    updateNews();
    // eslint-disable-next-line
  }, [])

  // const handlePreviousClick = async () => {
  //   setPage(page - 1);
  //   updateNews();
  //   console.log("previous");
  // }

  // const handleNextClick = async () => {
  //   setPage(page + 1);
  //   updateNews();
  //   console.log("next");
  // }

  const fetchData = async () => {
    setPage(page + 1);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.API}&page=${page + 1}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  }

  //trims the News title and description upto a specific word limit
  const trimLength = (element, length) => {
    let str = element.substring(0, length);
    return str.substring(0, str.lastIndexOf(' '));
  }

  //return statement of News function
  return (
    <>
      <div className='container' style={{marginTop:"5rem"}}>
        <h1 className="text-center">NewsToday - {props.category !== "general" ? capitalizeFirstLetter(props.category) + " Headlines" : "Home"}</h1>
        {loading && <Spinner />}

        {/* Infinite Scroll Bar Component*/}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
          endMessage={
            <p style={{ textAlign: "center", opacity: "0.2" }}>
              End
            </p>
          }
        >

          <div className="container">
            <div className="row">
              {articles.map((element) => {
                return <div key={element.url} className="col-md-4">
                  <Newsitem title={element.title ? trimLength(element.title, 55) + "..." : ""} description={element.description ? trimLength(element.description, 200) + "..." : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} time={element.publishedAt} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>

        {/* <div className="container d-flex justify-content-between">
            <button disabled={page <= 1} onClick={handlePreviousClick} type="button" className="btn btn-dark">&larr; Previous</button>
            <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} onClick={handleNextClick} type="button" className="btn btn-dark">Next &rarr;</button>
          </div> */}

      </div>
    </>
  )

}
News.defaultProps = {
  country: "in",
  pageSize: "6",
  category: "general"
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}
export default News;