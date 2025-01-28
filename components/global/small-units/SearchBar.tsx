import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function SearchBar() {
  const t = useTranslations('SearchBar');

  return (
    <div className="flex sm:border border-main h-10 sm:w-40 rounded-full sm:ps-4">
      <input 
        type="text"
        placeholder={t('placeholder')}
        className='w-full text-start border-none outline-none bg-transparent placeholder:text-mainGray sm:block hidden'
      />
      <Image
        src="/icons/search.svg"
        alt="search"
        width={40}
        height={40}
      />
    </div>
  )
}
