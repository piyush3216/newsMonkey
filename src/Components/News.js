import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';
export default class News extends Component {

    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=59a7b282864142b39f49ba177737131f&pagesize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({articles : parseData.articles,
            totalResults: parseData.totalResults,
            loading: false});
    }

    constructor(){
        super();
        this.state ={
            articles: [],
            loading: false,
            page:1
        }
    }

    handlePrevClick = async() =>{
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=59a7b282864142b39f49ba177737131f&page=${this.state.page-1}&pagesize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({
            page: this.state.page - 1,
            articles : parseData.articles,
            loading: false
        })
    }

    handleNextClick = async() =>{
        if(!((this.state.page + 1)>Math.ceil(this.state.totalResults / this.props.pageSize))){
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=59a7b282864142b39f49ba177737131f&page=${this.state.page+1}&pagesize=${this.props.pageSize}`;
            this.setState({loading: true});
            let data = await fetch(url);
            let parseData = await data.json();
            this.setState({
                page: this.state.page + 1,
                articles : parseData.articles,
                loading: false
            })
    }

    }

    render() {
        return (
            <>
                <div className='container my-3'>
                    <h1 className="text-center my-4">NewsMonkey - Top Headlines</h1>
                    {this.state.loading && <Spinner/>}
                    <div className="row my-3">
                        {!this.state.loading && this.state.articles.map((element)=>{
                            return <div className='col-md-4 my-3' key={element.url}>
                            <NewsItems title ={element.title?element.title:""} discription = {element.description?element.description:""} imgUrl={element.urlToImage} newsUrl={element.url}/>
                        </div>
                        })}
                    </div>
                    <div className="container d-flex justify-content-between">
                        <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                        <button disabled={(this.state.page + 1)>Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                    </div>
                </div>
            </>
        )
    }
}
