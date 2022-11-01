import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { FeatureModel } from '@/domain/models'
import UpdateFeatureForm from './updateFeatureForm'

type props = {
  isOpen: boolean
  onClose: () => void
  feature: FeatureModel | null
  ambiente: string
}

const UpdateFeatureDrawer: React.FC<props> = ({ isOpen, onClose, feature, ambiente }: props) => {
  const handleCloseModal = (): void => {
    onClose()
  }
  const [validSubmit, setValidSubmit] = useState(false)

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={handleCloseModal}
      size={'xl'}
    >
      <DrawerOverlay />
      <DrawerContent overflow="scroll">
        <Box borderBottomWidth="1px">
          <DrawerHeader>Atualizar feature: {feature.nome}</DrawerHeader>
        </Box>
        <DrawerCloseButton />
        <Tabs>
          <TabList>
            <Tab>Funcionalidade</Tab>
            <Tab>Segmentos</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <DrawerBody>
                <UpdateFeatureForm
                  feature={feature}
                  isOpen={isOpen}
                  onClose={onClose}
                  ambiente={ambiente}
                  setValidSubmit={setValidSubmit}
                />
              </DrawerBody>
              <DrawerFooter>
                <Box>
                  <Button
                    form="updateFeatureForm"
                    type="submit"
                    disabled={validSubmit}
                  >
                    Save
                  </Button>
                </Box>
              </DrawerFooter>
            </TabPanel>

            <TabPanel>
              <p>Segmentos!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </DrawerContent>
    </Drawer>
  )
}

export default UpdateFeatureDrawer
