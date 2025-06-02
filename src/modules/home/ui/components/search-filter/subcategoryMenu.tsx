import Link from 'next/link';
import { CategoriesGetManyOutput } from '@/modules/categories/types';
interface Props {
    category: CategoriesGetManyOutput[1],
    isOpen: boolean,

}
export const SubCategoryMenu = ({ category, isOpen, }: Props) => {

    
    if (!isOpen || !category.subcategories || (category.subcategories as []).length <= 0){
        return null;
    }
    const backgroundColor = category.color || '#f5f5f5';

    return (
        <div className='absolute z-100' style={{
            top: '100%',
            left: 0 ,
        }}>
            <div className='h-3 w-60 ' />
            <div style={{
                backgroundColor
            }} className='w-60 text-black rounded-md overflow-hidden  border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-[2px] -translate-y-[2px]'>
                <div>
                    {
                        (category.subcategories as [])?.map((SubCategory: CategoriesGetManyOutput[1]) => (
                            <Link href={`/${category.slug}/${SubCategory.slug}`} key={SubCategory.slug}
                                className='w-full text-left p-4 hover:bg-black hover:text-white flex justify-between font-medium underline-offset-4 capitalize underline '
                            >
                                {SubCategory.name}
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

