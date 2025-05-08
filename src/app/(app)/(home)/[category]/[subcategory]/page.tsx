


interface Props { 
params : Promise<{
  subcategory : string; 
  category : string;

}>
}


const Page  = async (props : Props) => { 
const params = await props.params;
const subcategory = params.subcategory;
const category = params.category;
return (
  <div>
  {category}
  <br/>
  {subcategory}
  </div>
)

}


export default Page;
