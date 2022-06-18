var remsize=function(){
    var dwidth=document.documentElement.clientWidth;
    if(dwidth>750)
    {
        dwidth=750;
    }
    else if(dwidth<375)
    {
        dwidth=375;
    }
    document.documentElement.style.fontSize=(dwidth/7.5)+'px';
    document.querySelector('body').style.fontSize=0.3+'rem';
}
remsize();
window.onresize=function(){
    remsize();
};