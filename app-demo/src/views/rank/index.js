//引入核心库
import React from 'react';
//引入css
import './index.css';
//引入调取的接口
import { getTop } from '../../utils/axios';
//创建类。
class Rank extends React.Component {
    constructor() {
        super();
        this.state = {
            songsList: []
        }
    }
    componentDidMount() {
        //获取热歌榜数据
        getTop({
            id: 3778678
        })
            .then(res => {
                // console.log(res, '热歌排行榜数据');
                if (res.data.code == 200) {
                    this.setState({
                        songsList: res.data.playlist.tracks.filter((item,i)=>{return i<10}),
                    })
                    // console.log(this.state.songsList[1].ar[0].name);
                }
            });
    }
    render() {
        let { songsList } = this.state;
        return (
            <div className="randIndex">
                <div className="img">
                    <div className="img_bg"></div>
                    <div className="timer">更新日期：11月19日</div>
                </div>
                <div className='songs'>
                    <div className="songsOne">
                        {
                            songsList.map((item, index) => {
                                return (
                                    <div className="songsOne1" key={item.id}>
                                        <div className="uid">{index + 1}</div>
                                        <div className="detile">
                                            <div className="name">{item.name}</div>
                                            <div className="singer">
                                                <i></i>
                                                {item.ar.map((songs) => {
                                                    return (
                                                        <span key={songs.id}>{songs.name}-</span>
                                                    );
                                                })}

                                            </div>
                                        </div>
                                        <div className="sgchfr">
                                            <span className='sgchfr11'></span>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
                <div className='footer'>
                    <span>查看完整榜单></span>
                </div>
            </div>
        );
    }
}

export default Rank;