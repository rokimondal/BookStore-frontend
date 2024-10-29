function getNewsImgUrl(name){
    return new URL(`../assets/news/${name}`,import.meta.url);
}
export {getNewsImgUrl};