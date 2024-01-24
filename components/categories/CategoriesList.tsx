import { TCategory } from '@/types/CategoryType';
import Link from 'next/link';
import React from 'react'


const fetchData = async (): Promise<TCategory[] | null> => {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/categories`);
  try {
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
  return null;
//!not
};

const CategoriesList = async() => {
    const data = await fetchData()
    const uniqueCategories = Array.from(new Set(data?.map((item) => item.catName)));

  return (
    <div className='flex gap-2 text-sm flex-wrap mb-4'>
       {uniqueCategories.map((category, index) => (
        <Link
          key={index}
          className='px-4 py-1 rounded-md bg-slate-800 text-white cursor-pointer'
          href={`/categories/${category}`}
        >
          {category}
        </Link>
      ))}
    </div>
  )
}

export default CategoriesList
