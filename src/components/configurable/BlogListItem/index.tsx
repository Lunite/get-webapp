import React from "react"

interface BlogListItemProps {
  blogItem: any
}

const BlogListItem = ({ blogItem }: BlogListItemProps) => {
  if (!blogItem) {
    return <></>
  }
}

export default BlogListItem
