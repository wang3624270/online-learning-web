<template>
    <div>
        <video-player  v-loading="loading"
            class="video-player-box"
                       ref="videoPlayer"
                       :options="playerOptions"
                       :playsinline="true"
                       customEventName="customstatechangedeventname"

                       @play="onPlayerPlay($event)"
                       @pause="onPlayerPause($event)"
                       @ended="onPlayerEnded($event)"
                       @waiting="onPlayerWaiting($event)"
                       @playing="onPlayerPlaying($event)"
                       @loadeddata="onPlayerLoadeddata($event)"
                       @timeupdate="onPlayerTimeupdate($event)"
                       @canplay="onPlayerCanplay($event)"
                       @canplaythrough="onPlayerCanplaythrough($event)"

                       @statechanged="playerStateChanged($event)"
                       @ready="playerReadied">
        </video-player>
        <div class="video-footer"></div>
        <!--<el-button @click="onPlayerEnded" >开始考试</el-button>-->
    </div>
</template>
<script>
    import LectureInterface from '@/interfaces/lectureInterface';
    import 'video.js/dist/video-js.css';
    import '../assets/css/video.css';
    import { videoPlayer } from 'vue-video-player';

    export default {
        data() {
            return {
                form:{
                    liveId:''
                },
                playerOptions: {
                    // videojs options
                    autoplay: true,
                    muted: false,
                    loop: false,
                    preload: 'auto',
                    language: 'zh-CN',
                    aspectRatio: '16:9',
                    fluid: true,
                    playbackRates: [0.7, 1.0, 1.5, 2.0],
                    sources: [{
                        type: "video/mp4",
                        src:""
                        //src: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
                    }],
                    poster: "/static/images/author.jpg",
                    //notSupportedMessage: '此视频暂无法播放，请稍后再试'
                },
                folderList:[],
                loading:false,
            };
        },
        components: {
            videoPlayer
        },
        beforeMount(){
            this.initLiveResource();
        },
        mounted() {
            //console.log('this is current player instance object', this.player)
        },
        computed: {
            player() {
                return this.$refs.videoPlayer.player
            }
        },
        methods: {
            initLiveResource(){
                this.loading=true;
                let params={
                    lectureId:parseInt(this.$route.query.lectureId) || null
                };
                LectureInterface.getLectureLiveInfo(params).then( (res) => {
                    if (res.re == LectureInterface.SUCCESS) {
                        let data=res.data;
                        this.playerOptions.sources[0].src=data.outputUrl;
                        this.loading=false;
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                        this.$route.push({
                            path:'/'
                        })
                    }
                });
            },
            // listen event
            onPlayerPlay(player) {
                // console.log('player play!', player)
            },
            onPlayerPause(player) {
                //console.log('player pause!', player)
            },
            // ...player event
            onPlayerEnded(player) {

            },
            onPlayerWaiting(player) {
                // console.log('player pause!', player)
            },
            onPlayerPlaying(player) {
                // console.log('player pause!', player)
            },
            onPlayerLoadeddata(player) {
                // console.log('player pause!', player)
            },
            onPlayerTimeupdate(player) {
                // console.log('player pause!', player)
            },
            onPlayerCanplay(player) {
                // console.log('player pause!', player)
            },
            onPlayerCanplaythrough(player) {
                // console.log('player pause!', player)
            },
            // or listen state event
            playerStateChanged(playerCurrentState) {
                // console.log('player current update state', playerCurrentState)
            },
            // player is ready
            playerReadied(player) {
                //console.log('the player is readied', player)
                // you can use it to do something...
                // player.[methods]
            },
        }
    };
</script>
<style scoped>
    .video-footer{
        height: 50px;
        background-color: #fff;
    }
</style>
