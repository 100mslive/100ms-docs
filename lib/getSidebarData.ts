/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';
import  folderList  from "@/data/folder"

const root = process.cwd();

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
      try {
        const data = fs.readFileSync(path.join(root, 'data/files', `${el}.json`), 'utf8');
        finalData = [...finalData , {
          topic: el.replace('-',' ').toUpperCase(),
          fileSlugs: JSON.parse(data)
        }]
      } catch(e) {
          console.log('Error:', e.stack);
      }
    }
  })
  return finalData;
}

export default getSidebarData;