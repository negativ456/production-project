export const themeDecorator = (props: { children: any; themeClasses: any }) => {
  const { children, themeClasses } = props;
  return <div className={`app ${themeClasses}`}>{children}</div>;
};
