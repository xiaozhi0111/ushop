
import React from 'react';
//引入qs库
import qs from 'querystring';
//引入css
import '../assets/css/list.css';
//引入接口
import { getPlayList } from '../utils/axios';
class List extends React.Component {
    constructor() {
        super();
        this.state = {
            songsList: [],
            songsInfo: '',
        }
    }
    componentDidMount() {
        let query = this.props.location.search.slice(1);//获取到？之后的参数
        getPlayList({
            id: qs.parse(query).id
        })
            .then(res => {
                console.log(res, '歌单详情列表');
                if (res.data.code == 200) {
                    this.setState({
                        songsInfo: res.data.playlist,
                        songsList: res.data.playlist.tracks,
                    });
                    console.log(this.state.songsList);
                }
            })
    }
    render() {
        let { songsList, songsInfo } = this.state;
        return (
            <div className="list">
                <div className="listStart">
                    <div className="listStart-bg"></div>
                    <div className="listStart-bg1"></div>
                    <div className="bg-content">
                        <div className="playlist_img">
                            <img src={songsInfo.coverImgUrl} alt="" />
                        </div>
                        <div className="playlist_cont">
                            <div className="text1">{songsInfo.name}</div>
                            <div className="text2">
                                <div className="text2_img">
                                    <img src={songsInfo.creator ? songsInfo.creator.avatarUrl : ''} alt="" />
                                    <span>
                                        {/* <img src={songsInfo.creator ? songsInfo.creator.avatarDetail.identityIconUrl : '../assets/images/datile-1.png' } alt=""/> */}
                                    </span>
                                </div>
                                {songsInfo.creator ? songsInfo.creator.nickname : ''}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="songs">
                    <h5>歌曲列表</h5>
                    <div className="songsList">
                        {
                            songsList.map((item, idx) => {
                                return (
                                    <div className="songsOne" key={item.id}>
                                        <div className="uid">{idx + 1}</div>
                                        <div className="detile">
                                            <div className="name">{item.name}</div>
                                            {
                                                item.ar.map((ar) => {
                                                    return (
                                                        <div 
                                                        key={ar.id}
                                                        className="singer">
                                                            {ar.name}
                                                        </div>
                                                    );
                                                })
                                            }
                                        </div>
                                        <div className="play">
                                            <span></span>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
                <div className="footer">
                    <div className='footer-cont'>
                        <span></span>
                        <div className="text1">官方动态歌单，根据你的口味定期更新好音乐</div>
                        <div className="text2">查看我的歌单</div>
                    </div>
                </div>

            </div>
        );
    }
}

export default List;