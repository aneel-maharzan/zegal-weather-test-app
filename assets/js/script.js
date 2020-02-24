
(function($) {
	var this_document = $(document),
	 	this_window = $(window),
    this_body = $('body'),
    this_weather_slider = $('.weather-card-slider'),
    this_weather_card_main = $('.weather-card'),
    this_weather_slider_height = $('.weather-card-slider .card-body').outerHeight();
   
    function weatherSlider(){
      this_weather_slider.slick({
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 7,
        autoplay:false,
        autoplaySpeed :3000,
        arrows: false,
        prevArrow: '<span class="slick-prev"><i class="fas fa-arrow-left"></i></span>',
        nextArrow: '<span class="slick-next"><i class="fas fa-arrow-right"></i></span>',
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 4,
                infinite: false,
                dots: false,
                arrows: false,
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 3,
                dots: false,
                arrows: false,
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 2,
                dots: false,
                arrows: false,
              }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
          ]

      });
    }

    function weatherData(){
      $(".toggleDiv").hide();

      this_document.on("click", '.btnToggle',function() {
        var data_attr = $(this).attr("data-div");
        $("#" + data_attr).toggle();
        $(this).parent('.card-body').toggleClass('active');
      });

    }

    function weatherHeroHeight(){
       var winHeight = $(window).height() - this_weather_slider_height;
       this_weather_card_main.height(winHeight);
    }

    

    this_document.ready(function() {   
        weatherSlider();
        weatherData();

        //chart
        var ctx = document.getElementById('myChart').getContext('2d');
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',

            // The data for our dataset
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [{
                    label: 'My First dataset',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: [0, 10, 5, 2, 20, 30, 45]
                }]
            },

            // Configuration options go here
            options: {}
        });
        
    });

    this_window.resize(function() {
       weatherHeroHeight();
    });

    this_window.scroll(function() {
      
    });

    this_window.load(function() {
       weatherHeroHeight();
    });

  




})(window.jQuery);
