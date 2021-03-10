let hrsConfig = {
  container: '.hrs-container',
  blocks: '.hrs-block',
  offset: 0,
  blockCount: 1,
}

$(window).scroll(e=>{
  _heckHRSPOsition();
});

function initHRS(options){
  if(options.container)
    hrsConfig.container = options.container;
  if(options.blocks)
    hrsConfig.blocks = options.blocks;
  if(options.offset)
    hrsConfig.offset = options.offset;
  hrsConfig.blockCount = $(hrsConfig.container +' '+ hrsConfig.blocks).length - 1;
  
  _heckHRSPOsition();
}

function _heckHRSPOsition(){
  const result = _isInViewport(document.querySelector(hrsConfig.container));
  const isElementInsideViewport = result.isVisible;
  if(isElementInsideViewport){
    const difference = ((window.innerHeight - hrsConfig.offset ) - result.position.top) / (window.innerHeight - hrsConfig.offset);
    let scrollPercentRounded = Math.round(difference*100) * hrsConfig.blockCount;
    $(hrsConfig.container).css({transform:`translateX(-${scrollPercentRounded}%)`});
  }
}

function _isInViewport(element) {
  const rect = element.getBoundingClientRect();
  const data = {
                  isVisible:  rect.top >= 0 && rect.top + hrsConfig.offset <= window.innerHeight,
                  position: {top: rect.top, right: rect.right, bottom: rect.bottom, left: rect.left},
                  height: $(element).height(),
                  width: $(element).width(),
                  offsetTop: $(element).offset().top
                }
  return (data);
}