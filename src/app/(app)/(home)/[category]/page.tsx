

interface Props { 
params : Promise<{category : string}>
}


const Page  = async (props : Props) => { 
const params = await props.params;
const category = params.category;
return (
  <div>
  {category}
  </div>
)

}


export default Page;
