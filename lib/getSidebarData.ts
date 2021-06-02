import fs from 'fs';
import path from 'path';
import { data } from "./data"
import prettify from './prettify';


const root = process.cwd();
const folder = `docs`

export interface SidebarDataType {
  topic: string;
  fileSlugs: {
    text: string;
    slug: string;
  }[]
}

const getSidebarData  = async ():  Promise<SidebarDataType[]> => {
  let finalData : SidebarDataType[]  = []
  data.folders.forEach(el => {
    const files = fs.readdirSync(path.join(root, folder, el));
    finalData = [...finalData , {
      topic: el.replace('-',' ').toUpperCase(),
      fileSlugs: files.map(e => ({
          text: prettify(e).replace('.mdx',''),
          slug: `/${el}/${e.replace('.mdx','')}`
        }) )
    }]
  })
  data.files.forEach(el => {
    finalData.push({
      topic: '',
      fileSlugs: [{
        text: prettify(el),
        slug: `/${el}`
      }]
    })
  })
  return finalData.reverse();
}

export default getSidebarData;