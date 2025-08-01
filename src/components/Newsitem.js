import React from 'react'
import NoImage from '../No-Preview-Available.jpg'

const Newsitem = (props) => {

    let { title, description, imageUrl, newsUrl, author, time } = props;
    return (
        <div className='my-3'>
            <div className="card">
                <img src={imageUrl ? imageUrl : NoImage} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-muted">By {author ? author : "Unknown"} on {time ? new Date(time).toGMTString() : "Unknown"}</small></p>
                    <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
                </div>
            </div>
        </div>
    )
}

export default Newsitem