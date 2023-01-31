import * as React from 'react'
import { FC, createContext, useContext } from 'react'
import { Link, LinkProps, Box } from 'theme-ui'

export type LinkClassType = FC<LinkProps>
const LinkContext = createContext<LinkClassType>(Link)
export interface LinkContextProviderProps {
  linkClass: LinkClassType
}
const LinkContextProvider: FC<LinkContextProviderProps> = ({ linkClass: LinkClass, children }) => {
  return (
    <LinkContext.Provider value={(props: any) => <Box variant="styles.a" as={LinkClass} {...props} />}>
      {children}
    </LinkContext.Provider>
  )
}
export const useGetLinkClass = (): FC<LinkProps> => {
  return useContext(LinkContext) || Link
}

export default LinkContextProvider
