import {getStyle} from '@/utils/index';

export const loadMore = {
    'directives': {
        'load-more': {
            bind(el, binding) {
                let windowHeight = window.screen.height;
                let scrollType = el.attributes.type && el.attributes.type.value;
                let scrollEl; // 滚动容器
                let heightEl; //
                let height;
                let setTop;
                let paddingBottom;
                let marginBottom;
                let oldScrollTop;
                let requestFram;
                if (scrollType === 2) {
                    scrollEl = el;
                    heightEl = scrollEl.children[0];
                } else {
                    scrollEl = document.body;
                    heightEl = el;
                }
                el.addEventListener('touchstart', () => {
                    height = heightEl.clientHeight;

                    setTop = el.offsetTop;
                    paddingBottom = getStyle(el, 'paddingBottom');
                    marginBottom = getStyle(el, 'marginBottom');
                }, false);
                el.addEventListener('touchmove', () => {
                    loadMore();
                }, false);
                el.addEventListener('touchend', () => {
                    oldScrollTop = scrollEl.scrollTop;
                    moveEnd();
                });

                const moveEnd = () => {
                    requestFram = requestAnimationFrame(() => {
                        if (scrollEl.scrollTop !== oldScrollTop) {
                            oldScrollTop = scrollEl.scrollTop;
                            moveEnd();
                        } else {
                            cancelAnimationFrame(requestFram);
                            height = heightEl.clientHeight;
                            loadMore();
                        }
                    })
                }

                const loadMore = () => {
                    if (scrollEl.scrollTop + windowHeight >= height + setTop + paddingBottom + marginBottom) {
                        binding.value();
                    }
                }
            }
        }
    }
}

export const getImgPath = {
    methods: {
        getImgPath(path) {
            let suffix;
            if (!path) {
                return '//elm.cangdu.org/img/default.jpg'
            }
            if (path.indexOf('jpeg') !== -1) {
                suffix = '.jpeg'
            } else {
                suffix = '.png'
            }
            let url = '/' + path.substr(0, 1) + '/' + path.substr(1, 2) + '/' + path.substr(3) + suffix;
            return 'https://fuss10.elemecdn.com' + url
        }
    }
}