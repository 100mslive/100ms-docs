const monthNames: string[] = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
export const handleDate = (dt: string) : string => {
  const date = dt.split("-");
  const month = (monthNames[+date[1]-1])
  return `${month} ${date[0]} , ${date[2]}`
}