import React, { Component } from 'react'
import Newsitem from './Newsitem'

export default class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
      pageSize: 3
    };
    this.handlenextClick = this.handlenextClick.bind(this);
    this.handlenextClick = this.handlenextClick.bind(this);
  }
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=5ea39234f8a04561ba3d762dd516948a&page=1&pageSize=${this.state.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults })
    console.log(parsedData);
  }
  // articles = [
  //   {
  //     "source": { "id": "google-news-in", "name": "Google News (India)" },
  //     "author": "Rajat Pandit",
  //     "title": "Defence ministry gives initial nod to military modernisation projects worth Rs 76,000 crore, including 8 next-generation corvettes",
  //     "description": "India News: The eight corvettes, which will be designed for anti-surface and anti-submarine warfare as well as anti-missile defence operations, will be constructed",
  //     "url": "https://timesofindia.indiatimes.com/india/defence-ministry-gives-initial-nod-to-military-modernisation-projects-worth-rs-76000-crore-including-8-next-generation-corvettes/articleshow/92039841.cms",
  //     "urlToImage": "https://static.toiimg.com/thumb/msid-92039908,width-1070,height-580,imgsize-57920,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg",
  //     "publishedAt": "2022-06-06T12:13:00+00:00",
  //     "content": "India News: The eight corvettes, which will be designed for anti-surface and anti-submarine warfare as well as anti-missile defence operations, will be constructe"
  //   },
  //   {
  //     "source": { "id": "google-news-in", "name": "Google News (India)" },
  //     "author": "HT News Desk",
  //     "title": "‘Shameful bigotry not only isolated us…’: Rahul blasts BJP on Prophet remark row",
  //     "description": "Rahul Gandhi's remarks came in the wake of a major global uproar, mostly Muslim nations, in protest against comments made by BJP functionaries Nupur Sharma and Naveen Jindal, who were removed from the party a day ago. | Latest News India",
  //     "url": "https://www.hindustantimes.com/india-news/rahul-gandhi-bjp-s-bigotry-has-not-only-isolated-us-but-also-damaged-globally-101654510453850.html",
  //     "urlToImage": "https://images.hindustantimes.com/img/2022/06/06/1600x900/b45c48da-cb7b-11ec-a46f-a29bd7e5e767_1651649562693_1654511675390.jpg",
  //     "publishedAt": "2022-06-06T10:28:11+00:00",
  //     "content": "Congress leader Rahul Gandhi on Monday hit out at the ruling Bharatiya Janata Party (BJP) over massive diplomatic fallout the country was dealing with in the aftermath of comments made against Prophe… [+2102 chars]"
  //   },
  //   {
  //     "source": { "id": "bbc-news", "name": "BBC News" },
  //     "author": "BBC News",
  //     "title": "Nupur Sharma: Prophet Muhammad controversy strains India-Arab ties",
  //     "description": "Saudi Arabia, Kuwait, Qatar and Iran have registered protests over the remark by BJP leader Nupur Sharma.",
  //     "url": "http://www.bbc.co.uk/news/world-asia-india-61701908",
  //     "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/187C/production/_125286260_nupursharma.jpg",
  //     "publishedAt": "2022-06-06T07:07:28.5095927Z",
  //     "content": "By Vikas PandeyBBC News, Delhi\r\nImage source, Getty Images\r\nImage caption, India shares a cordial relationship with Saudi Arabia\r\nIndia has been forced to placate its partners in the Islamic world af… [+6534 chars]"
  //   },
  //   {
  //     "source": { "id": "google-news-au", "name": "Google News (Australia)" },
  //     "author": "ABC News",
  //     "title": "Indian government in the eye of a diplomatic storm after hate remarks about Prophet",
  //     "description": "Iran, Qatar and Kuwait summon the countries' Indian ambassadors, to lodge protests after remarks made by India's ruling party spokeswoman about the Prophet Mohammed.",
  //     "url": "https://www.abc.net.au/news/2022-06-06/india-bjp-suspends-official-over-hate-remarks-against-prophet/101129752",
  //     "urlToImage": "https://live-production.wcms.abc-cdn.net.au/2e9b811c328a178adafc497fa63d49e9?impolicy=wcms_crop_resize&cropH=1688&cropW=3000&xPos=0&yPos=17&width=862&height=485",
  //     "publishedAt": "2022-06-06T06:34:55+00:00",
  //     "content": "India's ruling Bharatiya Janata Party (BJP) has suspended its spokeswoman, Nupur Sharma, after comments she made during a TV debate about the Prophet Mohammed.\r\nKey points:\r\n<ul><li>Several Muslim co… [+2615 chars]"
  //   },
  //   {
  //     "source": {
  //       "id": "the-washington-times",
  //       "name": "The Washington Times"
  //     },
  //     "author": "Stephen Dinan",
  //     "title": "Feds bust extensive Uber smuggling ring at northern border",
  //     "description": "Federal authorities say Rajinder Pal Singh had figured out a pretty sweet scam, smuggling illegal immigrants from India across the northern border and into the Seattle area -- by putting them in Ubers.",
  //     "url": "https://www.washingtontimes.com/news/2022/jun/5/feds-bust-extensive-uber-smuggling-ring-northern-b/",
  //     "urlToImage": "https://twt-thumbs.washtimes.com/media/image/2022/01/21/canada_us_border_deaths_99322_c0-162-3900-2437_s1200x700.jpg?c1f1f770fef2fba48b8e857ce4d05e8d5142cf2d",
  //     "publishedAt": "2022-06-05T08:04:40Z",
  //     "content": "Federal authorities say Rajinder Pal Singh had figured out a pretty sweet scam, smuggling illegal immigrants from India across the northern border and into the Seattle area by putting them in Ubers.\r… [+6972 chars]"
  //   },
  //   {
  //     "source": { "id": "fortune", "name": "Fortune" },
  //     "author": "Emma Hinchliffe, Paige McGlauflin",
  //     "title": "Why a former SoftBank partner is tackling mid-career drop-off for working mothers",
  //     "description": "Former SoftBank partner and Facebook India director Kirthiga Reddy is the cofounder of Laddrr, a resource hub for working mothers aiming to prevent mid-career drop-off.",
  //     "url": "https://fortune.com/2022/06/01/former-softbank-partner-tackling-mid-career-drop-off-for-working-mothers/",
  //     "urlToImage": "https://content.fortune.com/wp-content/uploads/2022/05/Kirthiga1.jpg?resize=1200,600",
  //     "publishedAt": "2022-06-01T13:22:34Z",
  //     "content": "Skip to Content"
  //   }
  // ];

  handlepreviousClick = async () => {

    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=5ea39234f8a04561ba3d762dd516948a&page=${this.state.page - 1}&pageSize=${this.state.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ articles: parsedData.articles });
    console.log(parsedData);

    this.setState({
      page: this.state.page - 1
    })
    console.log("previous");
  }

  async handlenextClick() {

    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=5ea39234f8a04561ba3d762dd516948a&page=${this.state.page + 1}&${this.state.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ articles: parsedData.articles });
    console.log(parsedData);

    this.setState({
      page: this.state.page + 1
    })
    console.log("next");
  }



  render() {
    function trimLength(element, length) {
      let str = element.substring(0, length);
      return str.substring(0, str.lastIndexOf(' '));
    }
    return (
      <div className='container my-3'>
        <h1 className="text-center">NewsToday - Top Headlines</h1>
        <div className="row">
          {this.state.articles.map((element) => {
            return <div key={element.url} className="col-md-4">
              <Newsitem title={element.title ? trimLength(element.title, 55) + "..." : ""} description={element.description ? trimLength(element.description, 200) + "..." : ""} imageUrl={element.urlToImage} newsUrl={element.url} />
            </div>
          })}

        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} onClick={this.handlepreviousClick} type="button" className="btn btn-dark">&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.state.pageSize)} onClick={this.handlenextClick} type="button" className="btn btn-dark">Next &rarr;</button>
        </div>

      </div>
    )
  }
}
