import { StyledButton } from "./Button.styled"
import { ButtonHTMLAttributes, FC } from 'react'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {

}

export const Button: FC<IButton> = (props) => {

    const {
        children
    } = props

    return (
        <StyledButton onClick={() => console.count('click')}>
            {children}
        </StyledButton>
    )
}
