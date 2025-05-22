import { useQueryStates, } from 'nuqs'
import {parseAsString,parseAsArrayOf, parseAsStringLiteral, createLoader } from 'nuqs/server'


export const sortValues = ['curated', "trending", 'hot_and_new']



export const params = {
    sort : parseAsStringLiteral(sortValues).withDefault("curated"),
    minPrice: parseAsString.withOptions({ clearOnDefault: true }),
    maxPrice: parseAsString.withOptions({ clearOnDefault: true }), 
    tags : parseAsArrayOf(parseAsString).withOptions({
        clearOnDefault : true
    }).withDefault([])
  }
export const useProductFilters = () => {
  return useQueryStates(params)

}


export const loadProductFitlers = createLoader(params)
