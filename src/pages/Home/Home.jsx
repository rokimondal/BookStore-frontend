import Banner from "./banner"
import News from "./News"
import Recommended from "./Recommended"
import TopSellers from "./TopSellers"



const Home = () => {
  return (
    <>
      <Banner />
      <TopSellers />
      <Recommended />
      <News />
    </>
  )
}

export default Home