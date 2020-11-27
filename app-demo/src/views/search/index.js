
//引入核心库
import React from 'react';
//引入css
import './index.css';
//调取接口
import { getHotSearch, getDefaultSearch, getSearch } from '../../utils/axios';
class Search extends React.Component {
    constructor() {
        super();
        this.state = {
            tjList: [],
            songsInfo: {
                keywords: '',
                limit: 10,
            },
            songsList: [],
        };
        this.inpVal = React.createRef();
    }
    //挂载就触发。
    componentDidMount() {
        getHotSearch()
            .then(res => {
                console.log(res, '热搜列表');
                if (res.data.code == 200) {
                    this.setState({
                        tjList: res.data.data.filter((item, i) => { return i < 10 }),
                    })
                }
            });
        getDefaultSearch()
            .then(res => {
                console.log(res, '默认搜索数据');
            })
    }
    //清空输入框事件
    reset(){
        this.inpVal.current.value='';
        this.setState({
            songsList:[]
        });
    }
    //点击热搜关键字进行搜索，
    clickSearch(keywords) {
        // console.log(e.target.innerHTML, 'ddd');
        let { songsInfo } = this.state;
        this.inpVal.current.value = keywords;
        songsInfo.keywords = keywords;
        this.setState({
            songsInfo
        });
        getSearch(songsInfo)
            .then(res => {
                console.log(res, '搜索数据');
                if (res.data.code == 200) {
                    this.setState({
                        songsList: res.data.result.songs
                    });
                } else {
                    alert('搜索错误');
                }
            });
    }
    //输入框输入数据之后进行搜索，
    toSearch(e) {
        if (e.keyCode == 13 & e.target.value != '') {
            // console.log(e.target.value,'gogogo ');
            this.clickSearch(e.target.value);
        }
    }
    //监听输入框内容进行搜索。
    change(e){
        if(e.target.value!=''){
            this.clickSearch(e.target.value);
        }
        else{
            this.reset();
        }
    }
    render() {
        let iShow = '';
        if (this.inpVal.current){
            iShow=this.inpVal.current.value;
        }
            let { tjList, songsList } = this.state;
        return (
            <div className="searchIndex">
                <div className="input">
                    <div className="input1">
                        {/* <div className="search1"></div> */}
                        <input ref={this.inpVal} type="text" className="input1-1" 
                        onKeyUp={this.toSearch.bind(this)}
                        onChange={this.change.bind(this)} />
                        {/* <label className="hoder">搜索歌曲、歌手、专辑</label> */}
                        <i className={iShow ? 'show' : 'hid'} onClick={this.reset.bind(this)}>x</i>
                    </div>
                </div>
                <div className={iShow?'no':'tj'}>
                    <h6>热门搜索</h6>
                    <ul>
                        {
                            tjList.map((item, index) => {
                                return (
                                    <li onClick={this.clickSearch.bind(this, item.searchWord)} key={index}>
                                        {item.searchWord}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="searchList">
                    <div className='newsList'>
                        {
                            songsList.map((item) => {
                                return (
                                    <a key={item.id} >
                                        <div className="singlist clearFix">
                                            <div className="detail">
                                                <div className='name'>{item.name}</div>
                                                <div className="singer">
                                                    <i></i>
                                                    {item.ar.map((song) => {
                                                        return (
                                                            <span key={song.id}>{song.name}-</span>
                                                        );
                                                    })
                                                    }
                                                </div>
                                            </div>
                                            <div className="sgchfr">
                                                <span className='sgchfr11'></span>
                                            </div>
                                        </div>
                                    </a>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Search;