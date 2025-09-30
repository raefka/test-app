import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='w-[90%] mx-auto mb-4 rounded-b-2xl bg-white shadow-md p-4 flex justify-between items-center'>
        <Link href="/" className='font-bold text-xl'>Fontaines à boire</Link>
        <Link href="/espaces" className='font-bold text-xl'>Espaces verts</Link>
        <Link href="/equipements" className='font-bold text-xl'>Equipements/Activités</Link>
    </div>
  )
}

export default Navbar