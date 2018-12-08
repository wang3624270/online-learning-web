<template>
    <!-- mian-content -->
    <div id="root" v-loading.fullscreen.lock="loading">
        <header class="index-banner" id="home">
            <!-- nav -->
            <nav class="main-header d-flex">
                <div id="brand">
                    <div id="logo">
                        <a href="index.html">
                            <i class="fas logo-mini"></i>
                        </a>
                    </div>
                    <div id="word-mark">
                        <h1>
                            <a href="#">高校开放式学习平台</a>
                        </h1>
                    </div>
                </div>
                <div id="menu">
                    <div id="menu-toggle">
                        <div id="menu-icon">
                            <div class="bar"></div>
                            <div class="bar"></div>
                            <div class="bar"></div>
                        </div>
                    </div>
                    <ul class="text-center nav-honey">
                        <li>
                            <a href="/" class="scroll">主页</a>
                        </li>
                        <li>
                            <a class="scroll" href="#about">平台介绍</a>
                        </li>
                        <li>
                            <a class="scroll" href="#services">在线课程</a>
                        </li>
                        <li>
                            <a class="scroll" href="#projects">线下讲座</a>
                        </li>
                        <li>
                            <a class="scroll" href="#contact">联系我们</a>
                        </li>
                        <li>
                            <button @click='loginDialog' type="button" class="btn login-btn text-uppercase " data-toggle="modal" data-target="#exampleModalCenter">
                                登录
                            </button>
                        </li>
                    </ul>
                </div>
                <div class="clearfix"></div>
            </nav>
            <!-- //nav -->
            <!-- banner -->
            <div class="banner_section">
                <div class="snow-container">
                    <div class="snow foreground"></div>
                    <div class="snow foreground layered"></div>
                    <div class="snow middleground"></div>
                    <div class="snow middleground layered"></div>
                    <div class="snow background"></div>
                    <div class="snow background layered"></div>
                </div>
                <div class="banner-info text-uppercase">
                    <h6 data-aos="fade-right">Shandong University</h6>
                    <h5 data-aos="fade-right">开放性、多形式、兼顾线上和线下</h5>
                    <h3 data-text="一站式学习服务平台">一站式学习服务平台</h3>
                    <div class="ban-buttons mt-3" data-aos="fade-right">
                        <a class="btn work scroll" href="#services">在线课程</a>
                        <a class="btn work scroll active" href="#projects">讲座研讨</a>
                    </div>

                </div>
            </div>
            <!-- //banner -->
        </header>
        <!-- //header -->
        <!--// banner-slider -->
        <!-- banner-bottom-wthree -->
        <section class="banner-bottom-wthree py-lg-5 py-md-5 py-4" id="about">
            <div class="container">
                <div class="inner-sec-w3ls py-lg-5 py-4">
                    <div class="info-about text-center">
                        <h4 class="sub-tittle-w3">Introduction</h4>
                        <h3 class="tittle-w3 text-uppercase mb-lg-5 mb-3">欢迎访问高校开放式学习平台</h3>
                        <div class="row mt-lg-5 mt-3">
                            <div class="col-lg-4 progress-info-content text-left">
                                <div class="progress-one my-lg-5" data-aos="fade-up">
                                    <h4 class="progress-tittle-w3">在线课程参与</h4>
                                    <div class="progress">
                                        <div class="progress-bar progress-bar-striped" role="progressbar" style="width: 10%" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                                <div class="progress-one" data-aos="fade-up">
                                    <h4 class="progress-tittle-w3">课程问答参与</h4>
                                    <div class="progress">
                                        <div class="progress-bar progress-bar-striped bg-success" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>

                            </div>
                            <div class="col-lg-4 progress-info-content text-left">
                                <div class="progress-one my-lg-5" data-aos="fade-up">
                                    <h4 class="progress-tittle-w3">在线考试参与</h4>
                                    <div class="progress">
                                        <div class="progress-bar progress-bar-striped bg-info" role="progressbar" style="width: 50%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                                <div class="progress-one" data-aos="fade-up">
                                    <h4 class="progress-tittle-w3">课程实践参与</h4>
                                    <div class="progress">
                                        <div class="progress-bar progress-bar-striped bg-warning" role="progressbar" style="width: 70%" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 progress-info-content text-left">
                                <div class="progress-one my-lg-5" data-aos="fade-up">
                                    <h4 class="progress-tittle-w3">线下研讨参与</h4>
                                    <div class="progress">
                                        <div class="progress-bar progress-bar-striped bg-secondary" role="progressbar" style="width: 90%" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                                <div class="progress-one" data-aos="fade-up">
                                    <h4 class="progress-tittle-w3">线下讲座参与</h4>
                                    <div class="progress">

                                        <div class="progress-bar progress-bar-striped bg-danger" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!--// ab -->
        <!-- /services -->
        <section class="services py-md-5 py-4" id="services">
            <div class="container">
                <div class="inner-sec-w3ls py-md-5 py-4">
                    <h4 class="sub-tittle-w3 text-uppercase text-center">Online Course</h4>
                    <h3 class="tittle-w3 text-uppercase mb-lg-5 mb-3 text-center text-white">平台在线课程介绍</h3>
                    <div class="price-right">
                        <div class="tabs">
                            <ul class="nav nav-pills my-md-5 my-3 justify-content-center" id="pills-tab" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">公开课程</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">付费课程</a>
                                </li>

                            </ul>
                            <div class="tab-content" id="pills-tabContent">
                                <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                    <div class="menu-grids mt-4">
                                        <div class="row t-in">
                                            <div class="col-lg-4 service-in text-center" data-aos="flip-up">
                                                <div class="card">
                                                    <div class="card-body">
                                                        <i class="fas fa-list-ul mb-4"></i>
                                                        <h5 class="card-title text-uppercase">课程学习</h5>
                                                        <p class="card-text">主要通过音频课、视频课、文档在线学习等形式进行课程学习，在课程学习过程中，学生需要完成课程对应的在线练习。</p>
                                                    </div>
                                                </div>

                                            </div>
                                            <div class="col-lg-4 service-in text-center" data-aos="flip-up">
                                                <div class="card">
                                                    <div class="card-body">
                                                        <i class="far fa-lightbulb mb-4"></i>
                                                        <h5 class="card-title text-uppercase">课程问答</h5>
                                                        <p class="card-text">在课程学习过程中，学生需要完成课程对应的在线练习，并可以针对课程内容可以在平台中进行提问和交流。</p>
                                                    </div>
                                                </div>

                                            </div>
                                            <div class="col-lg-4 service-in text-center" data-aos="flip-up">
                                                <div class="card">
                                                    <div class="card-body">
                                                        <i class="far fa-clone mb-4"></i>
                                                        <h5 class="card-title text-uppercase">课程评论</h5>
                                                        <p class="card-text">课程学习完成后，学生需要完成对应的课程作业，教师定期批改课程作业，之后学生可以对课程进行评价，至此，学生完成课程学习</p>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- //services -->
        <!-- /experience -->
        <section class="experience py-lg-5 py-4" id="experience">
            <div class="timeline py-lg-5 py-3">
                <h4 class="sub-tittle-w3 text-uppercase text-center">Online Examination</h4>
                <h3 class="tittle-w3 text-uppercase mb-lg-5 mb-3 text-center">平台课程在线考试</h3>
                <div id="my-timeline"></div>
            </div>

        </section>
        <!-- //experience -->
        <!--gallery  -->
        <section class="gallery py-md-5 py-3" id="projects">
            <div class="gallery-inner container py-md-5 pb-3">
                <h4 class="sub-tittle-w3 text-uppercase text-center">Offline Lectures</h4>
                <h3 class="tittle-w3 text-uppercase mb-lg-5 mb-3 text-center">线下讲座</h3>
                <div class="row">

                    <div class="col-md-4 proj_gallery_grid" data-aos="zoom-in">
                        <div class="section_1_gallery_grid">
                            <a title="Donec sapien massa, placerat ac sodales ac, feugiat quis est." href="./assets/images/g1.jpg">
                                <div class="section_1_gallery_grid1">
                                    <img src="./assets/images/b1.jpg" alt=" " class="img-fluid" />
                                    <div class="proj_gallery_grid1_pos">
                                        <h3>主讲人</h3>

                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="section_1_gallery_grid" data-aos="zoom-in">
                            <a title="Donec sapien massa, placerat ac sodales ac, feugiat quis est." href="./assets/images/g2.jpg">
                                <div class="section_1_gallery_grid1">
                                    <img src="./assets/images/b2.jpg" alt=" " class="img-fluid" />
                                    <div class="proj_gallery_grid1_pos">
                                        <h3>主讲人</h3>

                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="section_1_gallery_grid" data-aos="zoom-in">
                            <a title="Donec sapien massa, placerat ac sodales ac, feugiat quis est." href="./assets/images/g3.jpg">
                                <div class="section_1_gallery_grid1">
                                    <img src="./assets/images/b3.jpg" alt=" " class="img-fluid" />
                                    <div class="proj_gallery_grid1_pos">
                                        <h3>主讲人</h3>

                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col-md-4 proj_gallery_grid" data-aos="zoom-in">
                        <div class="section_1_gallery_grid">
                            <a title="Donec sapien massa, placerat ac sodales ac, feugiat quis est." href="./assets/images/g4.jpg">
                                <div class="section_1_gallery_grid1">
                                    <img src="./assets/images/b4.jpg" alt=" " class="img-fluid" />
                                    <div class="proj_gallery_grid1_pos">
                                        <h3>听众</h3>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="section_1_gallery_grid" data-aos="zoom-in">
                            <a title="Donec sapien massa, placerat ac sodales ac, feugiat quis est." href="./assets/images/g5.jpg">
                                <div class="section_1_gallery_grid1">
                                    <img src="./assets/images/b5.jpg" alt=" " class="img-fluid" />
                                    <div class="proj_gallery_grid1_pos">
                                        <h3>经典十课</h3>

                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="section_1_gallery_grid" data-aos="zoom-in">
                            <a title="Donec sapien massa, placerat ac sodales ac, feugiat quis est." href="./assets/images/g6.jpg">
                                <div class="section_1_gallery_grid1">
                                    <img src="./assets/images/b6.jpg" alt=" " class="img-fluid" />
                                    <div class="proj_gallery_grid1_pos">
                                        <h3>听众</h3>

                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col-md-4 proj_gallery_grid" data-aos="zoom-in">
                        <div class="section_1_gallery_grid">
                            <a title="Donec sapien massa, placerat ac sodales ac, feugiat quis est." href="./assets/images/g7.jpg">
                                <div class="section_1_gallery_grid1">
                                    <img src="./assets/images/b7.jpg" alt=" " class="img-fluid" />
                                    <div class="proj_gallery_grid1_pos">
                                        <h3>讲座现场</h3>

                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="section_1_gallery_grid" data-aos="zoom-in">
                            <a title="Donec sapien massa, placerat ac sodales ac, feugiat quis est." href="./assets/images/g8.jpg">
                                <div class="section_1_gallery_grid1">
                                    <img src="./assets/images/b8.jpg" alt=" " class="img-fluid" />
                                    <div class="proj_gallery_grid1_pos">
                                        <h3>讲座现场</h3>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="section_1_gallery_grid" data-aos="zoom-in">
                            <a title="Donec sapien massa, placerat ac sodales ac, feugiat quis est." href="./assets/images/g9.jpg">
                                <div class="section_1_gallery_grid1">
                                    <img src="./assets/images/b9.jpg" alt=" " class="img-fluid" />
                                    <div class="proj_gallery_grid1_pos">
                                        <h3>讲座现场</h3>

                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>

                    <!--end portfolio-area -->
                </div>
                <!-- //gallery container -->
            </div>
        </section>
        <!-- //gallery -->
        <!--/stats-->
        <section class="stats py-lg-5 py-4" id="stats">
            <div class="gallery-inner container py-md-5 py-4">
                <div class="row mt-lg-5 stats-con text-white">
                    <div class="col-sm-3 col-6 stats_info counter_grid">

                        <i class="far fa-lightbulb"></i>
                        <p class="counter">645</p>
                        <h4>在线课程</h4>

                    </div>
                    <div class="col-sm-3 col-6 stats_info counter_grid1">

                        <i class="far fa-heart"></i>
                        <p class="counter">563</p>
                        <h4>在线考试</h4>

                    </div>
                    <div class="col-sm-3 col-6 stats_info counter_grid">

                        <i class="fas fa-magic"></i>
                        <p class="counter">1145</p>
                        <h4>讲座研讨报名人数</h4>

                    </div>
                    <div class="col-sm-3 col-6 stats_info counter_grid2">

                        <i class="far fa-smile"></i>
                        <p class="counter">1045</p>
                        <h4>讲座研讨参与人数</h4>

                    </div>
                </div>
            </div>
        </section>
        <!--//stats-->
        <!-- /testimonials -->
        <div class="testimonials py-lg-5 py-4" id="clients">
            <div class="testimonials-inner container py-lg-4 py-3">
                <h4 class="sub-tittle-w3 text-uppercase text-center">Significance</h4>
                <h3 class="tittle-w3 text-uppercase mb-lg-5 mb-3 text-center">关于开放式教学</h3>
                <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner" role="listbox">
                        <div class="carousel-item active">
                            <div class="testimonials_grid center">
                                <div class="testimonials_grid-inn text-uppercase">
                                    <i class="fas fa-quote-left"></i>
                                    <p> 通过开放式教学，高校中的专业文化知识传播的将不再主要集中于高等院校，而以一种整合的、跨学科的、开放的模式展开。中小学生、校外人士都有机会参与到高校的专业知识的学习实践中去。这种开放式的教学，扩大了文化知识传播的受众，拓展了社会大众获取高校文化知识的渠道。</p>
                                </div>
                                <h3>多形式学习</h3>

                                <label>一站式学习服务</label>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <div class="testimonials_grid text-center">
                                <div class="testimonials_grid-inn text-uppercase">
                                    <i class="fas fa-quote-left"></i>
                                    <p>Lorem ipsum dolor sit amet,Maecenas interdum magna quam egestas sem, ac scelerisque nisl nibh vel lacus. Proin eget gravida odio. Donec ullamcorper est eu accumsan cursus.</p>
                                </div>
                                <h3>Anne Marc

                                </h3>
                                <label>United States</label>

                            </div>
                        </div>
                        <div class="carousel-item">
                            <div class="testimonials_grid">
                                <div class="testimonials_grid-inn text-uppercase">
                                    <i class="fas fa-quote-left"></i>
                                    <p>Maecenas interdum, metus vitae tincidunt porttitor, magna quam egestas sem, ac scelerisque nisl nibh vel lacus. Proin eget gravida odio. Donec ullamcorper est eu accumsan cursus.</p>

                                </div>
                                <h3>Harry Baker

                                </h3>
                                <label>United States</label>

                            </div>
                        </div>
                        <a class="carousel-control-prev test" href="#carouselExampleControls" role="button" data-slide="prev">
                            <span class="fas fa-long-arrow-alt-left"></span>
                            <span class="sr-only">Previous</span>
                        </a>
                        <a class="carousel-control-next test" href="#carouselExampleControls" role="button" data-slide="next">
                            <span class="fas fa-long-arrow-alt-right" aria-hidden="true"></span>
                            <span class="sr-only">Next</span>

                        </a>
                    </div>
                </div>
            </div>
        </div>
        <!-- //testimonials -->
        <!-- /Contact-->
        <section class="contact py-lg-5 py-md-5 py-3" id="contact">
            <div class="container">
                <div class="inner-sec-w3ls py-lg-5 py-3">
                    <h4 class="sub-tittle-w3 text-uppercase text-center">Contact Us</h4>
                    <h3 class="tittle-w3 text-uppercase mb-lg-5 mb-3 text-center text-white">联系我们</h3>

                    <div class="contact_grid_right">
                        <form action="#" method="post">
                            <div class="row contact_left_grid">
                                <div class="col-md-6 con-left" data-aos="fade-up">
                                    <div class="form-group">

                                        <input class="form-control" type="text" name="Name" placeholder="请输入您的名字" required="">
                                    </div>
                                    <div class="form-group">

                                        <input class="form-control" type="email" name="Email" placeholder="请输入您的邮箱" required="">
                                    </div>
                                    <div class="form-group">

                                        <input class="form-control" type="text" name="Subject" placeholder="请输入您的邮件主题" required="">
                                    </div>
                                </div>
                                <div class="col-md-6 con-right" data-aos="fade-up">
                                    <div class="form-group">
                                        <textarea id="textarea" placeholder="请输入您的邮件内容" required=""></textarea>
                                    </div>
                                </div>
                                <div class="sub-honey mx-auto mt-3">
                                    <input class="form-control" type="submit" value="发送"> </div>
                            </div>
                        </form>
                    </div>
                    <div class="address row mt-lg-5">

                        <div class="col-md-4 address-grid" data-aos="flip-up">
                            <div class="address-info">
                                <div class="address-left text-center">
                                    <i class="far fa-map"></i>
                                </div>
                                <div class="address-right text-center">
                                    <h6 class="my-3">地址</h6>
                                    <p>山东大学齐鲁软件学院</p>
                                </div>
                            </div>

                        </div>
                        <div class="col-md-4 address-grid" data-aos="flip-up">
                            <div class="address-info">
                                <div class="address-left text-center">
                                    <i class="far fa-envelope"></i>
                                </div>
                                <div class="address-right text-center">
                                    <h6 class="my-3">邮箱</h6>
                                    <p>Email :
                                        <a href="#">3624270@qq.com</a>

                                    </p>
                                </div>

                            </div>
                        </div>
                        <div class="col-md-4 address-grid" data-aos="flip-up">
                            <div class="address-info">
                                <div class="address-left text-center">
                                    <i class="fas fa-mobile-alt"></i>
                                </div>
                                <div class="address-right text-center">
                                    <h6 class="my-3">电话</h6>
                                    <p>17862992891</p>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- //Contact -->
        <!--/footer-->
        <footer class="footer text-left">
            <div class="container py-4 py-sm-5">

                <div class="row py-sm-4 py-3">
                    <div class="col-lg-2 col-md-4">
                        <ul class="list-footer" data-aos="fade-up">
                            <li>
                                <a href="#home" class="nav-link scroll">
                                    主页
                                </a>
                            </li>
                            <li class="my-2">
                                <a href="#about" class="nav-link scroll">
                                    平台介绍
                                </a>
                            </li>
                            <li class="my-2">
                                <a href="#services" class="nav-link scroll">
                                    在线课程
                                </a>
                            </li>
                            <li class="mb-2">
                                <a href="#projects" class="nav-link scroll">
                                    线下讲座
                                </a>
                            </li>
                            <li>
                                <a href="#contact" class="nav-link scroll">
                                    联系我们
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="offset-lg-4"></div>
                    <div class="col-lg-4 footer-end-grid mt-md-0 mt-sm-5" data-aos="fade-up">
                        <h2>
                            <a href="/">
                                <i class="fas logo-mini"></i>高校开放式学习平台
                            </a>
                        </h2>
                    </div>
                </div>
                <hr>
                <div class="d-flex justify-content-between pt-lg-3  footer-bottom-cpy">
                    <div class="copy-right-w3ls">
                        <p>Copyright &copy; 2018.山东大学 王前前 rights reserved.</p>
                    </div>
                    <div class="social-content pb-md-0 pb-4">
                        <ul class="social-icons text-center d-flex">
                            <li class="ml-lg-5">
                                <a href="#">
                                    <i class="fab fa-facebook-f"></i>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i class="fab fa-twitter"></i>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i class="fab fa-google-plus-g"></i>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i class="fab fa-linkedin-in"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
        <!--//footer-->
        <portal-login-page ref="loginPage" @open-regist="regist"></portal-login-page>
        <portal-regist-page  ref="registPage"></portal-regist-page>
    </div>
