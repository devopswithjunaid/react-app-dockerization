import React, { useState, useEffect } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    document.title = `${props.category !== "general" ? capitalizeFirstLetter(props.category) + " Headlines" : "Home"} - NewsToday`;

    const updateNews = async () => {
      props.setProgress(10);
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.API}&page=1&pageSize=${props.pageSize}`;
      setLoading(true);
      try {
        const data = await fetch(url);
        props.setProgress(30);
        const parsedData = await data.json();
        props.setProgress(50);
        if (parsedData.articles && Array.isArray(parsedData.articles)) {
          setArticles(parsedData.articles);
          setTotalResults(parsedData.totalResults);
        } else {
          console.error("Could not fetch articles. Response:", parsedData);
          setArticles([]);
          setTotalResults(0);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
        setArticles([]);
        setTotalResults(0);
      }
      setLoading(false);
      props.setProgress(100);
    }

    updateNews();
    // Because of the `key` prop in App.js, this component remounts on category change,
    // so we don't need to add props to the dependency array.
    // eslint-disable-next-line
  }, []);

  const fetchData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.API}&page=${page + 1}&pageSize=${props.pageSize}`;
    setPage(page + 1);
    try {
      const data = await fetch(url);
      const parsedData = await data.json();
      if (parsedData.articles && Array.isArray(parsedData.articles)) {
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
      } else {
        console.error("Could not fetch more articles. Response:", parsedData);
      }
    } catch (error) {
        console.error("Error fetching more news:", error);
    }
  }

  const trimLength = (element, length) => {
    let str = element.substring(0, length);
    return str.substring(0, str.lastIndexOf(' '));
  }

  return (
    <>
      <div className='container' style={{marginTop:"5rem"}}>
        <h1 className="text-center">NewsToday - {props.category !== "general" ? capitalizeFirstLetter(props.category) + " Headlines" : "Home"}</h1>
        {loading && <Spinner />}

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
              {!loading && articles.map((element) => {
                return <div key={element.url} className="col-md-4">
                  <Newsitem title={element.title ? trimLength(element.title, 55) + "..." : ""} description={element.description ? trimLength(element.description, 200) + "..." : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} time={element.publishedAt} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    </>
  )
}

News.defaultProps = {
  country: "in",
  pageSize: 6,
  category: "general"
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  API: PropTypes.string,
  setProgress: PropTypes.func
}

export default News;