// export const themeDecorator = (StoryComponent: Story) => {
//   return (
//       <div className="app">
//         <StoryComponent/>
//       </div>
//   )
// }
export const themeDecorator = (props: { children: any, themeClasses: any }) => {
  const { children, themeClasses } = props
  return (
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      <div className={`app ${themeClasses}`}>
        {children}
      </div>
  )
}
