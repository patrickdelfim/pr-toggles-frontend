import {
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
import React from 'react'
import { FeatureModel } from '@/domain/models'
import UpdateFeatureForm from './featureTab/updateFeatureForm'
import ManageSegments from './segmentTab/manageSegments'

type props = {
  isOpen: boolean
  onClose: () => void
  feature: FeatureModel | null
  ambiente: string
}

const ManageFeatureDetails: React.FC<props> = ({ isOpen, onClose, feature, ambiente }: props) => {
  const handleCloseModal = (): void => {
    onClose()
  }

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={handleCloseModal}
      size={'xl'}
    >
      <DrawerOverlay />
      <DrawerContent overflowY="scroll">
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
                  ambiente={ambiente}
                  isOpen={isOpen}
                  onClose={onClose}
                />

              </DrawerBody>
              <DrawerFooter>

              </DrawerFooter>
            </TabPanel>

            <TabPanel>
              <ManageSegments estrategia={feature.estrategias.find(estrategia => estrategia.ambiente === ambiente)} onClose={onClose}/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </DrawerContent>
    </Drawer>
  )
}

export default ManageFeatureDetails
