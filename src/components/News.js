import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'


export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: "6",
    category: "general"
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handlePreviousClick = this.handlePreviousClick.bind(this);
  }

  updateNews = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d73a22ac34ff4fbd943c05b73fb12a0e&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles, totalResults: parsedData.totalResults
      , loading: false
    })
  }

  async componentDidMount() {
    await this.updateNews();
  }

  async handlePreviousClick() {

    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d73a22ac34ff4fbd943c05b73fb12a0e&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // this.setState({ articles: parsedData.articles, loading: false });
    // console.log(parsedData);

    // this.setState({
    //   page: this.state.page - 1
    // })
    await this.setState({ page: this.state.page - 1 });
    this.updateNews();
    console.log("previous");
  }

  async handleNextClick() {

    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d73a22ac34ff4fbd943c05b73fb12a0e&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // this.setState({ articles: parsedData.articles, loading: false });

    // this.setState({
    //   page: this.state.page + 1
    // })
    await this.setState({ page: this.state.page + 1 });
    this.updateNews();
    console.log("next");
  }



  render() {
    function trimLength(element, length) {
      let str = element.substring(0, length);
      return str.substring(0, str.lastIndexOf(' '));
    }
    return (
      <>
        <div className='container my-3'>
          <h1 className="text-center">NewsToday - Top Headlines</h1>
          {this.state.loading && <Spinner />}
          <div className="row">
            {!this.state.loading && this.state.articles.map((element) => {
              return <div key={element.url} className="col-md-4">
                <Newsitem title={element.title ? trimLength(element.title, 55) + "..." : ""} description={element.description ? trimLength(element.description, 200) + "..." : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} time={element.publishedAt} />
              </div>
            })}

          </div>
          <div className="container d-flex justify-content-between">
            <button disabled={this.state.page <= 1} onClick={this.handlePreviousClick} type="button" className="btn btn-dark">&larr; Previous</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} onClick={this.handleNextClick} type="button" className="btn btn-dark">Next &rarr;</button>
          </div>

        </div>
      </>
    )
  }
}
