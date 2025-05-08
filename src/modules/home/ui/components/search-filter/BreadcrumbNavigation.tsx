import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";



interface Props {
  activeCategoryName: string | undefined;
  activeCategory: string | undefined;
  activeSubcategoryName: string | undefined;

}


const BreadcrumbNavigation = ({ activeCategoryName, activeCategory, activeSubcategoryName }: Props) => {

  if (!activeCategoryName || activeCategory === 'all') return null;

  console.log(1, activeSubcategoryName, activeCategoryName, activeCategory)
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {
          activeSubcategoryName ? (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink asChild className="text-xl font-medium underline text-primary">
                  <Link href={`/${activeCategory}`}>{activeCategoryName}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                /
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink className="text-xl text-black font-medium">
                  {activeSubcategoryName}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          ) : (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink className="text-xl text-black font-medium">
                  {activeCategoryName}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
export default BreadcrumbNavigation;

