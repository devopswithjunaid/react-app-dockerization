import React, { Component } from 'react'

export default class Newsitem extends Component {
    
    
    render() {
        let {title, description,imageUrl,newsUrl} = this.props;
        return (
            <div className='my-3'>
               <div className="card" style={{width:'90%', margin:'auto'}}>
                    <img src={imageUrl} className="card-img-top" style={{width:'100%'}} alt="..."/>
                        <div className="card-body" style={{overflow:"hidden"}}>
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{description}</p>
                            <a href={newsUrl} rel="noreferrer" target="__blank" className="btn btn-dark btn-sm">Read More</a>
                        </div>
                </div>
            </div>
        )
    }
}
