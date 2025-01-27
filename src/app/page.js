'use client';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Cookies from 'js-cookie';
import { useState, useEffect , useRef} from 'react';
import { useInView } from 'react-intersection-observer';
import { useAnimation } from 'framer-motion';
import useFonts from "@/components/hooks/useFonts";
import dynamic from 'next/dynamic';
import { useKeylessAccounts } from "@/lib/useKeylessAccounts";
import Dashboard from '@/components/Dashboard';


export default function Home() {
  const [wallet, setwallet] = useState('');
  
  const { righteous } = useFonts();

  const { ref, inView } = useInView({ threshold: 0.3 });
  const animation = useAnimation();
  const animation2 = useAnimation();
  const animation3 = useAnimation();

  
  
/** @typedef {string} OpenIdProvider */
  useEffect(() => {
    console.log("inView", inView);

    if (!inView) {
      animation.start({
        x: -300,
        opacity: 0,
        scale: 0,
      });
      animation2.start({
        scale: 0,
        opacity: 0,
        x: 300,
      });
      animation3.start({
        opacity: 0,
        y: 300,
      });
    } else {
      animation.start({
        x: 0,
        opacity: 1,
        scale: 1,
      });
      animation2.start({
        scale: 1,
        opacity: 1,
        x: 0,
      });
      animation3.start({
        y: 0,
        opacity: 1,
      });
    }
  }, [inView, animation, animation2]);

// ----------------------------------------------------------------------------------
 
  const accountDataKey = 'zklogin-demo.accounts';
  const [isAccountDataAvailable, setIsAccountDataAvailable] = useState(false);
  function loadAccounts(){
    if(typeof window !== 'undefined'){
    const dataRaw = sessionStorage.getItem(accountDataKey);
    if (!dataRaw) {
        return [];
    }
    const data = JSON.parse(dataRaw);
    return data;
  }
  }
  const accounts = useRef(loadAccounts());
  
  const userAddr = accounts.current?.length
  console.log(userAddr)

  const { activeAccount, disconnectKeylessAccount } = useKeylessAccounts();
  console.log("activeAccount", activeAccount);
  const walletaddr = Cookies.get("bingo_wallet");

  // console.log('sarvesh',accounts.current[0])
  useEffect(() => {
    if(activeAccount)
    {
      setIsAccountDataAvailable(!!activeAccount);
    }
    if(walletaddr)
    {
      setIsAccountDataAvailable(!!walletaddr);
    }
  }, [activeAccount, walletaddr]);

  const handleExploreClick = () => {
    if (!isAccountDataAvailable) {
      alert("Please login to access this page.");
    }
  };
  


  useEffect(() => {
    const call = () => {
      const loggedin = Cookies.get('snl_wallet');
      setwallet(loggedin);
    };
    call();
  }, []);

  const [scrollDirection, setScrollDirection] = useState('down');
  const [prevScrollY, setPrevScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > prevScrollY) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }

      setPrevScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollY]);

  const NoSSRComponent = dynamic(() => import('@/components/Redirect'), {
    ssr: false
  });
  
  return (
    <>
      <header>
        <nav class="bg-gradient-to-r from-blue-900 via-gray-800 to-blue-900 dark:bg-gray-800 px-4 lg:px-6 py-2.5">
          <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <Link href="/" class="flex items-center">
              <img
                src="https://media3.giphy.com/media/SOb4AcaDitenU4XKdC/giphy.gif?cid=6c09b952ay7ttj24dpj0m92zo0jap80u7htlljkwc7yw4y8i&ep=v1_gifs_search&rid=giphy.gif&ct=g"
                class="mr-3 h-6 sm:h-9"
                alt=""
              />
              <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white" style={righteous.style}>
                ShareTos
              </span>
            </Link>

            <div className="flex gap-10">

            {/* Move the "Create Idea" button before the Navbar */}
            <div className="flex items-center lg:order-1">
              <Link
                href="/create"
                className="block py-2 pr-4 pl-3 text-gray-700 font-bold border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
              >
                Create Idea
              </Link>
            </div>

            <div class="flex items-center lg:order-2">
              <Navbar />
              <NoSSRComponent />
              <button
                data-collapse-toggle="mobile-menu-2"
                type="button"
                class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="mobile-menu-2"
                aria-expanded="false"
              >
                <span class="sr-only">Open main menu</span>
                <svg
                  class="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <svg
                  class="hidden w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>

            </div>
            {/* <div
              class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1 z-10"
              id="mobile-menu-2"
            >
             <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <li>
                  <Link
                      href="/create"
                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Create Idea
                  </Link>
                </li>
              </ul>
            </div> */}
          </div>
        </nav>
      </header>

        <Dashboard />
    </>
  );
}
