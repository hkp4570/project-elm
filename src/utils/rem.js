(function (doc, win) {
    const docEL = doc.documentElement;
    const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    const recale = () => {
        const clientWidth = docEL.clientWidth;
        if (!clientWidth) return;
        docEL.style.fontSize = 20 * (clientWidth / 320) + 'px';
    }
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recale, false);
    doc.addEventListener('DOMContentLoaded', recale, false);
})(document, window)