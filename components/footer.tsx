import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import { Instagram, Linkedin, MailIcon, MessageCircleMore, PhoneCall } from 'lucide-react'
import Link from 'next/link'

function Footer() {
  return (
        <div className='flex flex-col md:flex-row justify-center md:justify-between items-center py-4 '>
              <div className='w-full md:w-1/4'>
                  <Image className='' src="/tm.png" width={500} height={500} alt='logo'/> 
          </div>    
          <div className='w-full md:w-1/2 my-4 md:my-0 flex items-center justify-center font-mont text-xs font-semibold'>
              <div>
                  <Button className="rounded-4xl bg-white text-black text-xs hover:text-white m-2">SCHEDULE A CONSULTATION</Button>
              <div className='flex text-white m-2'>
                  <PhoneCall className='mx-2'/>
                  <p>+91 96614-70953</p>
              </div>
              <div className='flex text-white m-2'>
                  <MailIcon className='mx-2'/>
                  <p>kumaraniket0966@gmail.com</p>
                  </div>
                  <div className='flex text-white m-2'>
                  <Linkedin className='mx-2'/>
                  <Instagram className='mx-2'/>
              </div>
              </div>
          </div>
          <div className='w-full md:w-1/4 flex justify-center md:justify-between gap-9 text-xs font-mont text-white'>
              <div className='flex flex-col gap-1'>
                  <Link href="">About Us</Link>
                  <Link href="">Services</Link>
                  <Link href="">Resources</Link>
                  <Link href="">Contact Us</Link>
              </div>
            <div className='flex flex-col gap-1'>
              <Link href="/cookie-preferences">Cookie Preferences</Link>
              <Link href="/do-not-sell">Do Not Sell or Share</Link>
              <Link href="/privacy-policy">Privacy Policy</Link>
              <Link href="/terms-conditions">Terms & Conditions</Link>
              <Link href="/copyright">Copyright</Link>
            </div>
              <div className='flex items-center justify-center mr-4'>
                  <Button className="rounded-full cursor-pointer text-6xl  py-4 bg-gradient-to-r from-white via-gray-400 to-white drop-shadow-lg ">
                      <MessageCircleMore fill='white' className=''/>
                  </Button>
              </div>
          </div>
          </div>
  )
}

export default Footer
