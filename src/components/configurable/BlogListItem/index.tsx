import React from "react"

interface BlogListItemProps {
  blogItem: any
}

export const BlogListItem = ({ blogItem }: BlogListItemProps) => {
  if (!blogItem) {
    return <></>
  }
}
