import { useState } from 'react'
import Heading from "@radui/ui/Heading"
import Accordion from "@radui/ui/Accordion"
import Button from "@radui/ui/Button"

const items = [
  {
    title: "What types of files can I upload?",
    content: "You can upload images, documents, PDFs, videos, and most common file types.",
  },
  {
    title: "Is there a file size limit?",
    content: "Yes, the maximum file size allowed is 100MB per upload.",
  },
  {
    title: "Can I delete a file after uploading?",
    content: "Yes, you'll receive a delete link along with the share link after uploading.",
  },
];

function App() {
  return (
    <div className='min-h-screen '>
      <div className='flex flex-col md:flex-row-reverse items-center justify-center pt-16 px-6 md:px-12'>
        <img src='/images/landing.png' alt='bg' className='md:w-[40vw] drop-shadow-xl'/>
        <Heading as="h2" className="md:mr-48 text-transparent bg-clip-text bg-gradient-to-r from-[#bca8f9] to-[#a4d3ff] font-bold">Upload & Share Files Instantly</Heading>
      </div>
      
      <div className='flex flex-col mt-16 mx-4 md:mx-12 rounded-xl  shadow-xl overflow-hidden border-indigo-100'>
        <div className=' p-4'>
          <Heading as="h2" className='mb-2 ml-4 md:ml-16 text-white'>Simple File Sharing</Heading>
        </div>
        <div className='flex flex-col md:flex-row items-center justify-center p-6'>
          <img src='/images/image-1.png' alt='bg' className='md:w-[30vw] md:mr-48 drop-shadow-lg'/>
          <ul className='text-xl space-y-2 mt-6 md:mt-0 text-gray-700'>
            <li className='flex items-center'>
              <span className='inline-block w-3 h-3 rounded-full bg-gradient-primary mr-2'></span>
              Create shareable links
            </li>
            <li className='flex items-center'>
              <span className='inline-block w-3 h-3 rounded-full bg-gradient-primary mr-2'></span>
              Create folders
            </li>
            <li className='flex items-center'>
              <span className='inline-block w-3 h-3 rounded-full bg-gradient-primary mr-2'></span>
              Supports images, documents and all other formats
            </li>
          </ul>
        </div>
      </div>
      
      <div className='flex flex-col md:flex-row m-4 md:m-12 p-6 mt-16 rounded-xl text-xl justify-center items-center md:space-x-[20vw]'>
        <Heading as="h3" className='text-gradient font-bold mb-6 md:mb-0'>How It Works</Heading>
        <div>
          <ol className='space-y-3 text-gray-700 mb-6'>
            <li className='flex items-center'>
              <span className='inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-primary text-white mr-3 font-bold'>1</span>
              Select your files
            </li>
            <li className='flex items-center'>
              <span className='inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-primary text-white mr-3 font-bold'>2</span>
              Click upload and wait a moment
            </li>
            <li className='flex items-center'>
              <span className='inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-primary text-white mr-3 font-bold'>3</span>
              Share the generated link with anyone
            </li>
          </ol>
          
          <Button className='bg-gradient-primary hover:opacity-90 transition-opacity text-gray-500 px-6 py-2'><a href="/signin">Get Started</a></Button>
        </div>
      </div>

      <div className='mt-16 mb-8  md:mx-auto p-6 rounded-xl !text-white'> 
        <Heading as="h3" className='text-gradient font-bold mb-4 text-center'>Frequently Asked Questions</Heading>
        <div className='md:w-[50%] md:mx-auto'>
        <Accordion.Root >
          {items.map((item, index) => (
            <Accordion.Item key={index} value={`item-${index}`} className="!bg-transparent border-b border-indigo-900 !text-white">
              <Accordion.Header>
                <Accordion.Trigger index={index} className="font-medium py-3 !bg-[#1b1b2f]/80">{item.title}</Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content index={index} className="pb-3 !bg-[#1b1b2f]/80 !text-white">{item.content}</Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div> 
      </div>
    </div>
  )
}

export default App
