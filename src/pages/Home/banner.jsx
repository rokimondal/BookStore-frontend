/* eslint-disable react/no-unescaped-entities */
import bannerImg from "../../assets/banner.png"
const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row-reverse py-10 justify-between item-center gap-12 ">
        <div className="md:w-1/2 w-full flex md:justify-end  justify-center items-center">
            <img src={bannerImg} alt="banner img" />
        </div>
        <div className="md:w-1/2 w-full ">
          <h1 className="font-primary text-2xl md:text-5xl text-secondary font-medium mb-7">New Releases This Week</h1>
          <p className="mb-10">It's time to update your reading list with some of the latest and greatest releases in the literary world. From heart-pumping thrillers to captivating memoirs, this week's new releases offer something for everyone</p>
          <button className="btn-primary ">Subscribe</button>
        </div>
    </div>
  )
}

export default Banner