class hrsScroll{
  constructor(options){
    this.container = options.container != undefined ? options.container : '.hrs-container';
    this.blocks = options.blocks != undefined ? options.blocks : '.hrs-block';
    this.offset = options.offset != undefined ? options.offset : 0;
    this.blockCount = $(this.container +' '+ this.blocks).length;
    const sections= $(".hrs-container-1 .hrs-block");
    let totalHeight = 0;
    $.each(sections,(index, value)=>{
      totalHeight += value.clientHeight;
    });
    $(this.container).css({'height':totalHeight});
  }

  getConfig(){
    return {
              container: this.container,
              blocks: this.blocks,
              offset: this.offset,
              blockCount: this.blockCount,
            };
  }

  initHrs(){
    const result = this._isInViewport(document.querySelector(this.container));
    const isElementInsideViewport = result.isVisible;
    if(isElementInsideViewport){
      $(this.container+' span').css({'position':'sticky', 'top':'0', 'right': '0', 'left':'0', 'bottom': '0'});
      let scrollAcmountFromTop = $(window).scrollTop();
      let containerTopOffset = $(this.container)[0].offsetTop;
      let diff = (( scrollAcmountFromTop - containerTopOffset) / result.height ) * 100 * this.blockCount;
      $(this.container+' span').css({transform:`translateX(-${diff}%)`});
    }
    else{
      $(this.container+' span').css({'position':'relative'});
      $(this.container+' span').css({transform:`translateX(0%)`});
    }
  }

  _isInViewport(element) {
    const rect = element.getBoundingClientRect();
    const data = {
                    isVisible:  rect.top + this.offset < 0 && rect.bottom + this.offset > 0,
                    position: {top: rect.top, right: rect.right, bottom: rect.bottom, left: rect.left},
                    height: $(element).height(),
                    width: $(element).width(),
                    offsetTop: $(element).offset().top
                  }
    return (data);
  }
}