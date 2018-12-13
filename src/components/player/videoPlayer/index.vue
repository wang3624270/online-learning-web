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
        <div>
            <div class="right">
                <div class="am-u-md-6 am-u-sm-12 row-mb self-style-r">
                    <div class="tpl-portlet">
                        <div class="tpl-portlet-title">
                            <div class="tpl-caption font-green ">
                                <span>课程资料下载</span>
                            </div>
                        </div>
                        <el-table :data="folderList" style="width: 100%">
                            <el-table-column prop="folderName" label="资料名称"></el-table-column>
                            <el-table-column label="下载">
                                <template slot-scope="scope">
                                    <el-button @click="download(scope.row.accId)" type="text" size="small" v-if="scope.row.accId!=''">点击下载</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
            <div class="left">
                <div class="am-u-md-6 am-u-sm-12 row-mb self-style-left">
                    <div class="tpl-portlet">
                        <el-tabs v-model="activeTab">
                            <el-tab-pane v-for="tab in tabs" :key="tab.label" :label="tab.label" :name="tab.value"></el-tab-pane>
                        </el-tabs>
                        <div>
                            <portal-course-interlocution v-if="activeTab == 'COURSE-INTERLOCUTION'" :show="courseInterlocution" :data="form"></portal-course-interlocution>
                            <portal-course-comment v-if="activeTab == 'COURSE-COMMENT'" :show="courseComment" :data="form"></portal-course-comment>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import CourseInterface from '@/interfaces/courseInterface';
    import 'video.js/dist/video-js.css';
    import '../assets/css/video.css';
    import { videoPlayer } from 'vue-video-player';
    import CourseInterlocution from '@/components/course/courseStudy/courseDetails/courseInterlocution.vue';
    import CourseComment from '@/components/course/courseStudy/courseDetails/courseComment.vue';

    export default {
        data() {
            return {
                form:{
                    taskId:'',
                    courseId:''
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
                tabs: [
                    { label: '课程问答', value: 'COURSE-INTERLOCUTION' },
                    { label: '课程评论', value: 'COURSE-COMMENT' }
                ],
                activeTab: '',
                courseInterlocution:false,
                courseComment: false,
            };
        },
        components: {
            videoPlayer,
            'portal-course-interlocution':CourseInterlocution,
            'portal-course-comment':CourseComment
        },
        watch: {
            activeTab(val) {
                switch(val) {
                    case 'COURSE-INTERLOCUTION':
                        this.courseInterlocution = true;
                        this.courseComment = false;
                        break;
                    default:
                        this.courseInterlocution = false;
                        this.courseComment = true;
                }
            }
        },
        created(){
            this.activeTab = 'COURSE-INTERLOCUTION';
        },
        beforeMount(){
            this.initSectionResource();
            this.form.taskId = this.$route.query.taskId || null;
            this.form.courseId = this.$route.query.courseId || null;
        },
        mounted() {
            console.log('this is current player instance object', this.player)
        },
        computed: {
            player() {
                return this.$refs.videoPlayer.player
            }
        },
        methods: {
            initSectionResource(){
                this.loading=true;
                let params={
                    taskId:parseInt(this.$route.query.taskId) || null,
                    sectionId:parseInt(this.$route.query.sectionId) || null,
                };
                CourseInterface.getSectionResourceInfo(params).then( (res) => {
                    if (res.re == CourseInterface.SUCCESS) {
                        let data=res.data;
                        this.playerOptions.sources[0].src=CourseInterface.videoPlayUrl(data.videoAcc);
                        this.folderList=data.folderList;
                        this.loading=false;
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                        this.$route.push({
                            path:'/'
                        })
                    }
                });
            },
            download(accId){
                let params={
                    accId:accId
                }
                CourseInterface.downloadResource(params);
            },
            // listen event
            onPlayerPlay(player) {
                // console.log('player play!', player)
                this.loading=false;
            },
            onPlayerPause(player) {
                //console.log('player pause!', player)
            },
            // ...player event
            onPlayerEnded(player) {
                // console.log('player pause!', player)
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
            }
        }
    };
</script>
<style scoped>
    .video-footer{
        height: 50px;
        background-color: #fff;
    }
    .left{
        margin-right: 400px;
    }
    .right{
        float: right;
        width: 400px;
    }
    .self-style-left{
        min-width: 450px;
        margin-top: 18px;
        width: 100%;
    }
    .self-style-r{
        padding-left: 0px;
        margin-top: 18px;
        width: 100%;
    }
    .td-font-size{
        font-size: 12px;
    }
</style>
