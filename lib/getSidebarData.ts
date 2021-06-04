import fs from 'fs';
import path from 'path';
import  folderList  from "@/data/folder"
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
  folderList.forEach(el => {
    if(el!==null){
      const files = fs.readdirSync(path.join(root, folder, el));
      finalData = [...finalData , {
        topic: el.replace('-',' ').toUpperCase(),
        fileSlugs: files.map(e => ({
            text: prettify(e),
            slug: `/${el}/${e.replace('.mdx','')}`
          }) )
      }]
    }
  })
  return finalData;
}

export default getSidebarData;