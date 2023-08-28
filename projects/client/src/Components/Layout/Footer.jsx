import Logo from '../../utils/images/Medicore.png';
import { MdWhatsapp, MdMail, MdCall, MdFacebook } from 'react-icons/md';
import { IoLogoTwitter } from 'react-icons/io';
import { AiFillInstagram } from 'react-icons/ai';

export default function Footer() {
  return (
    <>
      <div className="grid justify-evenly md:flex gap-2  w-full py-6 px-5 ">
        <div className="flex w-fit flex-col gap-3">
          <div>
            <img className="h-10" src={Logo} alt="" />
          </div>
          <div className="flex px-3 items-center">
            <MdWhatsapp size={25} />
            <div className="pl-2">+62 812 2234 7856</div>
          </div>
          <div className="flex px-3 items-center">
            <MdMail size={25} />
            <div className="pl-2">contact@medicore.com</div>
          </div>
          <div className="flex px-3 items-center">
            <MdCall size={25} />
            <div className="pl-2">+62 21 2314 5685</div>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="flex flex-col gap-3">
            <div className="flex items-center">About Us</div>
            <div className="flex items-center">FAQ</div>
            <div className="flex items-center">Career</div>
            <div className="flex items-center">Privacy</div>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="flex flex-col gap-3">
            <div className="flex items-center">About Us</div>
            <div className="flex items-center">FAQ</div>
            <div className="flex items-center">Career</div>
            <div className="flex items-center">Privacy</div>
          </div>
        </div>
        <div className="flex w-fit flex-col gap-3">
          <article className="prose">
            <h3 className="flex items-center">Follow Us</h3>
            <div className="flex items-center">
              <MdFacebook size={25} />
              <div className="pl-2">Facebook</div>
            </div>
            <div className="flex py-2 items-center">
              <IoLogoTwitter size={25} />
              <div className="pl-2">Twitter</div>
            </div>
            <div className="flex items-center">
              <AiFillInstagram size={25} />
              <div className="pl-2">Instagram</div>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
