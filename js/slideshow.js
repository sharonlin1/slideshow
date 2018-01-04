(function ($) {
  $.fn.slideshow = function (option) {

    let settings = $.extend({
      selector: '.slideshow',
      slideList: [],
      perPageSlide: 1,
      currentIndex: 0,
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
          'margin': settings.imgMargin + 'px'
        });

        this.btnNext.click(function (evt) {
          evt.preventDefault();
          slide.nextSlide();
        });
        this.btnPrev.click(function (evt) {
          evt.preventDefault();
          slide.prevSlide();
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
        this.list.hide();
        this.activeSlide(index);
        index = (Math.floor(index / settings.perPageSlide) + 1) * settings.perPageSlide - 1;
        for (i = 0; i < settings.perPageSlide; i++) {
          this.list.eq(index - i).show();
        }
      },
      activeSlide: function (index) {
        this.list.css('border', 'none');
        this.list.eq(index).css('border', '2px dotted #3f2d27');
      },
      nextSlide: function () {
        this.currentIndex += settings.perPageSlide;
        this.checkIndex();
        this.showSlide(this.currentIndex);
        this.checkonSlide();
      },
      prevSlide: function () {
        this.currentIndex -= settings.perPageSlide;
        this.checkIndex();
        this.showSlide(this.currentIndex);
        this.checkonSlide();
      },
      /* Check currentIndex */
      checkIndex: function () {
        if (this.currentIndex < 0) {
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
      }
    };
    var slide = new SlideAct();
    slide.init();
    $(this).data('slideShow', slide);
  };

  $(function () {
    let mainSlide, thumbnailSlide;
    let slideImgData = [{
        "id": 0,
        "src": "http://placehold.it/500/2A6041/ffffff&text=Zero"
      },
      {
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
      {
        "id": 9,
        "src": "http://placehold.it/500/2A6041/ffffff&text=Nine"
      },
      {
        "id": 10,
        "src": "http://placehold.it/500/2A6041/ffffff&text=Ten"
      }
    ];
    let thumbnailImgData = [{
        "id": 0,
        "src": "http://placehold.it/180/2A6041/ffffff&text=Zero"
      },
      {
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
      {
        "id": 9,
        "src": "http://placehold.it/180/2A6041/ffffff&text=Nine"
      },
      {
        "id": 10,
        "src": "http://placehold.it/180/2A6041/ffffff&text=Ten"
      }
    ];
    $('#slideshow').slideshow({
      selector: '#slideshow',
      slideList: slideImgData,
      perPageSlide: 1,
      currentIndex: 0,
      imgWidth: 500,
      imgMargin: 5,
      onSlide: function (currentIndex) {
        thumbnailSlide.showSlide(currentIndex);
        thumbnailSlide.currentIndex = currentIndex;
      }
    });
    $('#thumbnail').slideshow({
      selector: '#thumbnail',
      slideList: thumbnailImgData,
      perPageSlide: 4,
      currentIndex: 0,
      imgWidth: 180,
      imgMargin: 5,
      onSlide: function (currentIndex) {
        mainSlide.showSlide(currentIndex);
        mainSlide.currentIndex = currentIndex;
      }
    });

    mainSlide = $('#slideshow').data('slideShow');
    thumbnailSlide = $('#thumbnail').data('slideShow');
  });
})(jQuery);