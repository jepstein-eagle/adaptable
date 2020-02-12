import Input from "../../src/components/Input"
import HomeIcon from "../../src/components/icons/home"
import SimpleButton from "../../src/components/SimpleButton"
import { Box, Flex } from "rebass"

export default function() {
  return (
    <>
      <Flex bg="accent" color="white" p={2} alignItems="center">
        <Flex flex={1} justifyContent="flex-start">
          <SimpleButton
            icon="home"
            variant="text"
            style={{ color: "white", fill: "currentColor" }}
          />
        </Flex>
        <Box>Center</Box>
        <Flex flex={1} justifyContent="flex-end">
          <Input placeholder="Quick Search" mr={2} />
          <SimpleButton
            icon="arrow-left"
            variant="text"
            style={{ color: "white", fill: "currentColor" }}
          />
        </Flex>
      </Flex>
      <Flex bg="primary" p={2}>
        toolbars
      </Flex>
    </>
  )
}
