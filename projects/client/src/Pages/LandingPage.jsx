import NavBar from '../Components/Layout/Navbar';
import jumbotronImage from '../utils/images/jumbotronImage.png';

export default function LandingPage() {
  return (
    <>
     
        <NavBar />
        <div className="flex justify-end my-3 mx-5 border rounded-lg bg-[#92c3d1]">
        <img src={jumbotronImage} alt="" />
      </div>
    </>
  );
}
