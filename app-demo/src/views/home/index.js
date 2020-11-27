//引入核心库
import React from 'react';
//引入css
import './index.css';
//引入swiper组件。
import Swiper from 'swiper';
import 'swiper/css/swiper.min.css';
import 'swiper/js/swiper.min.js';
//引入接口
import { getPersonalized, getNewsong, getBanner } from '../../utils/axios';
class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            songList: [],
            singList: [],
            bannerList: [],
        }
    }
    componentDidMount() {

        getPersonalized({
            limit: 6
        })
            .then(res => {
                // console.log(res,'成功数据');
                if (res.data.code == 200) {
                    this.setState({
                        songList: res.data.result
                    })
                }
            });
        getNewsong()
            .then(res => {
                // console.log(res, '成功数据');
                if (res.data.code == 200) {
                    this.setState({
                        singList: res.data.result,
                    });
                }
            });
        getBanner()
            .then(res => {
                // console.log(res, '轮播图数据');
                if (res.data.code == 200) {
                    this.setState({
                        bannerList: res.data.banners,
                    }, () => {
                        new Swiper('.swiper-container', {
                            autoplay:{
                                delay:2000,
                            },
                            loop: true,
                            pagination: {
                                el: '.swiper-pagination',
                            },
                        });
                    });
                    // console.log(this.state.bannerList);
                } else {
                    alert('轮播图数据获取错误');
                }
            });

    }
    //封装一个方法跳转到列表页
    toList(id){ 
        this.props.history.push(`/list?id=${id}`);
    }
    render() {
        let { songList, singList, bannerList } = this.state;
        return (
            <div className="homeIndex">
                {/* <h3>主页</h3> */}
                {/* <!-- Swiper --> */}
                <div className="swiper-container">
                    <div className="swiper-wrapper">
                        {bannerList.map((item, index) => {
                            return (
                                <div className="swiper-slide" key={index}>
                                    <img src={item.imageUrl} alt="" />
                                </div>
                            );
                        })}

                    </div>
                    {/* <!-- Add Pagination --> */}
                    <div className="swiper-pagination"></div>
                </div>
                <div className="recommend">
                    <div className="h5">推荐歌单</div>
                    <ul className='clearFix'>
                        {
                            songList.map((item) => {
                                return (
                                    <li key={item.id} onClick={this.toList.bind(this,item.id)}>
                                        <img src={item.picUrl} />
                                        <p>{item.name}</p>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
                <div className="lastest">
                    <div className="h5">最新音乐</div>
                    <div className='newsList'>
                        {
                            singList.map((item) => {
                                return (
                                    <a key={item.id} >
                                        <div className="singlist clearFix">
                                            <div className="detail">
                                                <div className='name'>{item.name}</div>
                                                <div className="singer">
                                                    <i></i>
                                                    {item.song.artists.map((song) => {
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
                <div className="footer">
                    <div className="title1">
                        <i></i>
                        网易云音乐
                        </div>
                    <div className="text1">打开APP，发现更多好音乐></div>
                    <div className="coperight">网易公司版权所有©1997-2020   杭州乐读科技有限公司运营</div>
                </div>
            </div>
        );
    }
}

export default Home;