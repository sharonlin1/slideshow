(
  function ($) {
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

          $(settings.selector).css({
            'width': (settings.imgWidth + settings.imgMargin * 2) * settings.perPageSlide + 'px'
          });
          this.container.css({
            'width': (settings.imgWidth + settings.imgMargin * 2) * this.list.length + 'px'
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
          this.list.click(function (evt) {
            let clickIndex = $(this).find('img').data("id");
            slide.activeSlide(clickIndex);
            slide.imgClick(clickIndex);
          });
        },
        getSlideData: function () {
          let slideResult = '';
          for (let i = 0; i < settings.slideList.length; i++) {
            let temp = settings.slideList[i].src;
            slideResult += '<li><img src="' + temp + '" + data-id="' + i + '"></li>';
          }
          this.container.append(slideResult);
        },
        imgClick: function (clickIndex) {
          this.currentIndex = clickIndex;
          this.checkonSlide();
        },
        showSlide: function (index, originIndex) {
          this.activeSlide(index);
          let pageAfter = Math.floor(index / settings.perPageSlide);
          if (pageAfter !== Math.floor((originIndex) / settings.perPageSlide)) {
            this.container.animate({
              'left': -(settings.imgWidth + settings.imgMargin * 2) * (pageAfter * settings.perPageSlide) + 'px'
            }, 300);
          };
          this.currentIndex = index;
        },
        activeSlide: function (index) {
          this.list.filter('.active').add(this.list.eq(index)).toggleClass('active');
        },
        nextSlide: function () {
          let originIndex = this.currentIndex;
          this.currentIndex += settings.perPageSlide;
          this.checkIndex();
          this.showSlide(this.currentIndex, originIndex);
          this.checkonSlide(originIndex);
        },
        prevSlide: function () {
          let originIndex = this.currentIndex;
          this.currentIndex -= settings.perPageSlide;
          this.checkIndex();
          this.showSlide(this.currentIndex, originIndex);
          this.checkonSlide(originIndex);
        },
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
        },
        {
          "id": 11,
          "src": "http://placehold.it/500/2A6041/ffffff&text=Eleven"
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
        },
        {
          "id": 11,
          "src": "http://placehold.it/180/2A6041/ffffff&text=Eleven"
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
        }
      });

      mainSlide = $('#slideshow').data('slideShow');
      thumbnailSlide = $('#thumbnail').data('slideShow');
    });
  })(jQuery);