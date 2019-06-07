import React, {Component} from 'react';
import {Image} from 'semantic-ui-react';
import Score from './Score/score.jsx';
import {scoreStyle, genreStyle, genreListStyle, titleStyle,
    textSectionStyle, producerStyle} from './information.module.scss';
import RatingLabel from '../RatingLabel/raitngLabel.jsx';

class Information extends Component {
    constructor() {
        super();
        this.state = {
            title_japanese: '/',
            labelStyle: 'none',
        }
        this.scoreBangumi = this.scoreBangumi.bind(this);
    }

    componentDidMount() {
        if (this.props.bangumi.title_japanese) {
            this.setState({
                title_japanese: this.props.bangumi.title_japanese,
            })
        }
    }

    scoreBangumi() {
        alert('hello')
    }

    render() {
        let imageStyle = {
            width: '240px',
            height: '320px',
            border: '4px solid white',
        }
        let producers = this.props.bangumi.producers.map(producer => {
            return (
                <p>{producer.name}</p>
            )
        })
        if (producers.length === 0) {
            producers = <p>/</p>
        }
        let genres = this.props.bangumi.genres.map(genre => {
            return (
                <span className = {genreStyle}>{genre.name}</span>
            )
        })
        let studios = this.props.bangumi.studios.map(studio => {
            return (
                <p>{studio.name}</p>
            )
        })
        if (studios.length === 0) {
            studios = <p>/</p>;
        }
        let backgroundStyle = {
            background: 'url(' + this.props.bangumi.image_url + ')',
            'background-repeat': 'no-repeat',
            'background-position': 'center',
            'background-size': 'cover',
        }

        return (
                <div className = {scoreStyle} style = {backgroundStyle}> 
                    <Image rounded style = {imageStyle} src = {this.props.bangumi.image_url}/>
                    <div className = {textSectionStyle}>
                        <p className = {titleStyle}> {this.props.bangumi.title}</p>
                        <p className = {titleStyle}> {this.props.bangumi.title_japanese}</p>
                        <p className = {genreListStyle}>
                            {genres}
                        </p>
                        <div className = {producerStyle}>
                            <div>
                                <h4>Producers:</h4>
                                <p>{producers}</p>
                            </div>
                            <div style = {{'padding-left': '80px'}}>
                                <h4>Studios:</h4>
                                <p>{studios}</p>
                            </div>
                        </div>
                    </div>
                    <Score bangumiId = {this.props.bangumi.mal_id}
                    scoreBangumi = {this.scoreBangumi}/>
                    <RatingLabel/> 
                </div>
        )
    }
}

export default Information;