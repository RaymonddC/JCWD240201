import Logo from '../../utils/images/logoHealthyMed.svg';


export default function NavBar() {
  return (
    <>
      <div className="flex gap-2 items-center p-3 ">
        <img className="h-10 px-2" src={Logo} alt="" />
        <button className="btn btn-ghost">QnA</button>
        <button className="btn btn-ghost">Shop</button>
      </div>
      
    </>
  );
}
