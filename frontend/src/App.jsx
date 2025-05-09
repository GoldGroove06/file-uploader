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
    <div className=' '>
      <div className=' flex flex-col md:flex-row-reverse items-center justify-center mt-16 m-4'>
        <img src='/images/landing.png' alt='bg' className='md:w-[40vw]'/>
        <Heading as="h2" className="md:mr-48">Upload & Share Files Instantly</Heading>
      </div>
      <div className='flex flex-col mt-16 border border rounded-xl '>
      <Heading as="h2" className='mb-2 ml-16'>Simple File Sharing</Heading>
      <div className='flex flex-col md:flex-row items-center justify-center    p-2 '>
        <img src='/images/image-1.png' alt='bg'  className='md:w-[30vw] md:mr-48'/>
        <ul className='text-xl'>
          Create shareable links.
          Create folders.
          Supports images, documents and all other formats.

        </ul>
      </div>
      </div>
      <div className='flex flex-col md:flex-row m-1 p-2 mt-16 text-xl justify-center items-center md:space-x-[25vw]'>
        <Heading as="h3">How It Works</Heading>
        <div>
        <ol>
          <li>1. Select your files</li>
          <li>2. Click upload and wait a moment</li>
          <li>3. Share the generated link with anyone</li>
        </ol>
        
      <Button >Get Started</Button>
      </div>
      </div>

    
      <div className='mt-16 mb-8 md:w-1/2 md:mx-auto'> 
         <Accordion.Root>
      {items.map((item, index) => (
        <Accordion.Item key={index} value={`item-${index}`}  className="!bg-transparent !text-gray-500">
          <Accordion.Header>
            <Accordion.Trigger index={index}>{item.title}</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content index={index}>{item.content}</Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
    </div> 
      


    </div>
  )
}

export default App
