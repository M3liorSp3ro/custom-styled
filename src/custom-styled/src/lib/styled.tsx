import { FC } from "react"
import { INewComponent } from "../interfaces"

import { compile, serialize, stringify } from 'stylis'

import { customAlphabet } from 'nanoid'
import domElements from "./domElements"

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
const nanoid = customAlphabet(alphabet, 10)

const genClassname = () => {
  const uniqueId = nanoid(10)
  return uniqueId
}

const preprocessStyles = (styles: string) => serialize(compile(styles), stringify)

const injectCSS = (className: string, styles: string) => {
  const styleSheet = document.styleSheets
  styleSheet[0].insertRule(`.${className} {${styles}}`)
}

const styled: any = (Tag: any) => (styles: string) => {
  const NewComponent: FC<INewComponent> = ({ children, ...props }) => {

    if (!styles[0]) {
      return (
        <Tag>
          {children}
        </Tag>
      )
    }

    const preprocessedStyles = preprocessStyles(styles[0])
    const className = genClassname()
    injectCSS(className, preprocessedStyles)

    return (
      <Tag
        className={className}
        {...props}
      >
        {children}
      </Tag>
    );
  }
  return NewComponent
}

domElements.forEach((domElement) => {
  styled[domElement] = styled(domElement);
});

export default styled