</template>

<script>
    import './assets/css/bootstrap.css';
    import './assets/css/simpleLightbox.css';
    import './assets/css/roadmap.css';
    import './assets/css/snow.css';
    import './assets/css/aos.css';
    import './assets/css/aos-animation.css';
    import './assets/css/style.css';
    import './assets/css/fontawesome-all.css';
    import './assets/css/font.css';
    import AOS from 'aos';
    import {scroll} from "./assets/js/scroll";
    import LoginInterface from '@/interfaces/loginInterface';
    import RegistPage from './regist/index.vue';
    import LoginPage from './login.vue';

    export default {
        data () {
            return {
                dialogFormVisible: false,
                form:{
                    loginName:'student',
                    password:'1',
                },
                loading:false
            }
        },
        beforeCreate(){
            addEventListener("load", function() {
                setTimeout(this.hideURLbar, 0);
            }, false);
            AOS.init({
                easing: 'ease-out-back',
                duration: 1000
            });
        },
        beforeMount(){
            scroll();
        },
        components:{
            "portal-regist-page":RegistPage,
            "portal-login-page":LoginPage
        },
        methods:{
            hideURLbar() {
                window.scrollTo(0, 1);
            },
            loginDialog(){
                this.$refs.loginPage.show=true;
            },
            regist(){
                this.dialogFormVisible=false;
                this.$refs.registPage.show=true;
            }
        }
    };
</script>

<style scoped>

</style>
