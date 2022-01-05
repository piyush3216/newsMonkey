import React, { Component } from 'react'

export default class NewsItems extends Component {
    render() {
        let {title,discription,imgUrl,newsUrl} = this.props;
        return (
            <>
                <div className="card">
                    <img src={imgUrl?imgUrl:"https://cdn.paperpile.com/guides/img/g-newspaper-primary-source-image-400x400.png"} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{discription}</p>
                        <a href={newsUrl} target="_blank" rel='noreferrer' className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </>
        )
    }
}
