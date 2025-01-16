import fs from 'fs';
import Image from 'next/image';
import path from 'path';
import { useTranslations } from 'next-intl';

async function getImages() {
  const imagesDirectory = path.join(process.cwd(), 'public', 'companies-logos');

  const imageFiles = fs.readdirSync(imagesDirectory)
    .filter(file => /\.(jpg|jpeg|png|webp|svg)$/.test(file));
  
  const images = imageFiles.map(file => path.join('/companies-logos', file));

  return images;
}

const Title = () => {
  const t = useTranslations('Clients section')
  return (
    <h1 className='text-5xl text-center text-main my-12 font-bold w-full'>
      {t("our clients")}
    </h1>
  )
}

const ClientLogos = async () => {
  const images = await getImages()

  return (
    <section dir='ltr' className='overflow-hidden flex flex-col items-center justify-center my-40 py-5'>
      <Title/>
      <div className='max-w-[1200px] w-full overflow-x-hidden h-32'>
        <div className="flex items-center justify-center h-full w-fit gap-10 flex-nowrap logo-animation">
            {images.map((image: string, index:number) => (
              <div 
                className="h-full w-64 relative shadow-mainGray shadow-inner"
                key={index}
              >
                  <Image 
                    src={image}
                    alt={`Client logo ${index + 1}`}
                    fill 
                    objectFit='contain'
                  />
              </div>
            ))}
            {images.map((image: string, index:number) => (
              <div 
                className="h-full w-64 relative shadow-mainGray shadow-inner"
                key={index}
              >
                  <Image 
                    src={image}
                    alt={`Client logo ${index + 1}`}
                    fill 
                    objectFit='contain'
                  />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
