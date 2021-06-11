/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';
import v2FolderList  from "@/data/v2/folder"
import v1FolderList  from "@/data/v1/folder"

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

type VersionType = 'v1' | 'v2'

const getSidebarData  = async (type: VersionType):  Promise<SidebarDataType> => {
  const allSlugList: string[] = []
  let finalData : SidebarType[]  = []
  let folderList;
  if(type === 'v1'){
    folderList = v1FolderList
  }
  if(type === 'v2'){
    folderList = v2FolderList
  }
  if(folderList){
    folderList.forEach((el :string) => {
      if(el!==null){
        try {
          const data = fs.readFileSync(path.join(root, `data/${type}/files`, `${el}.json`), 'utf8');
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
  }
  return { sidebarData: finalData , allSlugList };
}

export default getSidebarData;