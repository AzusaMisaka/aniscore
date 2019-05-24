import React, {Component} from 'react';
import axios from 'axios';
import MainMenu from '../MainMenu/mainMenu.jsx';
import Navibar from '../MainMenu/Navibar/navibar.jsx';
import {pageContainer,textStyle, imageStyle} from '../HomePage/homepage.module.scss';
import {Label, Image, Button} from 'semantic-ui-react';
import Select from 'react-select';
import {pageStyle, bangumiSection, bangumiStyle, hoverPart, numberlistStyle, numberStyle} from './allBangumi.module.scss';

class Bangumi extends Component {
    constructor() {
        super();
        this.state = {
            bangumi: [], 
            selectYear: {},
            displayYear: '',
            month: '',
            pageNumber: 0,
            currentPage: 1,
            yearOptions: [],
        }
        this.toHomePage = this.toHomePage.bind(this);
        this.loginHandler = this.loginHandler.bind(this);
        this.signupHandler = this.signupHandler.bind(this);
        this.logoutHandler = this.logoutHandler.bind(this);
        this.toPrevious = this.toPrevious.bind(this);
        this.toNext = this.toNext.bind(this);
        this.yearHandler = this.yearHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    componentDidMount() {
        let year = 2018;
        let month = 1;
        let season = 'winter';
        //get current season anime
        axios.get('https://api.jikan.moe/v3/season/' + year + '/' + season)
        .then(response => {
            this.setState({
                bangumi: response.data.anime,
                displayYear: year,
                month: month,
            })
            if (response.data.anime.length % 30) {
                this.setState({
                    pageNumber: (response.data.anime.length-response.data.anime.length%30)/30 + 1
                })
            } else {
                this.setState({
                    pageNumber: response.data.anime.length/30,
                })
            }
        }).catch(err => {
            alert(err);
        })
        let yearList = [];
        for (let i = 2019; i >= 2010; i--) {
            let currYear = {
                label: i,
                value: i,
            };
            yearList.push(currYear);
        }
        this.setState({
            yearOptions: yearList,
        })
    }

    toHomePage() {
        this.props.history.push('/');
    }

    loginHandler() {
        this.props.history.push('/login');
    }

    signupHandler() {
        this.props.history.push('/signup');
    }

    logoutHandler() {
        this.props.history.push('/logout');
    }

    toPage(pageNumber) {
        this.setState({
            currentPage: pageNumber,
        })
    }

    toPrevious() {
        let pageNumber = this.state.currentPage-1;
        this.setState({
            currentPage: pageNumber,
        })
    }

    toNext() {
        let pageNumber = this.state.currentPage+1;
        this.setState({
            currentPage: pageNumber,
        })
    }

    yearHandler(selectYear) {
        this.setState({
            selectYear: selectYear,
        })
    }

    submitHandler() {
        if (this.state.selectYear.value === undefined) {
            alert('Please select a year');
            return;
        }
        let year = this.state.selectYear.value;
        let season = 'winter';
        let month = 1;
        axios.get('https://api.jikan.moe/v3/season/' + year + '/' + season)
        .then(response => {
            this.setState({
                bangumi: response.data.anime,
                displayYear: year,
                month: month,
            })
            if (response.data.anime.length % 30) {
                this.setState({
                    pageNumber: (response.data.anime.length-response.data.anime.length%30)/30 + 1
                })
            } else {
                this.setState({
                    pageNumber: response.data.anime.length/30,
                })
            }
        }).catch(err => {
            alert(err);
        })
    }

    render() {
        if (this.state.displayYear === '' || this.state.bangumi.length === 0) {
            return(
                <div>
                <Navibar
                toHomePage = {this.props.toHomePage}
                loginHandler = {this.props.loginHandler}
                signupHandler = {this.props.signupHandler}
                logoutHandler = {this.props.logoutHandler}/>
                <div className = {pageContainer}>
                    <div>
                        <Image className = {imageStyle} src="http://b-ssl.duitang.com/uploads/item/201701/20/20170120164701_Zjuwi.thumb.224_0.gif" alt = 'loading'/>
                    </div>
                    <p className = {textStyle}>
                        Loading ... 
                    </p>
                </div>
            </div>
            )
        }
        let labelStyle = {
            'max-width': '200px',
            'min-width': '200px',
            'height': 'auto',
            background: 'white',
        }
        let imgStyle = {
            'max-width': '175px',
            height: '250px',
        }
        let currentPageStyle = {
            color: 'blue',
        }
        let previousStyle = {
            display: 'inline',
        }
        let nextStyle = {
            display: 'inline',
        }
        if (this.state.currentPage === 1) {
            previousStyle = {
                display: 'none',
            }
        }
        if (this.state.currentPage === this.state.pageNumber) {
            nextStyle = {
                display: 'none',
            }
        }
        let currentBangumi = [];
        if (30*(this.state.currentPage) <= this.state.bangumi.length) {
            currentBangumi = this.state.bangumi.slice(30*(this.state.currentPage-1), 30*(this.state.currentPage));
        } else {
            currentBangumi = this.state.bangumi.slice(30*(this.state.currentPage-1));
        }
        // process each bangumi
        let currentList = currentBangumi.map(bangumi => {
            return(
                <Label style = {labelStyle}>
                    <Image className = {hoverPart} style = {imgStyle} src = {bangumi.image_url} />
                    <p className = {hoverPart}>{bangumi.title}</p>
                </Label>
            )
        })
        // set page number list 
        let pageArr = [];
        for (let i = 0; i < this.state.pageNumber; i++) {
            pageArr.push(i+1);
        }
        let pageList = pageArr.map(page => {
            if (page === this.state.currentPage) {
                return(
                    <span className = {numberStyle} onClick = {this.toPage.bind(this, page)} style = {currentPageStyle}>{page}</span>
                )
            }
            return(
                <span className = {numberStyle} onClick = {this.toPage.bind(this, page)}>{page}</span>
            )
        })
        return(
            <div className = {pageStyle}>
                 <MainMenu
                 toHomePage = {this.toHomePage}
                 loginHandler = {this.loginHandler}
                 signupHandler = {this.signupHandler}
                 logoutHandler = {this.logoutHandler}
                 toBangumi = {this.toBangumi}
                 toManga = {this.toManga}/>
                  <Select value = {this.state.selectYear} onChange = {this.yearHandler} options={this.state.yearOptions}/>
                  <Button onClick = {this.submitHandler}>Submit</Button>
                <div>
                    <div className = {bangumiSection}>
                        <h3>{this.state.displayYear}年</h3>
                        <h3>{this.state.month}月</h3>
                        <div className = {bangumiStyle}>
                            {currentList}
                        </div>
                        <div className = {numberlistStyle} >
                            <p>Page</p>
                            <p className = {numberStyle} style = {previousStyle} onClick = {this.toPrevious}>Prev</p>
                            {pageList}
                            <p className = {numberStyle} style = {nextStyle} onClick = {this.toNext}>Next</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Bangumi;