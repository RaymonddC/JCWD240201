import Logo from '../../utils/images/logoHealthyMed.svg';

export default function NavBar() {
  return (
    <>
      <div>
        <img className="h-10 px-2" src={Logo} alt="" />
        <div className="px-2 hover:text-gray-400 ">QnA</div>
        <div className="px-2 hover:text-gray-400">Shop</div>
      </div>
    </>
  );
}
