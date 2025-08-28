import { FaFacebook, FaInstagram, FaTwitter, FaTiktok, FaYoutube, FaPinterest } from 'react-icons/fa';
import { MdOutlineRoom } from 'react-icons/md';
import AccordionFooter from './Accordion';
import { Link, useNavigate } from 'react-router';

export default function Footer() {
  const navigate = useNavigate()
  return (
    <footer className="bg-white text-sm text-gray-700 pt-6 lg:pt-12">
      <div className="border-t border-b border-[#e5e5e5] py-8 text-center">
        <h3 className="text-xl font-semibold">Our exclusive services</h3>
        <p className="text-gray-500 mb-4">Tailor-made to enhance your shopping experience</p>
        <div className="flex justify-center items-center gap-8 mb-4">
          <div className="flex flex-col items-center">
            <img src="../../../Giftbox.png" alt="Gift Packaging" className="h-10 mb-2" />
            <span>Gift Packaging</span>
          </div>
          <div className="flex flex-col items-center">
            <img src="../../../PersonalShopper.png" alt="Personal Shopper" className="h-10 mb-2" />
            <span>Personal Shopper</span>
          </div>
        </div>
        <Link to="/guess/women" className="underline text-sm">Discover more</Link>
      </div>
      <div className="container mx-auto lg:px-4 lg:mx-0 py-8 grid grid-cols-1 lg:grid-cols-5 gap-y-8 gap-x-6 text-center lg:text-left">
        <div className='lg:border-[#e5e5e5] lg:border-r px-[15px]'>
          <h4 className="font-semibold mb-3">Sign up now and get 10% off</h4>
          <ul className="mb-4 space-y-1">
            <li>✓ Birthday promo</li>
            <li>✓ Early access to sales</li>
            <li>✓ Exclusive discounts</li>
          </ul>
          <button onClick={() => navigate("/login")} className="bg-black border-2 hover:bg-white border-black hover:text-black transition duration-200 text-white px-4 py-2 rounded mb-6 max-w-[204px] h-[56px]">Register Now</button>

          <div>
            <h5 className="font-semibold mb-2">Discover our app:</h5>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
              <img src="../../../qr-code-white.png" alt="QR Code" className="hidden lg:block h-20" />
              <div className="flex flex-wrap justify-center lg:flex-col gap-2">
                <img src="../../../App_Store_Badge_en.svg" alt="App Store" className='h-[2.5rem] lg:h-max' />
                <img src="../../../GetItOnGooglePlay_en.png" alt="Google Play" className='h-[2.5rem] lg:h-max' />
              </div>
            </div>
          </div>
        </div>
        <AccordionFooter />
        <div className='max-md:hidden'>
            <h5 className="font-semibold mb-2">Customer Service</h5>
            <ul className="space-y-1">
                <li><Link to="/guess/account">Need help?</Link></li>
                <li><Link to="/guess/account">My Orders</Link></li>
                <li><Link to="/guess/account">Register your return</Link></li>
                <li><Link to="/guess/account">Exclusive Services</Link></li>
            </ul>
        </div>

        <div className='max-md:hidden'>
            <h5 className="font-semibold mb-2">My account</h5>
            <ul className="space-y-1">
                <li><Link to="/guess/account">Account</Link></li>
                <li><Link to="/guess/account">Orders</Link></li>
                <li><Link to="/guess/account">Privacy policy</Link></li>
            </ul>
        </div>

        <div className='max-md:hidden'>
            <h5 className="font-semibold mb-2">Corporate</h5>
            <ul className="space-y-1">
                <li><Link to="/guess/account">Careers</Link></li>
                <li><Link to="/guess/account">Investor Relations</Link></li>
                <li><Link to="/guess/account">Subsidiaries</Link></li>
                <li><Link to="/guess/account">Guess Family</Link></li>
                <li><Link to="/guess/account">Guess Journal</Link></li>
                <li><Link to="/guess/account">Sustainability</Link></li>
                <li><Link to="/guess/account">Diversity and Inclusion</Link></li>
            </ul>
        </div>

        <div className='max-md:hidden'>
            <h5 className="font-semibold mb-2">Privacy and Conditions</h5>
            <ul className="space-y-1 mb-4">
                <li><Link to="/guess/account">Privacy and Cookie Policy</Link></li>
                <li><Link to="/guess/account">Terms and Conditions</Link></li>
                <li><Link to="/guess/account">Manage Cookie Consent</Link></li>
            </ul>
            <h5 className="font-semibold mb-2 hidden lg:block">Follow Us</h5>
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 text-lg">
                <span><FaFacebook /></span>
                <span><FaInstagram /></span>
                <span><FaTwitter /></span>
                <span><FaTiktok /></span>
                <span><FaYoutube /></span>
                <span><FaPinterest /></span>
            </div>
        </div>
      </div>
      <div className="px-4 py-8 text-xs mx-[10px] flex flex-col lg:flex-row justify-between items-center gap-3 text-center lg:text-left">
        <p>GUESS?, Inc. © {new Date().getFullYear()} All Rights Reserved.</p>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <span className="flex items-center gap-1">
            <img src="../../../az.svg" alt="AZ Flag" className="h-4" />
            AZ | en - <span className="underline">Change</span>
          </span>
          <span className="flex items-center gap-1">
            <MdOutlineRoom />
            <span className="underline">Find your closest store</span>
          </span>
        </div>
        <div className="flex flex-wrap gap-2 justify-center lg:justify-start mt-2 lg:mt-0">
          <img src="../../../mastercard.svg" alt="Mastercard" className="h-5" />
          <img src="../../../visa.svg" alt="Visa" className="h-5" />
          <img src="../../../amex.svg" alt="Amex" className="h-5" />
          <img src="../../../paypal.svg" alt="PayPal" className="h-5" />
          <img src="../../../googlepay.svg" alt="GPay" className="h-5" />
        </div>
      </div>
    </footer>
  );
}
