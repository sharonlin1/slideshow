(function ($) {
  $.fn.slideshow = function (option) {

    return this.each(function () {

      let settings = $.extend({
        selector: '.slideshow',
        slideList: [],
        perPageSlide: 1,
        currentIndex: 0,
        pageNow: 1,
        imgWidth: 500,
        imgMargin: 5,
        onSlide: null
      }, option);

      function SlideAct() {
        const $slideshow = $(settings.selector);
        this.container = $slideshow.find('.slideshow-list');
        this.btnPrev = $slideshow.find('.slideshow-btnPrev');
        this.btnNext = $slideshow.find('.slideshow-btnNext');
        this.currentIndex = settings.currentIndex;
      }

      SlideAct.prototype = {

        init: function () {
          this.getSlideData();
          this.list = this.container.find('li');
          this.amount = this.list.length - 1;

          this.container.css({
            'width': (settings.imgWidth + settings.imgMargin * 2) * settings.perPageSlide + 'px'
          });

          this.list.css({
            'display': 'block',
            'margin': settings.imgMargin + 'px'
          });

          this.btnPrev.click(function (evt) {
            evt.preventDefault();
            slide.prevSlide();
          });
          this.btnNext.click(function (evt) {
            evt.preventDefault();
            slide.nextSlide();
          });
        },
        getSlideData: function () {
          let slideResult = '';
          for (let i = 0; i < settings.slideList.length; i++) {
            let temp = settings.slideList[i].src;
            slideResult += '<li><img src="' + temp + '"></li>';
          }
          this.container.append(slideResult);
        },
        showSlide: function (index) {
          this.list.hide().eq(index).show();
        },
        prevSlide: function () {
          this.currentIndex--;
          this.checkIndex();
          this.showSlide(this.currentIndex);
          this.checkonSlide();

        },
        nextSlide: function () {
          this.currentIndex++;
          this.checkIndex();
          this.showSlide(this.currentIndex);
          this.checkonSlide();
        },
        /* Check currentIndex */
        checkIndex: function () {
          if (this.currentIndex <= -1) {
            this.currentIndex = this.amount;
          };
          if (this.currentIndex > this.amount) {
            this.currentIndex = 0;
          };
        },
        /* Check onSlide */
        checkonSlide: function () {
          if (typeof settings.onSlide === 'function') {
            settings.onSlide(this.currentIndex);
          };
        },
        // moveSlide: function () {
        //   if (this.currentIndex = (settings.perPageSlide - 1)) {
        //     this.showSlide(currentIndex + perPageSlide);
        //     this.countainer.animate({
        //       left: "+=200px"
        //     }, slow);
        //   };
        // }
      };

      var slide = new SlideAct();
      slide.init();
      $(this).data('slideShow', slide);
    });
  };

  $(function () {
    let mainSlide, thumbnailSlide;
    let slideImgData = [{
        "id": 1,
        "src": "http://placehold.it/500/2A6041/ffffff&text=One"
      },
      {
        "id": 2,
        "src": "http://placehold.it/500/2A6041/ffffff&text=Two"
      },
      {
        "id": 3,
        "src": "http://placehold.it/500/2A6041/ffffff&text=Three"
      },
      {
        "id": 4,
        "src": "http://placehold.it/500/2A6041/ffffff&text=Four"
      },
      {
        "id": 5,
        "src": "http://placehold.it/500/2A6041/ffffff&text=Five"
      },
      {
        "id": 6,
        "src": "http://placehold.it/500/2A6041/ffffff&text=Six"
      },
      {
        "id": 7,
        "src": "http://placehold.it/500/2A6041/ffffff&text=Seven"
      },
      {
        "id": 8,
        "src": "http://placehold.it/500/2A6041/ffffff&text=Eight"
      },
    ];
    let thumbnailImgData = [{
        "id": 1,
        "src": "http://placehold.it/180/2A6041/ffffff&text=One"
      },
      {
        "id": 2,
        "src": "http://placehold.it/180/2A6041/ffffff&text=Two"
      },
      {
        "id": 3,
        "src": "http://placehold.it/180/2A6041/ffffff&text=Three"
      },
      {
        "id": 4,
        "src": "http://placehold.it/180/2A6041/ffffff&text=Four"
      },
      {
        "id": 5,
        "src": "http://placehold.it/180/2A6041/ffffff&text=Five"
      },
      {
        "id": 6,
        "src": "http://placehold.it/180/2A6041/ffffff&text=Six"
      },
      {
        "id": 7,
        "src": "http://placehold.it/180/2A6041/ffffff&text=Seven"
      },
      {
        "id": 8,
        "src": "http://placehold.it/180/2A6041/ffffff&text=Eight"
      },
    ];
    $('#slideshow').slideshow({
      selector: '#slideshow',
      slideList: slideImgData,
      perPageSlide: 1,
      currentIndex: 0,
      pageNow: 1,
      imgWidth: 500,
      imgMargin: 5,
      onSlide: function (currentIndex) {
        if (thumbnailSlide.currentIndex !== mainSlide.currentIndex) {
          thumbnailSlide.showSlide(currentIndex);
          thumbnailSlide.currentIndex = currentIndex;
        }
      }
    });
    $('#thumbnail').slideshow({
      selector: '#thumbnail',
      slideList: thumbnailImgData,
      perPageSlide: 3,
      currentIndex: 0,
      pageNow: 1,
      imgWidth: 180,
      imgMargin: 5,
      onSlide: function (currentIndex) {
        if (thumbnailSlide.currentIndex !== mainSlide.currentIndex) {
          mainSlide.showSlide(currentIndex);
          mainSlide.currentIndex = currentIndex;
        }
      }
    });

    mainSlide = $('#slideshow').data('slideShow');
    thumbnailSlide = $('#thumbnail').data('slideShow');
  });
})(jQuery);


// this.img = function (index) {
//   var index = this.getIndex();
//   if (index = (settings.perPageSlide - 1)) {
//     $('.slideshow-thumbnail-item').animate({
//       marginLeft: -((settings.imgWidth + settings.imgPadding * 2) * settings.perPageSlide + settings.imgBorder * 4) + 'px'
//     }, 'slow');
//   };
// };