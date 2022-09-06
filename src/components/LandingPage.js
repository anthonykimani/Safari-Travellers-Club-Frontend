import Navbar from "./Navbar";
import HomeText from "./HomeText";
import Destination from "./Destination";

const LandingPage = ({destinations}) => {
  return (
    <div className="" id="landing">
      <img
        src={process.env.PUBLIC_URL + "/safari-ambience.jpg"}
        alt=""
        className="absolute top-0 left-0 z-0 object-cover h-[130vh] w-screen"
      />
      <Navbar />
      <HomeText />
      <Destination destinations={destinations}/>
    </div>
  );
};

export default LandingPage;