<template>
    <!-- mian-content -->
    <div id="root" v-loading.fullscreen.lock="loading">
        <header class="index-banner" id="home">
            <!-- nav -->
            <nav class="main-header d-flex">
                <div id="brand">
                    <div id="logo">
                        <a href="index.html">
                            <i class="fas fa-crosshairs"></i>
                        </a>
                    </div>
                    <div id="word-mark">
                        <h1>
                            <a href="#">开放式学习平台</a>
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
                            <a href="index.html" class="active ">主页</a>
                        </li>
                        <li>
                            <a class="scroll" href="#about">平台介绍</a>
                        </li>
                        <li>
                            <a class="scroll" href="#services">讲座研讨</a>
                        </li>
                        <li>
                            <a class="scroll" href="#projects">在线课程</a>
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
                    <h6 data-aos="fade-right">Introduction</h6>
                    <h5 data-aos="fade-right">Hello, my name is Daniel</h5>
                    <h3 data-text="I'm a Programmer">I'm a Programmer</h3>
                    <div class="ban-buttons mt-3" data-aos="fade-right">
                        <a class="btn work scroll" href="#projects">My Work</a>
                        <a class="btn work scroll active" href="#contact">Here me</a>
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
                        <h4 class="sub-tittle-w3">About Me</h4>
                        <h3 class="tittle-w3 text-uppercase mb-lg-5 mb-3">Welcome to My website</h3>
                        <div class="row mt-lg-5 mt-3">
                            <div class="col-lg-4 progress-info-content text-left">
                                <div class="progress-one my-lg-5" data-aos="fade-up">
                                    <h4 class="progress-tittle-w3">Web Design</h4>
                                    <div class="progress">
                                        <div class="progress-bar progress-bar-striped" role="progressbar" style="width: 10%" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                                <div class="progress-one" data-aos="fade-up">
                                    <h4 class="progress-tittle-w3">Branding</h4>
                                    <div class="progress">
                                        <div class="progress-bar progress-bar-striped bg-success" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>

                            </div>
                            <div class="col-lg-4 progress-info-content text-left">
                                <div class="progress-one my-lg-5" data-aos="fade-up">
                                    <h4 class="progress-tittle-w3">PHP Development</h4>
                                    <div class="progress">
                                        <div class="progress-bar progress-bar-striped bg-info" role="progressbar" style="width: 50%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                                <div class="progress-one" data-aos="fade-up">
                                    <h4 class="progress-tittle-w3">Marketing</h4>
                                    <div class="progress">
                                        <div class="progress-bar progress-bar-striped bg-warning" role="progressbar" style="width: 70%" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 progress-info-content text-left">
                                <div class="progress-one my-lg-5" data-aos="fade-up">
                                    <h4 class="progress-tittle-w3">Photography</h4>
                                    <div class="progress">
                                        <div class="progress-bar progress-bar-striped bg-secondary" role="progressbar" style="width: 90%" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                                <div class="progress-one" data-aos="fade-up">
                                    <h4 class="progress-tittle-w3">
                                        SEO</h4>
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
                    <h4 class="sub-tittle-w3 text-uppercase text-center">My Services</h4>
                    <h3 class="tittle-w3 text-uppercase mb-lg-5 mb-3 text-center text-white">What i do</h3>
                    <div class="price-right">
                        <div class="tabs">
                            <ul class="nav nav-pills my-md-5 my-3 justify-content-center" id="pills-tab" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Service 1</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Service 2</a>
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
                                                        <h5 class="card-title text-uppercase">Professional Code</h5>
                                                        <p class="card-text">Lorem ipsum dolor sit amet consectetur elit,Adipisicing elit tempor.</p>
                                                    </div>
                                                </div>

                                            </div>
                                            <div class="col-lg-4 service-in text-center" data-aos="flip-up">
                                                <div class="card">
                                                    <div class="card-body">
                                                        <i class="far fa-lightbulb mb-4"></i>
                                                        <h5 class="card-title text-uppercase">Creative Ideas</h5>
                                                        <p class="card-text">Lorem ipsum dolor sit amet consectetur elit,Adipisicing elit tempor.</p>
                                                    </div>
                                                </div>

                                            </div>
                                            <div class="col-lg-4 service-in text-center" data-aos="flip-up">
                                                <div class="card">
                                                    <div class="card-body">
                                                        <i class="far fa-clone mb-4"></i>
                                                        <h5 class="card-title text-uppercase">SEO & Marketing</h5>
                                                        <p class="card-text">Lorem ipsum dolor sit amet consectetur elit,Adipisicing elit tempor.</p>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                    <div class="menu-grids mt-4">
                                        <div class="row t-in">
                                            <div class="col-lg-4 service-in text-center">
                                                <div class="card">
                                                    <div class="card-body">
                                                        <i class="far fa-heart mb-4"></i>
                                                        <h5 class="card-title">User Friendly</h5>
                                                        <p class="card-text">Lorem ipsum dolor sit amet consectetur elit,Adipisicing elit tempor.</p>
                                                    </div>
                                                </div>

                                            </div>
                                            <div class="col-lg-4 service-in text-center">
                                                <div class="card">
                                                    <div class="card-body">
                                                        <i class="fas fa-magic mb-4"></i>
                                                        <h5 class="card-title">Web Development</h5>
                                                        <p class="card-text">Lorem ipsum dolor sit amet consectetur elit,Adipisicing elit tempor.</p>
                                                    </div>
                                                </div>

                                            </div>

                                            <div class="col-lg-4 service-in text-center">
                                                <div class="card">
                                                    <div class="card-body">
                                                        <i class="fas fa-sliders-h mb-4"></i>
                                                        <h5 class="card-title">Portfolio Options</h5>
                                                        <p class="card-text">Lorem ipsum dolor sit amet consectetur elit,Adipisicing elit tempor.</p>
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
                <h4 class="sub-tittle-w3 text-uppercase text-center">Experience</h4>
                <h3 class="tittle-w3 text-uppercase mb-lg-5 mb-3 text-center">Job & Education</h3>
                <div id="my-timeline"></div>
            </div>

        </section>
        <!-- //experience -->
        <!--gallery  -->
        <section class="gallery py-md-5 py-3" id="projects">
            <div class="gallery-inner container py-md-5 pb-3">
                <h4 class="sub-tittle-w3 text-uppercase text-center">View all</h4>
                <h3 class="tittle-w3 text-uppercase mb-lg-5 mb-3 text-center">My Projects</h3>
                <div class="row">

                    <div class="col-md-4 proj_gallery_grid" data-aos="zoom-in">
                        <div class="section_1_gallery_grid">
                            <a title="Donec sapien massa, placerat ac sodales ac, feugiat quis est." href="./assets/images/g1.jpg">
                                <div class="section_1_gallery_grid1">
                                    <img src="./assets/images/g1.jpg" alt=" " class="img-fluid" />
                                    <div class="proj_gallery_grid1_pos">
                                        <h3>Recognize</h3>

                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="section_1_gallery_grid" data-aos="zoom-in">
                            <a title="Donec sapien massa, placerat ac sodales ac, feugiat quis est." href="./assets/images/g2.jpg">
                                <div class="section_1_gallery_grid1">
                                    <img src="./assets/images/g2.jpg" alt=" " class="img-fluid" />
                                    <div class="proj_gallery_grid1_pos">
                                        <h3>Recognize</h3>

                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="section_1_gallery_grid" data-aos="zoom-in">
                            <a title="Donec sapien massa, placerat ac sodales ac, feugiat quis est." href="./assets/images/g3.jpg">
                                <div class="section_1_gallery_grid1">
                                    <img src="./assets/images/g3.jpg" alt=" " class="img-fluid" />
                                    <div class="proj_gallery_grid1_pos">
                                        <h3>Recognize</h3>

                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col-md-4 proj_gallery_grid" data-aos="zoom-in">
                        <div class="section_1_gallery_grid">
                            <a title="Donec sapien massa, placerat ac sodales ac, feugiat quis est." href="./assets/images/g4.jpg">
                                <div class="section_1_gallery_grid1">
                                    <img src="./assets/images/g4.jpg" alt=" " class="img-fluid" />
                                    <div class="proj_gallery_grid1_pos">
                                        <h3>Recognize</h3>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="section_1_gallery_grid" data-aos="zoom-in">
                            <a title="Donec sapien massa, placerat ac sodales ac, feugiat quis est." href="./assets/images/g5.jpg">
                                <div class="section_1_gallery_grid1">
                                    <img src="./assets/images/g5.jpg" alt=" " class="img-fluid" />
                                    <div class="proj_gallery_grid1_pos">
                                        <h3>Recognize</h3>

                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="section_1_gallery_grid" data-aos="zoom-in">
                            <a title="Donec sapien massa, placerat ac sodales ac, feugiat quis est." href="./assets/images/g6.jpg">
                                <div class="section_1_gallery_grid1">
                                    <img src="./assets/images/g6.jpg" alt=" " class="img-fluid" />
                                    <div class="proj_gallery_grid1_pos">
                                        <h3>Recognize</h3>

                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col-md-4 proj_gallery_grid" data-aos="zoom-in">
                        <div class="section_1_gallery_grid">
                            <a title="Donec sapien massa, placerat ac sodales ac, feugiat quis est." href="./assets/images/g7.jpg">
                                <div class="section_1_gallery_grid1">
                                    <img src="./assets/images/g7.jpg" alt=" " class="img-fluid" />
                                    <div class="proj_gallery_grid1_pos">
                                        <h3>Recognize</h3>

                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="section_1_gallery_grid" data-aos="zoom-in">
                            <a title="Donec sapien massa, placerat ac sodales ac, feugiat quis est." href="./assets/images/g8.jpg">
                                <div class="section_1_gallery_grid1">
                                    <img src="./assets/images/g8.jpg" alt=" " class="img-fluid" />
                                    <div class="proj_gallery_grid1_pos">
                                        <h3>Recognize</h3>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="section_1_gallery_grid" data-aos="zoom-in">
                            <a title="Donec sapien massa, placerat ac sodales ac, feugiat quis est." href="./assets/images/g9.jpg">
                                <div class="section_1_gallery_grid1">
                                    <img src="./assets/images/g9.jpg" alt=" " class="img-fluid" />
                                    <div class="proj_gallery_grid1_pos">
                                        <h3>Recognize</h3>

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
                        <h4>Projects Done</h4>

                    </div>
                    <div class="col-sm-3 col-6 stats_info counter_grid1">

                        <i class="far fa-heart"></i>
                        <p class="counter">563</p>
                        <h4>Satisfied Clients</h4>

                    </div>
                    <div class="col-sm-3 col-6 stats_info counter_grid">

                        <i class="fas fa-magic"></i>
                        <p class="counter">1145</p>
                        <h4>Awards</h4>

                    </div>
                    <div class="col-sm-3 col-6 stats_info counter_grid2">

                        <i class="far fa-smile"></i>
                        <p class="counter">1045</p>
                        <h4>Happy Clients</h4>

                    </div>
                </div>
            </div>
        </section>
        <!--//stats-->
        <!-- /testimonials -->
        <div class="testimonials py-lg-5 py-4" id="clients">
            <div class="testimonials-inner container py-lg-4 py-3">
                <h4 class="sub-tittle-w3 text-uppercase text-center">Testimonials</h4>
                <h3 class="tittle-w3 text-uppercase mb-lg-5 mb-3 text-center">What They Says</h3>
                <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner" role="listbox">
                        <div class="carousel-item active">
                            <div class="testimonials_grid center">
                                <div class="testimonials_grid-inn text-uppercase">
                                    <i class="fas fa-quote-left"></i>
                                    <p>Lorem ipsum dolor sit amet,Maecenas interdum magna quam egestas sem, ac scelerisque nisl nibh vel lacus. Proin eget gravida odio. Donec ullamcorper est eu accumsan cursus.</p>
                                </div>
                                <h3>Gretchen </h3>

                                <label>United States</label>
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
                    <h4 class="sub-tittle-w3 text-uppercase text-center">Find Me</h4>
                    <h3 class="tittle-w3 text-uppercase mb-lg-5 mb-3 text-center text-white">Contact Me Now</h3>

                    <div class="contact_grid_right">
                        <form action="#" method="post">
                            <div class="row contact_left_grid">
                                <div class="col-md-6 con-left" data-aos="fade-up">
                                    <div class="form-group">

                                        <input class="form-control" type="text" name="Name" placeholder="" required="">
                                    </div>
                                    <div class="form-group">

                                        <input class="form-control" type="email" name="Email" placeholder="" required="">
                                    </div>
                                    <div class="form-group">

                                        <input class="form-control" type="text" name="Subject" placeholder="" required="">
                                    </div>
                                </div>
                                <div class="col-md-6 con-right" data-aos="fade-up">
                                    <div class="form-group">
                                        <textarea id="textarea" placeholder="" required=""></textarea>
                                    </div>
                                </div>
                                <div class="sub-honey mx-auto mt-3">
                                    <input class="form-control" type="submit" value="Submit"> </div>
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
                                    <h6 class="my-3">Address</h6>
                                    <p> California, USA

                                    </p>
                                </div>
                            </div>

                        </div>
                        <div class="col-md-4 address-grid" data-aos="flip-up">
                            <div class="address-info">
                                <div class="address-left text-center">
                                    <i class="far fa-envelope"></i>
                                </div>
                                <div class="address-right text-center">
                                    <h6 class="my-3">Email</h6>
                                    <p>Email :
                                        <a href="mailto:example@email.com"> mail@example.com</a>

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
                                    <h6 class="my-3">Phone</h6>
                                    <p>+1 234 567 8901</p>

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
                                    Home
                                </a>
                            </li>
                            <li class="my-2">
                                <a href="#about" class="nav-link scroll">
                                    About
                                </a>
                            </li>
                            <li class="my-2">
                                <a href="#services" class="nav-link scroll">
                                    Services
                                </a>
                            </li>
                            <li class="mb-2">
                                <a href="#projects" class="nav-link scroll">
                                    Projects
                                </a>
                            </li>
                            <li>
                                <a href="#contact" class="nav-link scroll">
                                    Contact Us
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="col-lg-2 col-md-4 col-sm-6 mt-sm-5">
                        <ul class="list-footer" data-aos="fade-up">
                            <li>
                                <a href="#register" data-toggle="modal" data-target="#exampleModalCenter" class="nav-link scroll">
                                    Login
                                </a>
                            </li>
                            <li class="my-2">
                                <a href="#" data-toggle="modal" data-target="#exampleModalCenter2" class="nav-link">
                                    Register
                                </a>
                            </li>
                            <li class="my-2">
                                <a href="#" class="nav-link">
                                    License
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="offset-lg-4"></div>
                    <div class="col-lg-4 footer-end-grid mt-md-0 mt-sm-5" data-aos="fade-up">
                        <h2>
                            <a href="index.html">
                                <i class="fas fa-crosshairs"></i> Recognize
                            </a>
                        </h2>
                    </div>
                </div>
                <hr>
                <div class="d-flex justify-content-between pt-lg-3  footer-bottom-cpy">
                    <div class="copy-right-w3ls">
                        <p>Copyright &copy; 2018.Company name All rights reserved.<a target="_blank" href="http://sc.chinaz.com/moban/">&#x7F51;&#x9875;&#x6A21;&#x677F;</a></p>
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
        <el-dialog title="用户登录" :visible.sync="dialogFormVisible" width="500px" center>
            <el-form :model="form"  label-width="100px">
                <el-form-item label="账号">
                    <el-input v-model="form.loginName" class="_input-width" placeholder="请输入账号"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.password" class="_input-width" placeholder="请输入密码"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="text">注册账号</el-button>
                <el-button type="primary" @click="doLogin">登 录</el-button>
                <el-button type="text">忘记密码</el-button>
            </div>
        </el-dialog>
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

    export default {
        name: 'App',
        data () {
            return {
                dialogFormVisible: false,
                form:{
                    loginName:'teacher',
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
        methods:{
            hideURLbar() {
                window.scrollTo(0, 1);
            },
            loginDialog(){
                this.dialogFormVisible=true;
            },
            doLogin() {
                let params=this.form;
                this.loading=true;
                LoginInterface.doLogin(params).then( (res) => {
                    if (res.reCode == LoginInterface.SUCCESS_CODE) {
                        this.$router.push({path: '/index'});
                    } else {
                        this.loading=false;
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            }
        }
    };
</script>

<style scoped>

</style>
