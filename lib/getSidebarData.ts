/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';
import  folderList  from "@/data/folder"

const root = process.cwd();

export interface SidebarType {
  topic: string;
  fileSlugs: {
    text: string;
    slug: string;
  }[]
}


export interface SidebarDataType {
  sidebarData: SidebarType[];
  allSlugList: string[]
}

const getSidebarData  = async ():  Promise<SidebarDataType> => {
  const allSlugList: string[] = []
  let finalData : SidebarType[]  = []
  folderList.forEach(el => {
    if(el!==null){
      try {
        const data = fs.readFileSync(path.join(root, 'data/files', `${el}.json`), 'utf8');
        finalData = [...finalData , {
          topic: el.replace('-',' ').toUpperCase(),
          fileSlugs: JSON.parse(data)
        }]
        const dt =  JSON.parse(data)
        if(dt){
          dt.forEach((e: {
            text: string;
            slug: string;
          }) => {
            allSlugList.push(e.slug)
          })
        }
      } catch(e) {
          console.log('Error:', e.stack);
      }
    }
  })
  return { sidebarData: finalData , allSlugList };
}

export default getSidebarData;