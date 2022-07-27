import {
  IconButton,
  InputGroup,
  InputRightElement,
  useBoolean,
} from "@chakra-ui/react";
import { cloneElement, HTMLInputTypeAttribute, ReactElement } from "react";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";

type Props = {
  type: (HTMLInputTypeAttribute & string) | undefined;
  children: ReactElement<any>;
};

function PasswordContainer({ type, children }: Props) {
  const [isVisible, { toggle }] = useBoolean(false);

  if (type === "password") {
    return (
      <InputGroup size="md">
        {cloneElement(children, {
          type: isVisible ? "text" : "password",
        })}
        <InputRightElement>
          <IconButton
            h="1.75rem"
            size="sm"
            onClick={toggle}
            aria-label="Toggle secret text"
            variant="ghost"
            fontSize={22}
            icon={isVisible ? <IoMdEyeOff /> : <IoMdEye />}
          />
        </InputRightElement>
      </InputGroup>
    );
  }

  return children;
}

export default PasswordContainer;
