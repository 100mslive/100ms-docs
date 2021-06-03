import React, { PropsWithChildren, useState } from 'react'

/**
 * 
 * <Tabs items={['Node.js','Python']}>
 * 
 * <Tab id={1}>
 *  Code
 * </Tab>
 */

/**
 * Just because Compound Component React Pattern
 * Wasn't Working in MDX (children code not getting parsed)
 * So Took this Vanilla API approahc WORKS.
 */

interface TabsProps {
  items: string[]
  id: string
}

export const Tabs :React.FC<TabsProps> = ({ items, id }) => {
  const def = 0
  const [tab,setTab] = useState(def)
  React.useEffect(() => {
      const ele = document.getElementById(`${id}-${def}`)
      if(ele){
        ele.style.display = 'block'
    }
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  } ,[])
  const changeTab = (idx: number) => {
    items.forEach((_, i) => {
      if(i !== idx){
        const ele = document.getElementById(`${id}-${i}`)
        if(ele){
          ele.style.display = 'none'
        }
      }
    })
    const ele = document.getElementById(`${id}-${idx}`)
    if(ele){
      ele.style.display = 'block'
    }
    setTab(idx)
  } 
  return(
    <div className='tab-ctx'>
      {items.map((el,i) => (
        <button onClick={() => changeTab(i)} type='button' className={tab === i ? 'tab-active' : ''} key={el} id={i.toString()} >
          {el}
        </button>
      ))}
      <style jsx>{`
        .tab-ctx{
          border-bottom: 0.5px solid var(--accents2);
        }
        button{
          background: none;
          outline: none;
          border: none;
        }
        .tab-active{
          border-bottom: 1px solid var(--foreground);
        }
        `}</style>
    </div>
  )
}

interface TabProps {
  id: string;
}

export const Tab : React.FC<PropsWithChildren<TabProps>> = ({ id,children }) => (
    <div className='hide' id={`tab-${id}`}>
      {children}
    </div>
)


